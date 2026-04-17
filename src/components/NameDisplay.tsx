import { useState } from "react";
import { socket } from "../../socket";
import type { RoomNameType } from "../types/RoomNameType";

function NameDisplay({ roomUsers }: { roomUsers: RoomNameType[] }) {
  const [flashingUserId, setFlashingUserId] = useState<string | null>(null);

  socket.on("user-action", (userId) => {
    setFlashingUserId(userId);

    setTimeout(() => {
      setFlashingUserId(null);
    }, 300);
  });

  const myId = socket.id;
  console.log(myId);

  return (
    <div className="flex flex-col gap-2 text-white">
      {roomUsers.map((user) => (
        <div
          className={` transition-all duration-300 px-3 py-2 rounded-xl
            ${user.id === myId ? "bg-emerald-500" : "bg-violet-800"}
            ${user.id === flashingUserId ? "bg-white text-black animate-pulse" : ""}`}
          key={user.id}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default NameDisplay;
