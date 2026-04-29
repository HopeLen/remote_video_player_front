import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../socket";

import VideoPlayer from "../components/VideoPlayer";
import NameDisplay from "../components/NameDisplay";
import type { RoomNameType } from "../types/RoomNameType";
import CopyButton from "../components/CopyButton";
import TextParagraph from "../components/TextParagraph";

function RoomPage() {
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get("roomId");
  const name = searchParams.get("name");

  const [roomUsers, setRoomUsers] = useState<RoomNameType[]>([]);

  const text =
    "Paste the youtube link into the input bar and press load to load the video for everyone in the room. Keep in mind the video does NOT autoplay, you'll have to press play. Afterwards the play/pause actions are synced between everyone in the room. The volume and timestamp are NOT synced. All videos by default are looped. Enjoy ;)";

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
        <CopyButton roomId={roomId} />
      </div>
      {/* NameDisplay */}
      <div className="md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2">
        <NameDisplay roomUsers={roomUsers} />
      </div>
        <div className="w-fit max-w-2xs flex flex-col gap-3 md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2">
        <TextParagraph text={text} />
      </div>
    </div>
  );
}

export default RoomPage;
