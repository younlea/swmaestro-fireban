import React, { useState } from "react";

import ReactPlayer from "react-player";

function StreamPlayer({ streamUrl }) {
  // const source =
  //   "http://www.fireban.kr/api/stream/live/sDbgKBpBXC0CQ474kWWP/index.m3u8";

  const [duration, setDuration] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(null);

  const onDuration = duration => {
    console.log(123, duration);
    setDuration({ duration });
  };
  const onProgress = progress => {
    if (!duration) {
      // Sadly we don't have the duration yet so we can't do anything
      return;
    }

    // progress.played is the fraction of the video that has been played
    // so multiply with duration to get number of seconds elapsed
    const played = progress.played;
    console.log(duration.duration);
    console.log(played);
    const test = Number(progress.played) * Number(duration.duration);
    console.log(test);

    if (test !== secondsElapsed) {
      setSecondsElapsed({ test });
    }
  };
  const url = "http://www.fireban.kr" + streamUrl;

  return (
    <>
      <ReactPlayer
        // className="react-player"
        style={{ marginBottom: "1rem" }}
        url={url}
        width="100%"
        height="50vh"
        // onReady="true"
        controls={true}
        onDuration={onDuration}
        onProgress={onProgress}
      />
    </>
  );
}

export default StreamPlayer;
