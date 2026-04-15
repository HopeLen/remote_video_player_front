import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { socket } from "../../socket";
import Button from "./Button";

function VideoPlayer({ roomId }: { roomId: string | undefined }) {
  const [url, setUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [title, setTitle] = useState("");
  const [playing, setPlaying] = useState(false);

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

  socket.on("loadUrl", (data) => {
    setTitle(data.title);
    setUrl(data.url);
  });

  useEffect(() => {
    socket.on("room:play", () => {
      setPlaying(true);
    });
    socket.on("room:pause", () => {
      setPlaying(false);
    });

    return () => {
      socket.off("room:play");
      socket.off("room:pause");
    };
  }, []);

  return (
    <>
      {title && <h2 className="mt-2">{title}</h2>}{" "}
      <div className="flex justify-center items-center w-full max-w-3xl aspect-video">
        {url && (
          <div className="w-full max-w-4xl aspect-video">
            <ReactPlayer
              src={url}
              width="100%"
              height="100%"
              controls
              muted={false}
              playing={playing}
              onPlay={() => {
                socket.emit("client:play", { roomId, playing: true });
              }}
              onPause={() => {
                socket.emit("client:pause", { roomId, playing: false });
              }}
            />
          </div>
        )}{" "}
      </div>
      <div className="flex gap-2 flex-col">
        <input
          className="border p-2 w-96"
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
