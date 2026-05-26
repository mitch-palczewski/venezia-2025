import { SOUND_EVENTS, type SoundEvent } from './manifest';

export const audioSettings = $state({
	isMuted: false,
	ambientIsMuted: false,
	SFXIsMuted: false,
	masterVolume: 1
});

export const playSound = (event: SoundEvent, volume = 0.5) => {
	if (audioSettings.isMuted || audioSettings.SFXIsMuted) return;
	const audio = new Audio(SOUND_EVENTS[event]);
	audio.volume = volume * audioSettings.masterVolume;
	audio.play().catch(() => {
		console.warn(`Audio playback blocked for event: ${event}. User must interact first.`);
	});
};

/**
 * Plays the audio for when an object is added to the scene
 */
export const playAddObject = () => playSound('ON_ADD', 1);

/**
 * Plays audio for when an object gets duplicated
 */
export const playDuplicteObject = () => playSound('Misc1', 1);

/**
 * Plays audio when an object gets clicked for the first time to access transform controls.
 */
export const playModelClicked = () => playSound('HOVER2', 1);

/**
 * Plays audio when an object gets click for the second time to hide transform controls
 */
export const playModelUnclicked = () => playSound('HOVER1', 1);
