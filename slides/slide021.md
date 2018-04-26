basic patch:

```js
let atx = new AudioContext();

let pulse1 = new OscillatorNode(atx);
let pulse2 = new OscillatorNode(atx);
pulse1.type = "square";
pulse2.type = "sawtooth";

let lpFilter = new BiquadFilterNode(atx);
lpFilter.type = "lowpass";
lpFilter.frequency.setValueAtTime(400, atx.currentTime);

pulse1.connect(gainNode);
pulse2.connect(gainNode);

gainNode.connect(lpFilter).connect(atx.destination);
```
