// Recorded samples and synthesized arrival sounds share one audio context.
// Unlock this context inside a tap handler, especially on iOS Safari.
export class StoryAudio {
  constructor(onChange) {
    this.onChange = onChange;
    this.context = null;
    this.buffers = new Map();
    this.loading = null;
    this.source = null;
    this.timers = [];
    this.effects = [];
    this.stopId = null;
    this.offset = 0;
    this.startedAt = 0;
    this.playing = false;
    this.muted = false;
    this.generation = 0;
    this.pending = false;
  }

  unlock() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio)
      return Promise.reject(
        new Error('Audio is unavailable in this browser. You can still read each story.')
      );
    if (!this.context) {
      this.context = new Audio();
      this.gain = this.context.createGain();
      this.gain.connect(this.context.destination);
      this.gain.gain.value = this.muted ? 0 : 0.85;
      this.context.addEventListener('statechange', () => {
        if (this.context.state !== 'running' && (this.playing || this.pending)) this.pause();
      });
    }
    const empty = this.context.createBufferSource();
    empty.buffer = this.context.createBuffer(1, 1, 22050);
    empty.connect(this.gain);
    empty.start();
    let timer;
    return Promise.race([
      this.context.resume(),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error('Sound could not start. Tap play to try again.')),
          8000
        );
      }),
    ]).finally(() => clearTimeout(timer));
  }

  async prepare(stops) {
    if (!this.context) throw new Error('Tap Start exploring to enable audio.');
    if (!this.loading) {
      this.loading = Promise.all(
        stops.map(async (stop) => {
          if (this.buffers.has(stop.id)) return;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000);
          try {
            const response = await fetch(stop.audio, { signal: controller.signal });
            if (!response.ok) throw new Error('Audio request failed');
            const buffer = await this.context.decodeAudioData(await response.arrayBuffer());
            this.buffers.set(stop.id, buffer);
          } catch {
            throw new Error(
              'Story audio could not load. Check your connection and tap play to retry.'
            );
          } finally {
            clearTimeout(timeout);
          }
        })
      ).catch((error) => {
        this.loading = null;
        throw error;
      });
    }
    return this.loading;
  }

  get duration() {
    return this.buffers.get(this.stopId)?.duration || 0;
  }
  get elapsed() {
    return this.playing
      ? Math.min(this.duration, this.offset + this.context.currentTime - this.startedAt)
      : this.offset;
  }

  pause() {
    if (this.playing) this.offset = this.elapsed;
    this.playing = false;
    this.pending = false;
    this.generation++;
    if (this.source) {
      this.source.onended = null;
      try {
        this.source.stop();
      } catch {}
      this.source.disconnect();
      this.source = null;
    }
    this.timers.forEach(clearTimeout);
    this.timers = [];
    for (const effect of this.effects) {
      try {
        effect.stop();
      } catch {}
    }
    this.effects = [];
    this.onChange();
  }

  stop() {
    this.pause();
    this.offset = 0;
    this.onChange();
  }

  async suspend() {
    this.pause();
    if (this.context?.state === 'running') await this.context.suspend();
  }

  setMuted(value) {
    this.muted = value;
    if (this.gain) this.gain.gain.value = value ? 0 : 0.85;
    this.onChange();
  }

  async play(stop, arrival = false) {
    this.pause();
    if (this.stopId !== stop.id || this.offset >= this.duration - 0.1) this.offset = 0;
    this.stopId = stop.id;
    if (!this.buffers.has(stop.id))
      throw new Error('Story audio is still loading. Tap play in a moment.');
    if (document.hidden || this.context.state !== 'running')
      throw new Error('Tap play to enable sound again.');
    const token = this.generation;
    const start = () => {
      if (token !== this.generation || document.hidden || this.context.state !== 'running') return;
      this.pending = false;
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffers.get(stop.id);
      this.source.connect(this.gain);
      this.startedAt = this.context.currentTime;
      this.playing = true;
      this.source.onended = () => {
        if (token !== this.generation) return;
        this.playing = false;
        this.offset = this.duration;
        this.source = null;
        this.onChange();
      };
      this.source.start(0, this.offset);
      this.onChange();
    };
    if (arrival && this.offset === 0) {
      this.pending = true;
      this.arrival(stop.ambience);
      this.timers.push(setTimeout(start, 1600));
      this.onChange();
    } else start();
  }

  arrival(kind) {
    const now = this.context.currentTime;
    const notes = kind === 'rally' ? [220, 330, 250] : [523.25, 659.25, 783.99];
    notes.forEach((frequency, index) => {
      const osc = this.context.createOscillator();
      const envelope = this.context.createGain();
      const start = now + index * 0.35;
      const duration = kind === 'rally' ? 0.15 : 0.6;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, start);
      if (kind === 'rally') osc.frequency.exponentialRampToValueAtTime(80, start + duration);
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(0.17, start + 0.015);
      envelope.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(envelope);
      envelope.connect(this.gain);
      osc.start(start);
      osc.stop(start + duration + 0.05);
      this.effects.push(osc);
      osc.onended = () => {
        osc.disconnect();
        envelope.disconnect();
      };
    });
  }
}
