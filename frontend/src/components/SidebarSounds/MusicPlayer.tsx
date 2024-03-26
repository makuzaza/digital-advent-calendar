import { useState, useRef } from "react";

// icons
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";

type Props = {
  audioSrc: string;
};

const MusicPlayer: React.FC<Props> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0; // Reset playback to the beginning
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
    audio.onended = () => setIsPlaying(false); // Reset play button when audio ends
  };

  return (
    <div>
      <button className="btn" onClick={togglePlay}>
        {!isPlaying ? <PlayCircleIcon /> : <StopCircleIcon />}
      </button>
    </div>
  );
};

export default MusicPlayer;
