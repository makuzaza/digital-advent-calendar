import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';

// Define interface for component props
interface CustomComponentProps {
  title: string;
  subtitle: string;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubtitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleFont: string;
  titleFontSize: number;
  subtitleFont: string;
  subTitleFontSize: number;
  setTitleFont: (titleFont: string) => void;
  setSubtitleFont: (subtitleFont: string) => void;
  setTitleFontSize: (titleFontSize: number) => void;
  setSubTitleFontSize: (subTitleFontSize: number) => void;
  titleColor: string;
  subtitleColor: string;
  setTitleColor: (color: string) => void;
  setSubtitleColor: (color: string) => void;
}
  
  // fonts
  const fontOptions = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Roboto', 'Lato','Montserrat',  'Open Sans', 'Oswald', 'Helvetica'];
  
  const theme = createTheme();
  
  const useStyles = makeStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    slider: {
      width: 200,
      margin: theme.spacing(1),
    },
  });
  
export const CustomComponent: React.FC<CustomComponentProps> = ({ title, subtitle, setTitle, setSubtitle, titleFont, titleFontSize, subtitleFont, subTitleFontSize, setTitleFont, setSubtitleFont, setTitleFontSize, setSubTitleFontSize, titleColor, subtitleColor, setTitleColor, setSubtitleColor }) => {

  const classes = useStyles();

    // Event handler for font change
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  
  const onSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(event.target.value);
  }

  const handleTitleFontChange = (event: SelectChangeEvent<string>) => {
    setTitleFont(event.target.value);
  };
  

  const handleSubtitleFontChange = (event: SelectChangeEvent<string>) => {
    setSubtitleFont(event.target.value);
  };
  
    // Event handler for font size change
  const handleTitleFontSizeChange = (event: any, newValue: number | number[]) => {
    setTitleFontSize(newValue as number);
  };

  const handleSubtitleFontSizeChange = (event: any, newValue: number | number[]) => {
    setSubTitleFontSize(newValue as number);
  };

   // Event handler for font color change
  const handleTitleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleColor(event.target.value);
  };

  const handleSubtitleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitleColor(event.target.value);
  };
    
  
return (
      <ThemeProvider theme={theme}>
        <div>
          <FormControl className={classes.formControl}>
          <TextField
            placeholder='Enter title here...'
            value={title}
            onChange={onTitleChange}
            style={{ width: '200px', height: '50px',
              backgroundColor: '#f5f5f5', borderRadius: '7px', fontSize: '20px' }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            multiline
            rows={5} 
            placeholder='Enter subtitle here...'
            value={subtitle}
            onChange={onSubtitleChange}
            style={{ width: '200px', backgroundColor: '#f5f5f5', borderRadius: '7px', fontSize: '20px',verticalAlign: 'top' }}
          />
        </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="title-font-select-label" style={{ color: 'white' }}>Title Font</InputLabel>
            <Select
              labelId="title-font-select-label"
              id="title-font-select"
              value={titleFont}
              onChange={handleTitleFontChange}
              style={{ color: 'white', fontFamily: titleFont }}
            >
              {fontOptions.map((font, index) => (
                <MenuItem key={index} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="subtitle-font-select-label" style={{ color: 'white' }}>Subtitle Font</InputLabel>
            <Select
              labelId="subtitle-font-select-label"
              id="subtitle-font-select"
              value={subtitleFont}
              onChange={handleSubtitleFontChange}
              style={{ color: 'white', fontFamily: subtitleFont}}
            >
              {fontOptions.map((font, index) => (
                <MenuItem key={index} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Slider to select font size */}
          <div className={classes.slider}>
            <Typography id="font-size-slider" gutterBottom>
              Title Font Size
            </Typography>
            <Slider
              value={titleFontSize}
              min={18}
              max={73}
              step={2}
              onChange={handleTitleFontSizeChange}
              aria-labelledby="font-size-slider"
            />
          </div>

          <div className={classes.slider}>
            <Typography id="font-size-slider" gutterBottom>
              Subtitle Font Size
            </Typography>
            <Slider
              value={subTitleFontSize}
              min={18}
              max={73}
              step={2}
              onChange={handleSubtitleFontSizeChange}
              aria-labelledby="font-size-slider"
            />
          </div>

          <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="title-color-label" style={{ color: 'white' }}>Title Color</InputLabel>
            <Input type="color" id="title-color" value={titleColor} onChange={handleTitleColorChange} />
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="subtitle-color-label" style={{ color: 'white' }}>Subtitle Color</InputLabel>
            <Input type="color" id="subtitle-color" value={subtitleColor} onChange={handleSubtitleColorChange} />
          </FormControl>
        </div>

        </div>
      </ThemeProvider>
    );
  };
  
export default CustomComponent;