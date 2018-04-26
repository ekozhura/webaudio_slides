### PATCH 1: BASIC "ANALOG" KICK DRUM

808 style: sin osc at a low freq and with an envelope with fast attack and decay

```js
let atx = new AudioContext();
let osci = new OscillatorNode(atx);
let gainNode = new GainNode(atx);

let volumeEnvelope = new EnvGenerator(atx, 0.01, 0.1, 0.2, 0.35);
volumeEnvelope.connect(gainNode.gain);

osci.frequency.setValueAtTime(80, atx.currentTime);
osci.connect(gainNode).connect(atx.destination);

osci.start();
volumeEnvelope.trigger();

```
