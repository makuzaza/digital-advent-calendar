// styles
import "./SidebarSounds.css";

// music
import xmasMusic from "../../assets/music/xmas-music.mp3";
import horrorMusic from "../../assets/music/horror-music.mp3";
import fantasyMusic from "../../assets/music/fantasy-music.mp3";

// sound-FX
import xmasFX from "../../assets/sound-fx/xmas-fx.mp3";
import horrorFX from "../../assets/sound-fx/horror-fx.mp3";
import fantasyFX from "../../assets/sound-fx/fantasy-fx.mp3";

// components
import MusicChoice from "./MusicChoice";
import UploadFile from "./UploadFile";

const SidebarSounds = () => {
  return (
    <div className="sidebar-sounds">
      <h2>Background Music</h2>
      <div className="music-choices">
        <MusicChoice audioSrc={xmasMusic} title={"Christmas"} type={"music"} />
        <MusicChoice audioSrc={horrorMusic} title={"Horror"} type={"music"} />
        <MusicChoice audioSrc={fantasyMusic} title={"Fantasy"} type={"music"} />
      </div>
      <UploadFile />
      <h2>Sound Effects</h2>
      <div className="music-choices">
        <MusicChoice audioSrc={xmasFX} title={"Christmas"} type={"fx"} />
        <MusicChoice audioSrc={horrorFX} title={"Horror"} type={"fx"} />
        <MusicChoice audioSrc={fantasyFX} title={"Fantasy"} type={"fx"} />
      </div>
      <UploadFile />
    </div>
  );
};

export default SidebarSounds;
