class EnvGenerator {
  constructor(context, attack, decay, sustain, release) {
    this.context = context;

    this.attack = attack || 0.01; // sec
    this.decay = decay || 0.4; // sec
    this.sustain = sustain || 0.75; // level
    this.release = release || 0.01;
  }

  trigger(min = 0, max = 1) {
    let current = this.context.currentTime;
    this.param.setValueAtTime(min, current);
    this.param.linearRampToValueAtTime(max, current + this.attack);
    this.param.linearRampToValueAtTime(this.sustain, current + this.attack + this.decay);
    this.param.linearRampToValueAtTime(min, current + this.attack + this.decay + this.release);
  }
  connect(param) {
    this.param = param;
  }
}
