import { v4 as uuidv4 } from "uuid";

import Button from "./Button";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const navigate = useNavigate();

  const handleRoomCreation = () => {
    const roomId = uuidv4();
    console.log("Joining room: ", roomId);

    navigate(`/room/${roomId}`);
  };

  return (
    <div className="border border-violet-600 rounded-2xl p-4 flex flex-col gap-5 justify-between">
      <h2>Create new room:</h2>
      <Button onClick={() => handleRoomCreation()} text="Create" />
    </div>
  );
}

export default CreateRoom;
