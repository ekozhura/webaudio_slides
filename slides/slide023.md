### Poor man's chiptune

Square/pulse wave is enough, and the arpeggiator does the trick:

```js
let atx = new AudioContext();
let osc = new OscillatorNode(atx);
osc.type = "square";

let arp = (param, interval) => ([first, second, third]) => {
    param.setValueAtTime(first, atx.currentTime + interval * 1);
    param.setValueAtTime(second, atx.currentTime + interval * 2);
    param.setValueAtTime(third, atx.currentTime + interval * 3);
  }
}

let freqs = [138.59, 155.56, 164.81, 207.65]; // [ C#, D#, E, G#];

let seq = arp(osc.frequency, 0.25);
seq([freqs[0], freqs[3], freqs[2]]);

```
