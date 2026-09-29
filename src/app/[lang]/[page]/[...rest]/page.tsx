import { notFound } from "next/navigation";

/** No page has sub-pages; deeper addresses get the localized 404. */
export default function Missing() {
  notFound();
}
