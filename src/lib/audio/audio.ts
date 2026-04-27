import { SOUND_EVENTS, type SoundEvent } from './manifest';

export const playSound = (event: SoundEvent, volume = 0.5) => {
  const audio = new Audio(SOUND_EVENTS[event]);
  audio.volume = volume;
  audio.play().catch(() => {
    console.warn(`Audio playback blocked for event: ${event}. User must interact first.`);
  });
};