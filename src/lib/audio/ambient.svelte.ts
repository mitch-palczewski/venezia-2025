import { audioSettings } from './audio.svelte';
import { SOUND_EVENTS } from './manifest';

class AmbientManager {
  #audio: HTMLAudioElement | null = null;
  isPlaying = $state(false);
  volume = $state(0.5);

  init() {
    if (this.#audio) return;
    this.#audio = new Audio(SOUND_EVENTS.AMBIENT);
    this.#audio.loop = true;
    this.#audio.volume = audioSettings.ambientIsMuted ? 0 : this.volume;
  
  }

  setMute(isMuted: boolean) {
  if (this.#audio) {
    this.#audio.volume = isMuted ? 0 : this.volume;
  }
}

  setVolume(newVolume: number) {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    this.volume = clampedVolume;

    if (this.#audio && !audioSettings.isMuted) {
      this.#audio.volume = clampedVolume;
    }
  }

  play() {
    this.#audio?.play().catch(e => console.error("Playback failed", e));
    this.isPlaying = true;
  }

  pause() {
    this.#audio?.pause();
    this.isPlaying = false;
  }
}

export const ambientManager = new AmbientManager();