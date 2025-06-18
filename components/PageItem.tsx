import { PageItem as PageItemType } from "@/types/page";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

interface Props {
  page: PageItemType;
  isActive: boolean;
  onClick: () => void;
  onRename: (newTitle: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function PageItem({
  page,
  isActive,
  onClick,
  onRename,
  onDelete,
  onDuplicate,
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setMenuPos({ x: rect.left, y: rect.bottom + 4 });
    setShowMenu(true);
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2",
          isActive
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
        )}
      >
        {page.title}
        <span className="ml-1 cursor-pointer text-lg" onClick={handleMenuClick}>
          ⋯
        </span>
      </button>

      {showMenu && (
        <ContextMenu
          position={menuPos}
          onClose={() => setShowMenu(false)}
          onRename={() => {
            const newTitle = prompt("Rename page:", page.title);
            if (newTitle) onRename(newTitle);
            setShowMenu(false);
          }}
          onDuplicate={() => {
            onDuplicate();
            setShowMenu(false);
          }}
          onDelete={() => {
            if (confirm("Are you sure you want to delete this page?")) {
              onDelete();
              setShowMenu(false);
            }
          }}
        />
      )}
    </div>
  );
}
