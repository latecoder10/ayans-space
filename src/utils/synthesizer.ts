// Pure Web Audio API Synthesizer for high-precision technical interface sound feedback

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientNoiseSource: AudioBufferSourceNode | null = null;
  private isAmbientRunning: boolean = false;
  private lastStepTime: number = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(enabled ? 0.04 : 0, this.ctx.currentTime, 0.2);
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  // Continuous procedural castle wind draft inspired by hogwarts-3d/src/audio.js
  public startAmbientWind() {
    if (!this.enabled || this.isAmbientRunning || typeof window === 'undefined') return;
    try {
      this.init();
      if (!this.ctx) return;

      const sampleRate = this.ctx.sampleRate;
      const bufferLength = sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferLength, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 340;
      bandpass.Q.value = 0.8;

      const gain = this.ctx.createGain();
      gain.gain.value = this.enabled ? 0.035 : 0;

      // Slow LFO for gentle atmospheric breathing / draft
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.015;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();

      noiseSource.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(this.ctx.destination);
      noiseSource.start();

      this.ambientGain = gain;
      this.ambientNoiseSource = noiseSource;
      this.isAmbientRunning = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Subtle metallic / electronic click
  public playClick(freq = 800) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Telemetry node transition chime
  public playNodePulse(frequency = 1200) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  // System warning / failover sound
  public playFailoverWarning() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(330, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  // Very subtle high-frequency tactile hover blip (throttled)
  private lastHoverTime = 0;
  public playHover() {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastHoverTime < 80) return; // Debounce fast hovers
    this.lastHoverTime = now;

    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch {
      // Ignore
    }
  }

  // Pneumatic / servo door slide sound
  private lastDoorSoundTime = 0;
  public playDoorSlide() {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastDoorSoundTime < 600) return;
    this.lastDoorSoundTime = now;

    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }

  // Atmospheric push-through room entry
  public playEnterRoom() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  // Reverse exit room transition
  public playExitRoom() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // Magical spell cast sound (harmonic shimmer)
  public playSpellCast() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.035;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, startTime);
        osc.frequency.exponentialRampToValueAtTime(f * 1.05, startTime + 0.2);

        gain.gain.setValueAtTime(0.02, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // Lumos radiant light spark
  public playLumos() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }

  // Alohomora unlocking sound
  public playAlohomora() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      // Heavy click
      this.playClick(320);

      // Followed by shimmering chime
      setTimeout(() => {
        this.playSpellCast();
      }, 50);
    } catch {
      // Ignore
    }
  }

  // Parchment rustle / slide
  public playParchment() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.04 * (1 - i / bufferSize);
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // Ignore
    }
  }

  // Heavy medieval iron gate creak & groan inspired by hogwarts-entra
  public playGateGroan() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      // Low resonant iron vibration
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(55, t);
      osc1.frequency.exponentialRampToValueAtTime(75, t + 1.2);
      osc1.frequency.exponentialRampToValueAtTime(45, t + 2.5);

      osc2.frequency.setValueAtTime(110, t);
      osc2.frequency.exponentialRampToValueAtTime(145, t + 1.0);
      osc2.frequency.exponentialRampToValueAtTime(90, t + 2.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, t);
      filter.frequency.exponentialRampToValueAtTime(450, t + 1.2);
      filter.frequency.exponentialRampToValueAtTime(180, t + 2.5);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.05, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.035, t + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 2.8);
      osc2.stop(t + 2.8);
    } catch {
      // Ignore
    }
  }

  // Stone floor corridor footsteps inspired by hogwarts-3d/src/audio.js
  public playStep(sprinting = false) {
    if (!this.enabled) return;
    const now = Date.now();
    const interval = sprinting ? 240 : 380;
    if (now - this.lastStepTime < interval) return;
    this.lastStepTime = now;

    try {
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 520 + Math.random() * 180;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(sprinting ? 0.045 : 0.028, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
    } catch {
      // Ignore
    }
  }

  // Expecto Patronum silver choir & harmonic chord inspired by hogwarts-3d
  public playExpectoPatronum() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C Major majestic silver chords
      chords.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, startTime + 1.2);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.028, startTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.4);
      });
    } catch {
      // Ignore
    }
  }

  // Wingardium Leviosa mystical floating hum
  public playLeviosa() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(640, t + 0.4);
      osc.frequency.exponentialRampToValueAtTime(480, t + 0.8);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.035, t + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.85);
    } catch {
      // Ignore
    }
  }

  // Incendio flame whoosh
  public playIncendio() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(380, t);
      filter.frequency.exponentialRampToValueAtTime(720, t + 0.18);
      filter.frequency.exponentialRampToValueAtTime(240, t + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.06, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();
