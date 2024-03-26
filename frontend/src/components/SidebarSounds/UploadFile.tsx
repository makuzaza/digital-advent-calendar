// icons
import UploadIcon from "@mui/icons-material/Upload";

const UploadFile: React.FC = () => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    console.log(file);
    // upload file to server
  };

  return (
    <div className="add-music">
      <label htmlFor="upload">
        <div className="btn">
          <h3>Upload</h3>
          <UploadIcon />
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
