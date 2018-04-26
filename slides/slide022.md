add envelopes:

```js
let pulseEnv = new EnvGenerator(atx, 0.3, 0.4, 1, 0.2);
let cutoffEnv = new EnvGenerator(atx, 0.3, 0.4, 800, 0.2);
pulseEnv.connect(gainNode.gain);
cutoffEnv.connect(lpFilter.frequency)
```
