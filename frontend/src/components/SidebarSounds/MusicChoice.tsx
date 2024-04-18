// components
import { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";

// icons
import AddIcon from "@mui/icons-material/Add";

type Props = {
  audioSrc: string;
  title: string;
  type: string;
  setMusicFile?: (file: string) => void;
  musicFile?: string;
  setMusicFX?: (musicFX: string) => void;
  musicFX?: string;
};

const MusicChoice: React.FC<Props> = ({
  audioSrc,
  title,
  type,
  musicFile,
  setMusicFile,
  setMusicFX,
  musicFX,
}) => {
  const [isSelected, setIsSelected] = useState<string | null>(null);

  // sound that user selected
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setIsSelected(e.target.value);

    if (type === "fx") {
      if (!setMusicFX) return;
      setMusicFX(audioSrc);
    } else {
      if (!setMusicFile) return;
      setMusicFile(audioSrc);
    }
  };

  // this is just to log to console which one is selected (name), and what is the music file path
  useEffect(() => {
    if (isSelected === null || musicFile === null || musicFX === null) return;
    console.log({
      selected: isSelected,
      musicFile: musicFile,
      musicFX: musicFX,
    });
  }, [isSelected, musicFile, musicFX]);

  return (
    <div className="two-col">
      <h3>{title}</h3>
      <div className="flex">
        <div>
          <label className="btn" htmlFor={`${title} ${type}`}>
            {<AddIcon />}
          </label>
          <input
            type="radio"
            id={`${title} ${type}`}
            name="sound"
            value={`${title} ${type}`}
            onChange={(e) => handleChange(e, type)}
            style={{ display: "none" }} // hide the radio button and show icon instead
          />
        </div>
        <MusicPlayer audioSrc={audioSrc} type={type} />
      </div>
    </div>
  );
};

export default MusicChoice;
