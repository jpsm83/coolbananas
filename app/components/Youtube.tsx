"client only";

import YouTube, { YouTubeProps } from "react-youtube";

interface YoutubeProps {
  videoId: string;
}

const Youtube: React.FC<YoutubeProps> = ({ videoId }) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default YouTube;