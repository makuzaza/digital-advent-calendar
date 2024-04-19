import { useEffect, useRef, useState } from "react";
import axios from "axios";

// icons
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import DownloadingIcon from "@mui/icons-material/Downloading";

import { useAppSelector } from "../../hooks/useAppDispatch";

type Props = {
  audioSrc: string | undefined;
  type: string;
};

const MusicPlayer: React.FC<Props> = ({ audioSrc, type }) => {
  const uid = useAppSelector((state) => state.uid.uid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));

  useEffect(() => {
    if (audioSrc) {
      audioRef.current.pause();
      setIsPlaying(false);

      const urlPart = type === "music" ? "music" : "soundFx";

      const getSounds = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/storage/sounds/${urlPart}/${audioSrc}`,
            {
              params: {
                uid: uid,
              },
              responseType: "blob", // Set responseType to 'blob' to receive binary data
            }
          );
          const url = URL.createObjectURL(response.data);
          audioRef.current = new Audio(url);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error("Error sending token to backend:", error);
        }
      };
      getSounds();
    }
  }, [audioSrc, uid, type]);

  const togglePlay = () => {
    if (!audioSrc) return;
    const audio = audioRef.current;
    audio.loop = true; // Loop audio
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
        {isLoading ? (
          <DownloadingIcon />
        ) : !isPlaying ? (
          <PlayCircleIcon />
        ) : (
          <StopCircleIcon />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
