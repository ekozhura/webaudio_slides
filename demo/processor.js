class EightBitProcessor extends AudioWorkletProcessor {

  static get parameterDescriptors() {
    return [
      {name: 'pitch', defaultValue: 64},
      {name: 'speed', defaultValue: 13}
    ];
  }

  constructor(context) {
    super(context);
    this.currentBlock = 1;
    this.t0 = 0;
    this.pattern = "3742479937421209";

    this.port.onmessage = (event) => {
      this.pattern = event.data;
    };
  }

  process(inputs, outputs, parameters) {
    let input = inputs[0];
    let output = outputs[0];
    let BUFFER_SIZE = output[0].length;

    let { pitch, speed } = parameters;

    for (let channel = 0; channel < output.length; ++channel) {
      let outputChannel = output[channel];
      for (let t = this.t0, i = 0; t < BUFFER_SIZE * (this.currentBlock + 1); i++, t++) {
        let sample = (this.func(t, pitch[0], speed[0]) & 0xff) * 256;
        if (sample < 0) sample = 0;
        if (sample > 65535) sample = 65535;
        let out = (sample / 65535) * 2 - 1;
        outputChannel[i] = out;
      }
    }

    this.currentBlock++;
    this.t0 = BUFFER_SIZE * this.currentBlock;

    return true;
  }

  func(t, x = 64, y = 13) {
    let speed = y;
    let measure = 8;
    let pitch = x;

    return ( (t * (this.pattern[( t >> speed ) % this.pattern.length]) ) / 8 & pitch);
  }
}

registerProcessor('eightbitprocessor', EightBitProcessor);
