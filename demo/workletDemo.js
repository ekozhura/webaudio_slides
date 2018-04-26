class EightBitProcessorNode extends AudioWorkletNode {
  constructor(context) {
    super(context, 'eightbitprocessor');
  }
}

let context = new AudioContext();

Nexus.context = context;
Nexus.colors.fill = "#000";
Nexus.colors.accent = "#2f9b2f";

context.audioWorklet.addModule('./processor.js').then(
() => {
  let gain = new GainNode(context);
  gain.gain.value = 0.5;

  let filterNode = new BiquadFilterNode(context);
  filterNode.type = "lowpass";
  filterNode.frequency.value = 3000;
  filterNode.Q.value = 0.001;
  let node = new EightBitProcessorNode(context);
  node.parameters.get('pitch').setValueAtTime(16, context.currentTime);
  node.parameters.get('speed').setValueAtTime(13, context.currentTime);

  let sequen = new Nexus.Multislider('#seq', {
    'numberOfSliders': 16,
    'min': 0,
    'max': 9,
    'step': 1,
    'columns': 16,
    'size': [400,250],
  });
  let pitchDial = new Nexus.Dial('#pitch_dial', {
    'min': 12,
    'max': 255
  });
  pitchDial.on('change', v => {
    node.parameters.get('pitch').setValueAtTime(Math.floor(v), context.currentTime);
  })
  var number = new Nexus.Number('#pitch_number')
  number.link(pitchDial);

  let speedDial = new Nexus.Dial('#speed_dial', {
    'min': 1,
    'max': 24
  });
  speedDial.on('change', v => {
    node.parameters.get('speed').setValueAtTime(v, context.currentTime);
  });
  var number2 = new Nexus.Number('#speed_number')
  number2.link(speedDial);

  let pattern = "3918272634326334";

  let arrPatt = pattern.split('').map(i => parseInt(i))
  sequen.setAllSliders(arrPatt);
  sequen.on('change', v => {
    arrPatt[v.index] = v.value;
    node.port.postMessage(arrPatt.join(''));
  });

  let dcRemove = new BiquadFilterNode(context);
  dcRemove.type = "highpass";
  dcRemove.frequency.value = 20;

  let bit = node.connect(dcRemove).connect(gain).connect(filterNode);
  bit.connect(Nexus.context.destination);

  setTimeout(() => {
    node.port.postMessage('3918272634326334');
    node.parameters.get('speed').setValueAtTime(13, context.currentTime);
    node.parameters.get('pitch').setValueAtTime(110, context.currentTime);
  }, 0);
}, e => {
  console.log(e);
});

