import { useRef, useEffect } from "react";

interface ContextMenuProps {
  onClose: () => void;
  position: { x: number; y: number };
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function ContextMenu({
  onClose,
  position,
  onRename,
  onDuplicate,
  onDelete,
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{ top: position.y, left: position.x }}
      className="absolute z-50 bg-white shadow-lg border rounded-md p-1 text-sm"
    >
      <button
        onClick={onRename}
        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
      >
        Rename
      </button>
      <button
        onClick={onDuplicate}
        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
      >
        Duplicate
      </button>
      <button
        onClick={onDelete}
        className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
