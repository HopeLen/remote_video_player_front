import { v4 as uuidv4 } from "uuid";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateRoom({ name }: { name: string }) {
  const navigate = useNavigate();
  const [flashRed, setFlashRed] = useState(false);

  const handleFlash = async () => {
    setFlashRed(true);

    await new Promise((r) => setTimeout(r, 300));

    setFlashRed(false);
    return;
  };

  const handleRoomCreation = () => {
    const roomId = uuidv4();

    console.log("Navigating to room:", roomId);

    if (name) {
      navigate(`/room?roomId=${roomId}&name=${name}`);
    } else {
      handleFlash();
    }
  };

  return (
    <div className="border border-violet-600 rounded-2xl p-4 flex flex-col gap-5 justify-between">
      <h2>Create new room:</h2>
      <Button
        onClick={() => handleRoomCreation()}
        errorCondition={flashRed}
        text="Create"
      />
    </div>
  );
}

export default CreateRoom;
