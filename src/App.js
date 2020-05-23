import React, { useState } from 'react';
import './App.css';
import { SliderPicker } from 'react-color';

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
      </header>
    </div>
  );
}

export default App;
