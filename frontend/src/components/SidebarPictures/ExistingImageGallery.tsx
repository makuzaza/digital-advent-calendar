import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import "./ExistingImageGallery.css";

type Props = {
  setSelectedBackground: (backgroundUrl: string) => void;
  selectedBackground: string;
  onImageSelect: (imageUrl: string) => void;
};

const CalendarEditor: React.FC<Props> = ({
  setSelectedBackground,
  selectedBackground,
}) => {
  const [randomImages, setRandomImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        if (!unsplashKey) {
          // console.error("Unsplash API key is missing. Set VITE_UNSPLASH_ACCESS_KEY in .env");
          return;
        }
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              count: 10,
              client_id: unsplashKey,
            },
          }
        );

        const imageUrls = response.data.map((photo: any) => photo.urls.regular);
        setRandomImages(imageUrls);
      } catch (error) {
        // console.error("Error fetching random images:", error);
      }
    };

    fetchRandomImages();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedBackground(imageUrl);   
    // console.log('Selected background:', imageUrl);
  };

  useEffect(() => {
      const container = document.getElementById("preview-container");  
      if (container) {
        if (selectedBackground) {
          container.style.backgroundImage = `url(${selectedBackground})`;
          container.style.backgroundRepeat = "no-repeat";
          container.style.backgroundSize = "cover";
          container.style.backgroundPosition = "center";
          container.style.maxWidth = "100%";
          container.style.height = "100%";
        }
      }
    }, [selectedBackground]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-images">
        <Grid container spacing={1}>
          {randomImages.map((imageUrl, index) => (
            <Grid item key={index}>
              <img
                src={imageUrl}
                alt={`Random Image ${index + 1}`}
                onClick={() => handleImageClick(imageUrl)}
                className="dashboard-image"
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CalendarEditor;