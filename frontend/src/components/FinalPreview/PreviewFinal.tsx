import { useState } from "react";

// styles
import "../Preview.css";

// components
import WindowFinal from "./WindowFinal";
import MusicPlayer from "../SidebarSounds/MusicPlayer";
import PreviewModalFinal from "./PreviewModalFinal";

import { Typography } from "@mui/material";
import CopyURL from "../Share/CopyURL";
import Share from "../Share/Share";

type Props = {
  title: string;
  subtitle: string;
  titleFont: string;
  titleFontSize: number;
  subtitleFont: string;
  subTitleFontSize: number;
  windows: string[];
  titleColor: string;
  subtitleColor: string;
  musicFile: string;
  musicFX: string;
  imageURL: string;
  uploadedImageName: string;
  windowsContent: WindowContent[];
};

interface WindowContent {
  text: string;
  videoURL: string;
  imageURLModal: string;
  uploadedImageName?: string;
}

const PreviewFinal: React.FC<Props> = ({
  title,
  subtitle,
  titleFont,
  titleFontSize,
  subtitleFont,
  subTitleFontSize,
  windows,
  titleColor,
  subtitleColor,
  musicFile,
  musicFX,
  imageURL,
  windowsContent,
}) => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [day, setDay] = useState(1);

  return (
    <div className="home">
      <div>
        <CopyURL />
        <Share url={window.location.href} />
      </div>
      <div id="preview-container">
        <div className="preview preview-final">
          <div>
            {musicFile && (
              <>
                <p>Music: </p>
                <MusicPlayer audioSrc={musicFile} type={"music"} />
              </>
            )}
          </div>
          <div className="preview-soundfx">
            {musicFX && (
              <>
                <p>FX: </p>
                <MusicPlayer audioSrc={musicFX} type={"soundFx"} />
              </>
            )}
          </div>
          <img src={imageURL} alt="" width="100" height="100" />

          <div className="title">
            <Typography
              variant="h4"
              component="h2"
              style={{
                fontFamily: titleFont,
                fontSize: titleFontSize,
                color: titleColor,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              style={{
                fontFamily: subtitleFont,
                fontSize: subTitleFontSize,
                color: subtitleColor,
              }}
            >
              {subtitle}
            </Typography>
          </div>
          <div className="windows">
            {windows.map((window, index) => (
              <WindowFinal
                setOpenPreviewModal={setOpenPreviewModal}
                key={window}
                date={window}
                day={index + 1}
                setDay={setDay}
                windowsContent={windowsContent}
              />
            ))}
          </div>
          {openPreviewModal && (
            <div className="modal-preview">
              <PreviewModalFinal
                day={day}
                openPreviewModal={openPreviewModal}
                setOpenPreviewModal={setOpenPreviewModal}
                windowsContent={windowsContent}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewFinal;
