import React, { useState } from 'react';
import './index.css';
import { SliderPicker } from 'react-color';
import Lightbulb from '../Lightbulb';

function App() {
  const [color, setColor] = useState('#fff');

  return (
    <div className="App">
      <header className="App-header">
        <p>Bluetooth <code>Lightbulb</code></p>

        <div className="container">
          <SliderPicker
            color={ color }
            onChangeComplete={ setColor }
          />
        </div>

        <Lightbulb color={ color } />
      </header>
    </div>
  );
}

export default App;
