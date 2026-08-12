import { onDestroy, onMount } from 'svelte';

export function useKeyHold(targetKey = 'KeyF') {
  let isPressed = false;

  const handleKey = (e: KeyboardEvent, isDown: boolean) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable)
    ) {
      return;
    }

    if (e.code === targetKey) {
      isPressed = isDown;
    }
  };

  const onKeyDown = (e: KeyboardEvent) => handleKey(e, true);
  const onKeyUp = (e: KeyboardEvent) => handleKey(e, false);
  const onBlur = () => {
    isPressed = false;
  };

  onMount(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', onBlur);
  });

  return () => isPressed;
}