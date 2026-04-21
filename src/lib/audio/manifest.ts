export const SOUND_EVENTS = {
  CLICK: '/sounds/ui-click.mp3',
  COLLISION: '/sounds/thud.wav',
  AMBIENT_WIND: '/sounds/ambient-wind.ogg'
} as const;

export type SoundEvent = keyof typeof SOUND_EVENTS;