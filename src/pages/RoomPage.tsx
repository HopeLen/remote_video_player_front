import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../socket";

import VideoPlayer from "../components/VideoPlayer";
import NameDisplay from "../components/NameDisplay";
import type { RoomNameType } from "../types/RoomNameType";

function RoomPage() {
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get("roomId");
  const name = searchParams.get("name");

  const [roomUsers, setRoomUsers] = useState<RoomNameType[]>([]);

  useEffect(() => {
    if (!roomId) return;

    if (socket.connected) {
      socket.emit("joinRoom", { roomId, name });
    } else {
      socket.on("connect", () => {
        socket.emit("joinRoom", { roomId, name });
      });
    }

    socket.on("room-users", (users) => {
      setRoomUsers(users);
      console.log("Users: ", users);
    });

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("connect");
      socket.off("room-users");
    };
  }, [roomId]);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center relative gap-4">
      <div className="items-center justify-center flex flex-col gap-4">
        <VideoPlayer roomId={roomId} />
      </div>
      {/* NameDisplay */}
      <div className="md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2">
        <NameDisplay roomUsers={roomUsers} />
      </div>
    </div>
  );
}

export default RoomPage;
