let atx = new AudioContext();

let baseFreq = 80;

let osci = new OscillatorNode(atx);
let gainNode = new GainNode(atx);

osci.connect(gainNode).connect(atx.destination);

let volumeEnvelope = new EnvGenerator(atx, 0.01, 0.1, 0.2, 0.35);
let pitchEnvelope = new EnvGenerator(atx, 0.001, 0.001, baseFreq);

volumeEnvelope.connect(gainNode.gain);
pitchEnvelope.connect(osci.frequency);

let interval = new Nexus.Interval(400, function() {
  volumeEnvelope.trigger();
  pitchEnvelope.trigger(baseFreq, 10000);
});


let btn = document.getElementById("play");
btn.addEventListener("click", function() {
  interval.start();
  osci.frequency.setValueAtTime(baseFreq, atx.currentTime);
  osci.start();
});
