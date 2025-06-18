interface AddButtonProps {
    onClick: () => void
  }
  
  export default function AddButton({ onClick }: AddButtonProps) {
    return (
      <button
        onClick={onClick}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1 mr-1 rounded-full w-6 h-6 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-500"
        aria-label="Add Page"
      >
        +
      </button>
    )
  }
  