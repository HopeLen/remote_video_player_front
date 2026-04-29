import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { socket } from "../../socket";
import Button from "./Button";

function VideoPlayer({ roomId }: { roomId: string | null }) {
  const [url, setUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [title, setTitle] = useState("");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  //const [key, setKey] = useState(0);

  const playerRef = useRef<any>(null);

  async function loadVideoInfo() {
    const data = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(tempUrl)}&format=json`,
    ).then((res) => res.json());

    console.log(data);
    setTitle(data.title);
    setUrl(tempUrl);

    socket.emit("loadUrl", {
      url: tempUrl,
      title: data.title,
      roomId: roomId,
    });
  }

  const handleEnding = () => {
    setPlaying(true)
    socket.emit("client:play", {
      roomId,
      playing: true,
    });
  };

  useEffect(() => {
    socket.on("loadUrl", (data) => {
      setTitle(data.title);
      setUrl(data.url);
    });
    socket.on("room:play", () => {
      setMuted(true);
      setPlaying(true);
      setMuted(false);
    });
    socket.on("room:pause", () => {
      setMuted(true);
      setPlaying(false);
      setMuted(false);
    });

    return () => {
      socket.off("room:play");
      socket.off("room:pause");
      socket.off("loadUrl");
    };
  }, []);

  return (
    <>
      {title && <h2 className="mt-2">{title}</h2>}{" "}
      <div className="flex justify-center items-center w-full max-w-2xl aspect-video">
        {url && (
          <div className="w-full max-w-4xl aspect-video">
            <ReactPlayer
              //key={key}
              src={url}
              width="100%"
              height="100%"
              volume={0.5}
              controls
              muted={muted}
              playing={playing}
              onPlay={() => {
                socket.emit("client:play", { roomId, playing: true });
              }}
              onPause={() => {
                socket.emit("client:pause", { roomId, playing: false });
              }}
              onEnded={handleEnding}
              ref={playerRef}
              crossOrigin=""
            />
          </div>
        )}{" "}
      </div>
      <div className="flex gap-2 flex-col">
        <input
          className="border p-2 w-96 self-center"
          placeholder="Paste YouTube URL"
          value={tempUrl}
          onChange={async (e) => {
            console.log(e.target.value);
            setTempUrl(e.target.value);
          }}
        />{" "}
        <Button onClick={loadVideoInfo} text="Load" />
      </div>
    </>
  );
}

export default VideoPlayer;
