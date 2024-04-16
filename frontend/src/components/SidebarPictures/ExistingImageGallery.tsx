import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import './ExistingImageGallery.css'; 

interface CalendarEditorProps {
  selectedBackground: string | null;
}

const CalendarEditor: React.FC<CalendarEditorProps> = ({ selectedBackground }) => {
  const [randomImages, setRandomImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            count: 12, 
            client_id: 'A9wMU_lZC4OW9kPTBjQOl6fncG6cTE13hDUtzDZ6xYE', 
          },
        });
        const imageUrls = response.data.map((photo: any) => photo.urls.regular);
        setRandomImages(imageUrls);
      } catch (error) {
        console.error('Error fetching random images:', error);
      }
    };

    fetchRandomImages();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  const handleImageClick = (imageUrl: string) => {
    document.body.style.backgroundImage = `url(${imageUrl})`; 
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.maxWidth = '100%';
    document.body.style.height = '100%';
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-images'>
        <Grid container spacing={1}>
          {randomImages.map((imageUrl, index) => (
            <Grid item key={index}>
              <img
                src={imageUrl}
                alt={`Random Image ${index + 1}`}
                onClick={() => handleImageClick(imageUrl)}
                className='dashboard-image'
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className='dashboard-background' style={{ backgroundImage: `url(${selectedBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
    </div>
  );
};

export default CalendarEditor;
