"use client";

import { useState } from "react";
import { PageItem as PageItemType } from "@/types/page";
import PageItem from "@/components/PageItem";
import AddButton from "@/components/AddButton";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

const initialPages: PageItemType[] = [
  { id: uuidv4(), title: "Info" },
  { id: uuidv4(), title: "Details" },
  { id: uuidv4(), title: "Other" },
  { id: uuidv4(), title: "Ending" },
];

export default function PageNav() {
  const [pages, setPages] = useState<PageItemType[]>(initialPages);
  const [activePageId, setActivePageId] = useState<string>(pages[0]?.id);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over?.id);
      setPages(arrayMove(pages, oldIndex, newIndex));
    }
  };

  const handleAddPage = (index: number) => {
    const newPage: PageItemType = {
      id: uuidv4(),
      title: "Untitled",
    };
    const updated = [
      ...pages.slice(0, index + 1),
      newPage,
      ...pages.slice(index + 1),
    ];
    setPages(updated);
  };

  const handleSetActive = (id: string) => {
    setActivePageId(id);
  };

  const handleRename = (id: string, newTitle: string) => {
    setPages((prev) =>
      prev.map((page) => (page.id === id ? { ...page, title: newTitle } : page))
    );
  };

  const handleDuplicate = (id: string) => {
    setPages((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      const target = prev[index];
      const duplicate = {
        ...target,
        id: uuidv4(),
        title: `${target.title} Copy`,
      };
      return [...prev.slice(0, index + 1), duplicate, ...prev.slice(index + 1)];
    });
  };

  const handleDelete = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    // If deleted page was active, set another one
    if (activePageId === id) {
      const idx = pages.findIndex((p) => p.id === id);
      const fallback = pages[idx + 1] || pages[idx - 1];
      if (fallback) setActivePageId(fallback.id);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.map((p) => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex gap-2 overflow-x-auto py-2 px-1 bg-gray-50 rounded-lg">
          {pages.map((page, index) => (
            <div key={page.id} className="relative flex items-center group">
              <SortablePageItem
                page={page}
                isActive={page.id === activePageId}
                onClick={() => handleSetActive(page.id)}
                onRename={(title) => handleRename(page.id, title)}
                onDuplicate={() => handleDuplicate(page.id)}
                onDelete={() => handleDelete(page.id)}
              />

              <AddButton onClick={() => handleAddPage(index)} />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// Sortable wrapper using useSortable
function SortablePageItem({
  page,
  isActive,
  onClick,
  onDelete,
  onRename,
  onDuplicate,
}: {
  page: PageItemType;
  isActive: boolean;
  onClick: () => void;
  onRename: (title: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PageItem
        page={page}
        isActive={isActive}
        onClick={onClick}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onRename={onRename}
      />
    </div>
  );
}
