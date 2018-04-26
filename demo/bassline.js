let atx = new AudioContext();

let pulse1 = new OscillatorNode(atx);
let pulse2 = new OscillatorNode(atx);

let now = atx.currentTime;
pulse1.type = "square";
pulse2.type = "sawtooth";

let gainNode = new GainNode(atx);

let lpFilter = new BiquadFilterNode(atx);
lpFilter.type = "lowpass";
lpFilter.frequency.setValueAtTime(400, now);
lpFilter.Q.setValueAtTime(10, now);

let pulseEnv = new EnvGenerator(atx, 0.3, 0.4, 1, 0.2);
let cutoffEnv = new EnvGenerator(atx, 0.3, 0.4, 800, 0.2);
pulseEnv.connect(gainNode.gain);
cutoffEnv.connect(lpFilter.frequency)

gainNode.connect(lpFilter).connect(atx.destination);

gainNode.gain.setValueAtTime(0.1, now);

pulse1.connect(gainNode);
pulse2.connect(gainNode);

let freqs = [138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00]

let idx = 0;
let seq = [ freqs[0], freqs[3], freqs[2], freqs[7], freqs[2] ];

let interval = new Nexus.Interval(500, function() {
  if (idx >= seq.length) {
    idx = 0;
  }
  let note = seq[idx];
  idx = idx + 1;
  pulseEnv.trigger(0.01, 0.2);
  cutoffEnv.trigger(100, 1800);
  pulse1.frequency.setValueAtTime(note / 2, now);
  pulse2.frequency.setValueAtTime(note / 2, now);
});


let btn = document.getElementById("play");
btn.addEventListener("click", function() {
  interval.start();
  pulse1.start();
  pulse2.start();
});
