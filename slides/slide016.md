Envelope Generator: naive implementation

```js
class EnvGenerator {
  connect(param: AudioParam) {
    this.param = param;
  }
  trigger(min = 0, max = 1) {
    let now = this.context.currentTime;
    this.param.setValueAtTime(min, current);
    this.param.linearRampToValueAtTime(max, now + this.attack);
    this.param.linearRampToValueAtTime(this.sustain * max, now + this.attack + this.decay);
    this.param.linearRampToValueAtTime(min, now + this.attack + this.decay + this.release);
  }
}

```
