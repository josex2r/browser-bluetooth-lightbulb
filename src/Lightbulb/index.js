import React from 'react';
import './index.css';
import Button from '@material-ui/core/Button';

const CANDLE_SERVICE_UUID = 0xFF02;
const CANDLE_COLOR_UUID = 0xfffc;

class Lightbulb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      device: null,
      error: null,
      connected: false,
    };
  }

  get isConnected() {
    return this.device && this.device.gatt.connected;
  }

  async connect() {
    if (this.isConnected) {
      return;
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{
          name: 'PLAYBULB'
        }, {
          services: [CANDLE_SERVICE_UUID]
        }],
        optionalServices: ['battery_service']
      });

      this.setState({ device });

      await device.gatt.connect();

      this.setState({ connected: true });
    } catch (error) {
      console.error(error)
      this.setState({ error });
    }
  }

  async setColor(r, g, b) {
    if (!this.state.connected) {
      return;
    }

    const device = this.state.device;
    const data = new Uint8Array([0x00, r, g, b]);
    const service = await device.gatt.getPrimaryService(CANDLE_SERVICE_UUID);
    const characteristic = await service.getCharacteristic(CANDLE_COLOR_UUID);

    characteristic.writeValue(data);
  }

  async readValue(characteristic) {
    const value = await characteristic.readValue();
    const decoder = new TextDecoder('utf-8');

    return decoder.decode(value);
  }

  render() {
    const color = this.props.color;

    if (typeof color === 'object' && this.state.connected) {
      const { r, g, b } = color.rgb;

      this.setColor(r, g, b);
    }

    return (
      // <p>ssss</p>
        <ConnectButton state={ this.state.connected } onConnect={ this.connect.bind(this) } />
    );
  }
}

const ConnectButton = ({ state, onConnect }) => {
  if (state) {
    return (
      <p>{ 'Conectado!' }</p>
    );
  }

  return (
    <Button className="margin-top" variant="contained" color="primary" onClick={ onConnect }>
      Conectar
    </Button>
  );
};

export default Lightbulb;
