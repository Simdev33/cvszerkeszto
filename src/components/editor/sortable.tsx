"use client";

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

/** Vertical drag-and-drop list with mouse, touch and keyboard support. */
export function SortableList<T extends { id: string }>({
  items,
  onMove,
  children,
}: {
  items: T[];
  onMove: (activeId: string, overId: string) => void;
  children: (item: T, index: number) => ReactNode;
}) {
  const { t } = useI18n();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) onMove(String(active.id), String(over.id));
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
      accessibility={{
        screenReaderInstructions: {
          draggable: t.sortable.instructions,
        },
        announcements: {
          onDragStart: () => t.sortable.pickedUp,
          onDragOver: () => t.sortable.moved,
          onDragEnd: () => t.sortable.dropped,
          onDragCancel: () => t.sortable.cancelled,
        },
      }}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => children(item, index))}
      </SortableContext>
    </DndContext>
  );
}

/** Wraps a row: the returned handle is the only drag trigger, so inputs stay usable. */
export function SortableRow({ id, children, className }: { id: string; children: (handle: ReactNode) => ReactNode; className?: string }) {
  const { t } = useI18n();
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });
  const handle = (
    <button
      type="button"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label={t.sortable.handle}
      className="grid h-8 w-6 shrink-0 cursor-grab touch-none place-items-center rounded-md text-fg-subtle hover:bg-surface-2 hover:text-fg active:cursor-grabbing"
    >
      <GripVertical className="size-4" />
    </button>
  );
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn("relative", isDragging && "z-10 opacity-80 shadow-lg", className)}
    >
      {children(handle)}
    </div>
  );
}
