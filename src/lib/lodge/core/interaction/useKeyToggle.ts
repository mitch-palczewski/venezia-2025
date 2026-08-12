import { onDestroy, onMount } from 'svelte';

export function useKeyToggle(targetKey = 'KeyF', initialValue = false) {
  let isToggled = initialValue;

  const onKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable)
    ) {
      return;
    }

    if (e.code === targetKey && !e.repeat) {
      isToggled = !isToggled;
    }
  };

  onMount(() => {
    window.addEventListener('keydown', onKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', onKeyDown);
  });

  return () => isToggled;
}