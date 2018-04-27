let atx = new AudioContext();
let osc = new OscillatorNode(atx);
osc.type = "square";

let freqs = [138.59, 155.56, 164.81, 207.65]; // [ C#, D#, E, G#];

function arp(param, interval) {
  return function([first, second, third]) {
    param.setValueAtTime(first, atx.currentTime + interval * 1);
    param.setValueAtTime(second, atx.currentTime + interval * 2);
    param.setValueAtTime(third, atx.currentTime + interval * 3);
  }
}

// let ivl = 0.025;
let ivl = 0.25;
let seq = arp(osc.frequency, ivl);

let interval = new Nexus.Interval(ivl * 1000, function() {
  seq([freqs[0], freqs[3], freqs[2]]);
  // seq([freqs[0] * 2, freqs[3] * 2, freqs[2] * 2]);
});

let interval2 = new Nexus.Interval(500, function() {
  freqs = freqs.sort(function(a, b){return 0.5 - Math.random()});
});

osc.connect(atx.destination);

osc.start();
interval.start();
interval2.start();
