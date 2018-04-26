### Make it punchy

```js
let pitchEnvelope = new EnvGenerator(atx, 0.001, 0.001, 80);
pitchEnvelope.connect(osci.frequency);

pitchEnvelope.trigger(80, 10000);

```
