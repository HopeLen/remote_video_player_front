import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

function RoomPicker() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-fit flex gap-2 flex-col md:flex-row">
          <JoinRoom />
          <CreateRoom/>
        </div>
      </div>
    </>
  );
}

export default RoomPicker;
