import axios from "axios";

// icons
import UploadIcon from "@mui/icons-material/Upload";
import { useAppSelector } from "../../hooks/useAppDispatch";

type Props = {
  soundType: string;
};

const UploadFile: React.FC<Props> = ({ soundType }) => {
  const uid = useAppSelector((state) => state.uid.uid);
  const token = useAppSelector((state) => state.token.token);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append(soundType, file);
    formData.append("uid", uid);

    axios
      .post(`http://localhost:8000/storage/sounds/${soundType}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Send token in request headers
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log(`${soundType}:`, response.data);
      })
      .catch(() => {
        console.log(
          `Error uploading ${soundType}: Login to upload. UID and / or token required. `
        );
      });
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
          name="music"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default UploadFile;
