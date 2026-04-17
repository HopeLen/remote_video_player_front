function Button({
  onClick,
  text,
  errorCondition,
}: {
  onClick: () => void;
  text: string;
  errorCondition?: boolean;
}) {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition-all duration-300 cursor-pointer
        ${errorCondition ? "bg-red-500" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
