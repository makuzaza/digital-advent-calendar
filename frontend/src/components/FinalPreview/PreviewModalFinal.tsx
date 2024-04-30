import CloseIcon from "@mui/icons-material/Close";
import EmbedVideo from "../EmbedVideo/EmbedVideo";

import { WindowContent } from "../Modal/Modal";

type Props = {
  openPreviewModal: boolean;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  day: number;
  windowsContent: WindowContent[];
};

const PreviewModalFinal: React.FC<Props> = ({
  openPreviewModal,
  setOpenPreviewModal,
  day,
  windowsContent,
}) => {
  return (
    <div className={`modal ${openPreviewModal ? "open" : ""}`}>
      <div
        className="modal-backdrop"
        onClick={() => setOpenPreviewModal(false)}
      ></div>
      <div className="modal-content modal-final">
        Window {day + 1}
        <div>
          {windowsContent[day].imageURLModal && (
            <>
              <img
                src={windowsContent[day].imageURLModal}
                alt="Uploaded"
                style={{ width: "450px" }}
              />
            </>
          )}
        </div>
        <div>
          <p>{windowsContent[day].text}</p>
        </div>
        {windowsContent[day].videoURL && (
          <div style={{ width: "450" }}>
            <EmbedVideo videoURL={windowsContent[0].videoURL} />
          </div>
        )}
        {openPreviewModal && (
          <div
            className="close-modal"
            onClick={() => setOpenPreviewModal(false)}
          >
            <CloseIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewModalFinal;
