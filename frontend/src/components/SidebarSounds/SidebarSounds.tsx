// styles
import "./SidebarSounds.css";

// components
import MusicChoice from "./MusicChoice";
import UploadFile from "./UploadFile";

import xmasMusic from "../../assets/merry-christmas.mp3";
import horrorMusic from "../../assets/horror.mp3";
import fantasyMusic from "../../assets/fantasy.mp3";
import christmasSound from "../../assets/winter.mp3";
import horrorSound from "../../assets/horror-sound.mp3";
import fantasySound from "../../assets/fantasy-sound.mp3";

// types
type Props = {
  musicFile: string;
  setMusicFile: (file: string) => void;
  setMusicFX: (musicFX: string) => void;
  musicFX: string;
};

const SidebarSounds: React.FC<Props> = ({
  musicFile,
  setMusicFile,
  setMusicFX,
  musicFX,
}) => {
  return (
    <div className="sidebar-sounds">
      <h2>Background Music</h2>
      <div className="music-choices">
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={xmasMusic}
          title={"Christmas"}
          type={"music"}
        />
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={horrorMusic}
          title={"Horror"}
          type={"music"}
        />
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={fantasyMusic}
          title={"Fantasy"}
          type={"music"}
        />
      </div>
      <UploadFile
        soundType="music"
        setMusicFile={setMusicFile}
        setMusicFX={setMusicFX}
      />
      <h2>Sound Effects</h2>
      <div className="music-choices">
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={christmasSound}
          title={"Christmas"}
          type={"fx"}
        />
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={horrorSound}
          title={"Horror"}
          type={"fx"}
        />
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={fantasySound}
          title={"Fantasy"}
          type={"fx"}
        />
      </div>
      <UploadFile
        soundType="soundFx"
        setMusicFX={setMusicFX}
        setMusicFile={setMusicFile}
      />
    </div>
  );
};

export default SidebarSounds;
