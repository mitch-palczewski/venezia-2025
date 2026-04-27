export const SOUND_EVENTS = {
  ON_ADD: '/audio/Add Object.wav',
  AMBIENT: '/audio/PilePilePile_Splash_Final.wav',
  HOVER1: '/audio/UI_Hover_01.wav',
  HOVER2: '/audio/UI_Hover_02.wav',
  LET_GO: '/audio/UI_Unassigned_01.wav'


} as const;

export type SoundEvent = keyof typeof SOUND_EVENTS;