import React, { useState } from 'react';
import './index.css';
import Color from '../Color';
import Lightbulb from '../Lightbulb';

const DEFAULT_COLOR = {
  rgb: {
    r: 255,
    g: 0,
    b: 0,
  }
};
const DEFAULT_MODE = 'color';

function App() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [mode, setMode] = useState(DEFAULT_MODE);
  const [connected, setConnected] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <p>Bluetooth <code>Lightbulb</code></p>

        <div className="container">
          { connected &&
            <Color
              color={ color }
              onChangeColor={ setColor }
              mode={ mode }
              onChangeMode={ setMode }
            />
          }
        </div>

        <Lightbulb
          color={ color }
          mode={ mode }
          onConnect={ () => setConnected(true) }
        />
      </header>
    </div>
  );
}

export default App;
