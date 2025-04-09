import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video, className, ...props }) => {
  const playerRef = useRef(null);
  const [videoResolution, setVideoResolution] = useState("720");
  const [seekTime, setSeekTime] = useState(0);
  
  useEffect(() => {
    if (navigator?.connection) {
      const detectedNetworkQuality = navigator.connection.effectiveType;
      function handleResolutionSwitch(networkQuality) {
        if (networkQuality === "4g") {
          setVideoResolution("720");
        } else if (networkQuality === "3g") {
          setVideoResolution("540");
        } else if (networkQuality === "2g") {
          setVideoResolution("360");
        } else {
          setVideoResolution("720");
        }

        const currentTime = playerRef?.current?.getCurrentTime();
        setSeekTime(currentTime);
      }

      handleResolutionSwitch(detectedNetworkQuality);

      const updateNetworkQuality = () => {
        const updatedNetworkQuality = navigator?.connection?.effectiveType;
        handleResolutionSwitch(updatedNetworkQuality);
      };

      navigator.connection.addEventListener("change", updateNetworkQuality);

      return () => {
        navigator.connection.removeEventListener(
          "change",
          updateNetworkQuality
        );
      };
    }
  }, []);

  useEffect(() => {
    if (seekTime > 0) {
      playerRef?.current?.seekTo(seekTime);
    }
  }, [videoResolution]);

  return (
    <ReactPlayer
    className={className}
      ref={playerRef}
      url={ typeof(video) === 'object'? video?.[videoResolution]  : video}
      width="100%"
      height="100%"
      loop={false}
      {...props}
    />
  );
};

export default VideoPlayer;


