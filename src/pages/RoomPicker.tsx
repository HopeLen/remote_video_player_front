import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import NamePicker from "../components/NamePicker";

function RoomPicker() {
  const [name, setName] = useState("");

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center flex-col gap-3">
        <div>
          <NamePicker onChange={setName} />
        </div>
        <div className="w-fit flex gap-2 flex-col md:flex-row">
          <JoinRoom name={name} />
          <CreateRoom />
        </div>
      </div>
    </>
  );
}

export default RoomPicker;
