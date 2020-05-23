import React from 'react';
import './index.css';
import { ChromePicker } from 'react-color';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

function Color({ color, onChangeColor, mode, onChangeMode }) {
  return (
    <div className="container">
      <ChromePicker
        color={ color }
        onChangeComplete={ onChangeColor }
        disableAlpha={ true }
      />

      <FormControl component="fieldset" className="mode">
        <RadioGroup aria-label="gender" name="mode" value={ mode } onChange={ (event) => onChangeMode(event.target.value) }>
          <FormControlLabel value="color" control={<Radio />} label="Color" />
          <FormControlLabel value="candle" control={<Radio />} label="Candle" />
          <FormControlLabel value="flash" control={<Radio />} label="Flash" />
          <FormControlLabel value="pulse" control={<Radio />} label="Pulse" />
          <FormControlLabel value="rainbow" control={<Radio />} label="Rainbow" />
          <FormControlLabel value="rainbowFade" control={<Radio />} label="Rainbow (fade)" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Color;
