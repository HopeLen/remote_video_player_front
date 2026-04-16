import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../../socket";

import VideoPlayer from "../components/VideoPlayer";

function RoomPage() {
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get("roomId");

  useEffect(() => {
    if (!roomId) return;

    if (socket.connected) {
      socket.emit("joinRoom", roomId);
    } else {
      socket.on("connect", () => {
        socket.emit("joinRoom", roomId);
      });
    }

    return () => {
      socket.off("connect");
    };
  }, [roomId]);

  return (
    <div className="flex w-screen h-screen flex-col items-center gap-3">
      <VideoPlayer roomId={roomId} />
    </div>
  );
}

export default RoomPage;
