import { SOUND_EVENTS } from './manifest';

class AmbientManager {
  #audio: HTMLAudioElement | null = null;
  isPlaying = $state(false);
  volume = $state(0.5);

  init() {
    if (this.#audio) return;
    this.#audio = new Audio(SOUND_EVENTS.AMBIENT);
    this.#audio.loop = true;
    this.#audio.volume = this.volume;
  }

  setVolume(newVolume: number) {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    this.volume = clampedVolume;

    if (this.#audio) {
      this.#audio.volume = clampedVolume;
    }
  }

  play() {
    this.#audio?.play();
    this.isPlaying = true;
  }

  pause() {
    this.#audio?.pause();
    this.isPlaying = false;
  }
}

export const ambientManager = new AmbientManager();