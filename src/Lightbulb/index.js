import React from 'react';
import './index.css';
import Button from '@material-ui/core/Button';

const CANDLE_SERVICE_UUID = 0xFF02;
const CANDLE_COLOR_UUID = 0xFFFC;
const CANDLE_EFFECT_UUID = 0xFFFB;

class Lightbulb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      device: null,
      error: null,
      connected: false,
    };
  }

  async connect() {
    if (this.state.connected) {
      return;
    }

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
    this.props.onConnect();
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

  async setEffect(effect) {
    if (!this.state.connected) {
      return;
    }

    const device = this.state.device;
    const data = new Uint8Array(effect);
    const service = await device.gatt.getPrimaryService(CANDLE_SERVICE_UUID);
    const characteristic = await service.getCharacteristic(CANDLE_EFFECT_UUID);

    characteristic.writeValue(data);
  }

  async setCandleEffectColor(r, g, b) {
    await this.setEffect([0x00, r, g, b, 0x04, 0x00, 0x01, 0x00]);
  }

  async setFlashingEffect(r, g, b) {
    await this.setEffect([0x00, r, g, b, 0x00, 0x00, 0x1F, 0x00]);
  }

  async setPulseEffect(r, g, b) {
    await this.setEffect([0x00, r, g, b, 0x01, 0x00, 0x09, 0x00]);
  }

  async setRainbowEffect() {
    await this.setEffect([0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x00]);
  }

  async setRainbowFadeEffect() {
    await this.setEffect([0x01, 0x00, 0x00, 0x00, 0x03, 0x00, 0x26, 0x00]);
  }

  async readValue(characteristic) {
    const value = await characteristic.readValue();
    const decoder = new TextDecoder('utf-8');

    return decoder.decode(value);
  }

  async start() {
    if (!this.state.connected) {
      return;
    }
    const { color, mode } = this.props;
    const { r, g, b } = color.rgb;

    switch(mode) {
      case 'candle':
        this.setCandleEffectColor(r, g, b);
        break;
      case 'flash':
        this.setFlashingEffect(r, g, b);
        break;
      case 'pulse':
        this.setPulseEffect(r, g, b);
        break;
      case 'rainbow':
        this.setRainbowEffect();
        break;
      case 'rainbowFade':
        this.setRainbowFadeEffect();
        break;
      default:
        this.setColor(r, g, b);
    }
  }

  render() {
    this.start();

    return (
      // <p>ssss</p>
        <ConnectButton state={ this.state.connected } onConnect={ this.connect.bind(this) } />
    );
  }
}

const ConnectButton = ({ state, onConnect }) => {
  if (state) {
    return (
      <></>
    );
  }

  return (
    <Button className="margin-top" variant="contained" color="primary" onClick={ onConnect }>
      Conectar
    </Button>
  );
};

export default Lightbulb;
