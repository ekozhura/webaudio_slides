Make arpeggiator run faster  and pitch a little bit higher

so the sequence is perceived as a chord

```js
let seq = arp(osc.frequency, 0.02);
seq([freqs[0] * 2, freqs[3] * 2, freqs[2] * 2]);
```
