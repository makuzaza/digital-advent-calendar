// styles
import "./SidebarSounds.css";

// components
import MusicChoice from "./MusicChoice";
import UploadFile from "./UploadFile";

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
          audioSrc={"xmas-music.mp3"}
          title={"Christmas"}
          type={"music"}
        />
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={"horror-music.mp3"}
          title={"Horror"}
          type={"music"}
        />
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={"fantasy-music.mp3"}
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
          audioSrc={"xmas-fx.mp3"}
          title={"Christmas"}
          type={"fx"}
        />
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={"horror-fx.mp3"}
          title={"Horror"}
          type={"fx"}
        />
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={"fantasy-fx.mp3"}
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
