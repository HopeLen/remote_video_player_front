import { useState } from "react";

function CopyButton({ roomId }: { roomId: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (roomId) {
      try {
        await navigator.clipboard.writeText(roomId);
        setCopied(true);
        console.log("Copied!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <>
      <button
        className="border-2 border-violet-800 rounded-2xl w-full h-fit p-3 bg-gray-800 text-white cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy Room ID"}
      </button>
    </>
  );
}

export default CopyButton;
