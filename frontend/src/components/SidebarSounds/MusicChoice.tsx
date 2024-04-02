// components
import { useEffect, useState } from "react";
import MusicPlayer from "./MusicPlayer";

// icons
import AddIcon from "@mui/icons-material/Add";

type Props = {
  audioSrc: string;
  title: string;
  type: string;
};

const MusicChoice: React.FC<Props> = ({ audioSrc, title, type }) => {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [musicFile, setMusicFile] = useState<string | null>(null);

  // sound that user selected
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.value);
    setMusicFile(audioSrc); // this need to be saved to the server
  };

  // this is just to see which one is selected, and what is the music file
  useEffect(() => {
    if (isSelected === null || musicFile === null) return;
    console.log({ selected: isSelected, musicFile: musicFile });
  }, [isSelected, musicFile]);

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
            onChange={handleChange}
            style={{ display: "none" }} // hide the radio button and show icon instead
          />
        </div>
        <MusicPlayer audioSrc={audioSrc} />
      </div>
    </div>
  );
};

export default MusicChoice;
