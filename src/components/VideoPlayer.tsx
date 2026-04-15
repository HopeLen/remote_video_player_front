import { useState } from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  const [url, setUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [title, setTitle] = useState("");

  async function loadVideoInfo() {
    const data = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(tempUrl)}&format=json`,
    ).then((res) => res.json());

    console.log(data);
    setTitle(data.title);
    setUrl(tempUrl);
  }

  return (
    <>
      {title && <h2 className="mt-2">{title}</h2>}{" "}
      <div className="flex justify-center items-center w-full max-w-3xl aspect-video">
        {url && (
          <div className="w-full max-w-4xl aspect-video">
            <ReactPlayer src={url} width="100%" height="100%" controls />
          </div>
        )}{" "}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 w-96"
          placeholder="Paste YouTube URL"
          value={tempUrl}
          onChange={async (e) => {
            console.log(e.target.value);
            setTempUrl(e.target.value);
          }}
        />{" "}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={loadVideoInfo}
        >
          Load
        </button>
      </div>
    </>
  );
}

export default VideoPlayer;
