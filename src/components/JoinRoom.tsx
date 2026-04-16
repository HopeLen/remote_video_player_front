import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleRoomJoin = () => {
    console.log("Navigating to room:", roomId);

    navigate(`/room?roomId=${roomId}`);
  };

  return (
    <>
      <div className="border border-violet-600 rounded-2xl p-4 flex flex-col gap-5">
        <h2>Join existing room:</h2>
        <input
          type="text"
          placeholder="Enter room code"
          onChange={(e) => setRoomId(e.target.value)}
        ></input>
        <Button onClick={() => handleRoomJoin()} text="Join" />
      </div>
    </>
  );
}

export default JoinRoom;
