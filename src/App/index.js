import React, { useState } from 'react';
import './index.css';
import Color from '../Color';
import Lightbulb from '../Lightbulb';

function App() {
  const [color, setColor] = useState({
    rgb: {
      r: 255,
      g: 0,
      b: 0,
    }
  });
  const [mode, setMode] = useState('color');
  const [connected, setConnected] = useState(false);

  console.log(mode)

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
          onConnect={ setConnected.bind(null, true) }
        />
      </header>
    </div>
  );
}

export default App;
