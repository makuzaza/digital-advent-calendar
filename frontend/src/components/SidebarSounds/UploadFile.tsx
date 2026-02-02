import axios from "axios";

// icons
import UploadIcon from "@mui/icons-material/Upload";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { refreshFirebaseToken } from "../../utils/tokenUtils";
const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  soundType: string;
  setMusicFX: (file: string) => void;
  setMusicFile: (musicFile: string) => void;
};

const UploadFile: React.FC<Props> = ({
  soundType,
  setMusicFX,
  setMusicFile,
}) => {
  const uid = useAppSelector((state) => state.uid.uid);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    // Refresh token before upload
    const freshToken = await refreshFirebaseToken();
    if (!freshToken) {
      // console.error("Failed to refresh token");
      return;
    }

    const formData = new FormData();
    formData.append(soundType, file);
    formData.append("uid", uid);

    try {
      const response = await axios.post(
        `${API_URL}/storage/sounds/${soundType}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": freshToken,
          },
        }
      );

      // console.log(`${soundType}:`, response.data);
      if (soundType === "music") {
        setMusicFile(response.data.musicName);
      } else {
        setMusicFX(response.data.soundFxName);
      }
    } catch (error) {
      console.log(
        `Error uploading ${soundType}: Login to upload. UID and / or token required.`,
        error
      );
    }
  };

  return (
    <div className="add-music">
      <label>
        <div className="btn">
          <h3>Upload</h3>
          <UploadIcon />
          <p>{soundType}</p>
        </div>
        <input
          type="file"
          name={soundType}
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default UploadFile;
