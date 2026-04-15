function Button({ onClick, text }: { onClick: () => void; text: string }) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
