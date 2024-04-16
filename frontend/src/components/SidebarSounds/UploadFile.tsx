import axios from "axios";

// icons
import UploadIcon from "@mui/icons-material/Upload";
import { useState } from "react";

type Props = {
  soundType: string;
};

const UploadFile: React.FC<Props> = ({ soundType }) => {
  const [type, setType] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let musicType = type;

    if (type === "") {
      musicType = "soundFx";
    }

    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append(musicType, file);
    axios
      .post(`http://localhost:8000/storage/sounds/${musicType}`, formData)
      .then((response) => {
        console.log(`${musicType}:`, response.data);
      })
      .catch((error) => {
        console.error(`Error uploading ${musicType}:`, error);
      });
    return;
  };

  return (
    <div className="add-music">
      <label htmlFor="upload" onClick={() => setType(soundType)}>
        <div className="btn">
          <h3>Upload</h3>
          <UploadIcon />
          <p>{soundType}</p>
        </div>
      </label>
      <input
        type="file"
        name="music"
        id="upload"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadFile;
