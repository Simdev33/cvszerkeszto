/**
 * Renders generated PDFs to images with pdf.js for the live preview, so the
 * preview shows exactly the file that will be downloaded.
 */
type Pdfjs = typeof import("pdfjs-dist/legacy/build/pdf.mjs");

let pdfjsPromise: Promise<Pdfjs> | null = null;

function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist/legacy/build/pdf.mjs")
      .then((pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/${pdfjs.version}/pdf.worker.min.mjs`;
        return pdfjs;
      })
      .catch((error) => {
        pdfjsPromise = null;
        throw error;
      });
  }
  return pdfjsPromise;
}

export interface PreviewPage {
  url: string;
  width: number;
  height: number;
}

/** Renders every page at `widthPx` pixels wide and returns object URLs. */
export async function renderPreview(bytes: Uint8Array, widthPx: number): Promise<PreviewPage[]> {
  const pdfjs = await loadPdfjs();
  const pdf = await pdfjs.getDocument({ data: bytes, enableXfa: false }).promise;
  try {
    const pages: PreviewPage[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: widthPx / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      // "print" renders without requestAnimationFrame, so it also finishes in background tabs.
      await page.render({ canvas, viewport, intent: "print" }).promise;
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Az előnézet nem készült el."))), "image/png"),
      );
      canvas.width = canvas.height = 0;
      pages.push({ url: URL.createObjectURL(blob), width: base.width, height: base.height });
    }
    return pages;
  } finally {
    void pdf.loadingTask.destroy();
  }
}
