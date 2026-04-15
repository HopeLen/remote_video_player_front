import { Routes, Route } from "react-router-dom";
import RoomPicker from "./pages/RoomPicker";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomPicker />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </>
  );
}

export default App;
