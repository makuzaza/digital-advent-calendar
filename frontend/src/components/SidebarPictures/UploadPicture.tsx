import React, { useState } from "react";
import ExistingImageGallery from './ExistingImageGallery';
import UploadIcon from "@mui/icons-material/Upload";


interface UploadPictureProps {
  existingImages: string[];
}

const UploadPicture: React.FC<UploadPictureProps> = ({ existingImages }) => {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedBackground(URL.createObjectURL(file));
    }
  };

  // Function to handle selection of existing background
  const handleBackgroundSelect = (backgroundUrl: string) => {
    setSelectedBackground(backgroundUrl);
  };

  return (
    <div>
      <label htmlFor="upload">Upload Image:</label>
      <input id="upload" type="file" accept="image/*" onChange={handleImageUpload} />

      {/* List of existing backgrounds to choose from */}
      <div>
        <h3>Select backgrounds:</h3>
        <ExistingImageGallery existingImages={existingImages} onImageSelect={handleBackgroundSelect} />
      </div>

      {/* to Display selected background */}
      {selectedBackground && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Background:</h3>
          <img src={selectedBackground} alt="Selected Background" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default UploadPicture;
