import CloseIcon from "@mui/icons-material/Close";

type Props = {
  openPreviewModal: boolean;
  setOpenPreviewModal: (openPreviewModal: boolean) => void;
  day: number;
};

const PreviewModal: React.FC<Props> = ({
  openPreviewModal,
  setOpenPreviewModal,
  day,
}) => {
  return (
    <div className="modal">
      <h1>Preview modal for the window {day}</h1>
      {openPreviewModal && (
        <div className="close-modal" onClick={() => setOpenPreviewModal(false)}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};

export default PreviewModal;
