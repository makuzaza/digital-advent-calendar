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
          audioSrc={"/music/xmas-music.mp3"}
          title={"Christmas"}
          type={"music"}
        />
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={"/music/horror-music.mp3"}
          title={"Horror"}
          type={"music"}
        />
        <MusicChoice
          musicFile={musicFile}
          setMusicFile={setMusicFile}
          audioSrc={"/music/fantasy-music.mp3"}
          title={"Fantasy"}
          type={"music"}
        />
      </div>
      <UploadFile />
      <h2>Sound Effects</h2>
      <div className="music-choices">
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={"/sound-fx/xmas-fx.mp3"}
          title={"Christmas"}
          type={"fx"}
        />
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={"/sound-fx/horror-fx.mp3"}
          title={"Horror"}
          type={"fx"}
        />
        <MusicChoice
          musicFX={musicFX}
          setMusicFX={setMusicFX}
          audioSrc={"/sound-fx/fantasy-fx.mp3"}
          title={"Fantasy"}
          type={"fx"}
        />
      </div>
      <UploadFile />
    </div>
  );
};

export default SidebarSounds;
