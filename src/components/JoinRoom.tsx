import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function JoinRoom({ name }: { name: string }) {
  const [roomId, setRoomId] = useState("");
  const [flashRed, setFlashRed] = useState(false);

  const navigate = useNavigate();

  const handleFlash = async () => {
    setFlashRed(true);

    await new Promise((r) => setTimeout(r, 300));

    setFlashRed(false);
    return;
  };

  const handleRoomJoin = () => {
    console.log("Navigating to room:", roomId);

    if (name && roomId) {
      navigate(`/room?roomId=${roomId}&name=${name}`);
    } else {
      handleFlash();
    }
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
        <Button
          onClick={() => handleRoomJoin()}
          errorCondition={flashRed}
          text="Join"
        />
      </div>
    </>
  );
}

export default JoinRoom;
