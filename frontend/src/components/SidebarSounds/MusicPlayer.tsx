import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const API_URL = import.meta.env.VITE_API_URL;

// icons
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import DownloadingIcon from "@mui/icons-material/Downloading";

type Props = {
  audioSrc: string | undefined;
  type: string;
};

const MusicPlayer: React.FC<Props> = ({ audioSrc, type }) => {
  const uid = useSelector((state: RootState) => state.uid.uid);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));

  useEffect(() => {
    if (audioSrc) {
      audioRef.current.pause();
      setIsPlaying(false);

      // Check if it's a local imported asset (blob URL from Vite)
      const isImportedAsset = audioSrc.startsWith("blob:") || 
                              audioSrc.includes("/assets/") ||
                              audioSrc.startsWith("http://") ||
                              audioSrc.startsWith("https://");

      if (isImportedAsset) {
        // Play local asset directly
        audioRef.current = new Audio(audioSrc);
        console.log("Playing local asset:", audioSrc);
      } else {
        // Otherwise, it's an uploaded file - fetch from backend
        const urlPart = type === "music" ? "music" : "soundFx";

        const getSounds = async () => {
          setIsLoading(true);
          try {
            const response = await axios.get(
              `${API_URL}/storage/sounds/${urlPart}/${audioSrc}`,
              {
                params: { uid },
                responseType: "blob",
              }
            );
            const url = URL.createObjectURL(response.data);
            audioRef.current = new Audio(url);
            console.log("Playing uploaded file:", audioSrc);
          } catch (error) {
            console.error("Error loading uploaded audio:", error);
          } finally {
            setIsLoading(false);
          }
        };
        getSounds();
      }
    }

    // Cleanup: stop audio when component unmounts or audioSrc changes
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
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