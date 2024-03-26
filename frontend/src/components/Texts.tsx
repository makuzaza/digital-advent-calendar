import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define interface for component props
interface CustomComponentProps {
    title: string;
    subtitle: string;
    onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubtitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  // fonts
  const fontOptions = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana'];
  // font size options
  const fontSizeOptions = [10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 54];
  
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
  
  const CustomComponent: React.FC<CustomComponentProps> = ({ title, subtitle, onTitleChange, onSubtitleChange }) => {
    const classes = useStyles();
    // Initialize state for title font, subtitle font, and font size
    const [titleFont, setTitleFont] = useState<string>(fontOptions[0]);
    const [subtitleFont, setSubtitleFont] = useState<string>(fontOptions[0]);
    const [fontSize, setFontSize] = useState<number>(fontSizeOptions[0]);
  
    // Event handler for title font change
    const handleTitleFontChange = (event: SelectChangeEvent<string>) => {
        setTitleFont(event.target.value);
      };
  
    // Event handler for subtitle font change
    const handleSubtitleFontChange = (event: SelectChangeEvent<string>) => {
        setSubtitleFont(event.target.value);
      };
  
    // Event handler for font size change
    const handleFontSizeChange = (event: any, newValue: number | number[]) => {
      setFontSize(newValue as number);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <div>
          <FormControl className={classes.formControl}>
          <InputLabel style={{ color: 'lightgrey' }}>Title</InputLabel>
          <Input
            value={title}
            onChange={onTitleChange}
            style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', fontFamily: titleFont, fontSize: fontSize }}
          />
        </FormControl>
        {/* Input field for subtitle with selected font and font size */}
        <FormControl className={classes.formControl}>
          <InputLabel style={{ color: 'lightgrey' }}>Subtitle</InputLabel>
          <Input
            value={subtitle}
            onChange={onSubtitleChange}
            style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', fontFamily: titleFont, fontSize: fontSize }}
          />
        </FormControl>
          {/* Dropdown to select title font */}
          <FormControl className={classes.formControl}>
            <InputLabel id="title-font-select-label" style={{ color: 'white' }}>Title Font</InputLabel>
            <Select
              labelId="title-font-select-label"
              id="title-font-select"
              value={titleFont}
              onChange={handleTitleFontChange}
              style={{ color: 'white' }}
            >
              {fontOptions.map((font, index) => (
                <MenuItem key={index} value={font}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Dropdown to select subtitle font */}
          <FormControl className={classes.formControl}>
            <InputLabel id="subtitle-font-select-label" style={{ color: 'white' }}>Subtitle Font</InputLabel>
            <Select
              labelId="subtitle-font-select-label"
              id="subtitle-font-select"
              value={subtitleFont}
              onChange={handleSubtitleFontChange}
              style={{ color: 'white' }}
            >
              {fontOptions.map((font, index) => (
                <MenuItem key={index} value={font}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Slider to select font size */}
          <div className={classes.slider}>
            <Typography id="font-size-slider" gutterBottom>
              Font Size
            </Typography>
            <Slider
              value={fontSize}
              min={10}
              max={32}
              step={2}
              onChange={handleFontSizeChange}
              aria-labelledby="font-size-slider"
            />
          </div>
        </div>
      </ThemeProvider>
    );
  };
  
  export default CustomComponent;