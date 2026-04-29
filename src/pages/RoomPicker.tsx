import { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import NamePicker from "../components/NamePicker";
import TextParagraph from "../components/TextParagraph";

function RoomPicker() {
  const [name, setName] = useState("");

  const introText =
    "This is a remote video player made mainly for Wiz. Simply name yourself (this is important Kami) and either join a room through a code you were sent or create one.";

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center flex-col gap-3">
        <div className="w-fit max-w-2xs flex flex-col gap-3">
          <TextParagraph text={introText} />
          <NamePicker onChange={setName} />
        </div>
        <div className="w-fit flex gap-2 flex-col md:flex-row">
          <JoinRoom name={name} />
          <CreateRoom name={name} />
        </div>
      </div>
    </>
  );
}

export default RoomPicker;
