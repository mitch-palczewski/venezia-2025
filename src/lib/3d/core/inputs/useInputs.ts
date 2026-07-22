import { getContext, setContext } from "svelte";
import { useKeyboardInput } from "./keyboardInputs.svelte";
import { usePointerInput } from "./mouseInputs.svelte";


const INPUT_CONTEXT_KEY = Symbol('INPUT_CONTEXT');

/**
 * Centralized manager providing reactive access to pointer and keyboard input states.
 * Instantiated by `initInputs()` and accessed throughout the application via `useInput()`.
 *
 * @property {PointerState} pointer - Reactive pointer state for mouse/touch inputs and consumption flags.
 * @property {KeyState} keys - Reactive keyboard state tracking active key presses.
 */
export class InputManager {
    pointer = usePointerInput()
    keys = useKeyboardInput()
}

/**
 * Initializes the global `InputManager` context for the active component subtree.
 * Call this once in the `<script>` setup phase of your root scene or page wrapper.
 * 
 * @returns {InputManager} The newly instantiated `InputManager`.
 */
export function initInputs() {
    const manager = new InputManager();
    setContext(INPUT_CONTEXT_KEY, manager);
    return manager;
}

/**
 * Retrieves the global `InputManager` instance from Svelte context.
 * Provides reactive access to active `pointer` and `keys` input states.
 * 
 * @returns {InputManager} The active `InputManager` instance containing `pointer` and `keys`.
 * @throws {Error} If invoked outside of a component tree initialized by `initInputs()`.
 * 
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { useInput } from '$lib/inputs/useInput.svelte';
 * 
 *   const input = useInput();
 * 
 *   function handleClick() {
 *     input.pointer.isConsumed = true;
 *   }
 * </script>
 * ```
 */
export function useInput(): InputManager {
    const manager = getContext<InputManager>(INPUT_CONTEXT_KEY);
    if (!manager) {
        throw new Error('useInput() must be called inside a component hierarchy initialized with initInputs().');
    }
    return manager;
}