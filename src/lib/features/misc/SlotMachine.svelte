<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // 1. Expose Props for Configuration
  export let images: string[] = [];
  export let credits = 100;
  export let cost = 10;
  export let jackpotReward = 100;
  export let matchTwoReward = 20;
  export let fullScreen = false; // Toggle between filling a parent container vs filling the window

  // Event Dispatcher to update parent application state
  const dispatch = createEventDispatcher<{
    spinStart: { cost: number };
    spinEnd: { outcome: 'jackpot' | 'match' | 'lose'; reward: number; reels: number[] };
  }>();

  // Internal Component State
  let reels = [0, 0, 0]; 
  let spinningReels = [false, false, false];
  let leverPulled = false;
  let displayMessage = 'READY TO SPIN';

  // Initialize reels safely once images are provided
  $: if (images.length > 0 && reels.every(v => v === 0)) {
    reels = [
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length),
      Math.floor(Math.random() * images.length)
    ];
  }

  $: isSpinning = spinningReels.some(r => r);
  $: canAfford = credits >= cost;

  function handleSpin() {
    if (isSpinning || !canAfford || images.length === 0) return;

    credits -= cost;
    leverPulled = true;
    displayMessage = 'SPINNING...';
    spinningReels = [true, true, true];

    // Fire event to notify parent app that a spin has initiated
    dispatch('spinStart', { cost });

    setTimeout(() => {
      leverPulled = false;
    }, 250);

    const stopDelays = [1200, 2000, 2800];

    stopDelays.forEach((delay, index) => {
      const cycleInterval = setInterval(() => {
        reels[index] = Math.floor(Math.random() * images.length);
      }, 70);

      setTimeout(() => {
        clearInterval(cycleInterval);
        reels[index] = Math.floor(Math.random() * images.length);
        spinningReels[index] = false;

        if (index === 2) {
          evaluateResults();
        }
      }, delay);
    });
  }

  function evaluateResults() {
    const [r1, r2, r3] = reels;
    let outcome: 'jackpot' | 'match' | 'lose' = 'lose';
    let reward = 0;

    if (r1 === r2 && r2 === r3) {
      outcome = 'jackpot';
      reward = jackpotReward;
      displayMessage = `🎉 JACKPOT! +${reward} 🎉`;
      credits += reward;
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
      outcome = 'match';
      reward = matchTwoReward;
      displayMessage = `✨ MATCH! +${reward} ✨`;
      credits += reward;
    } else {
      displayMessage = 'TRY AGAIN!';
    }

    // Fire event with results data payload for the parent app
    dispatch('spinEnd', { outcome, reward, reels: [...reels] });
  }
</script>

<div class="slot-container" class:full-screen={fullScreen}>
  {#if images.length === 0}
    <div class="fallback-error">No slot images provided to component.</div>
  {:else}
    <div class="machine-wrapper">
      
      <!-- MAIN CABINET -->
      <div class="cabinet">
        
        <!-- Marquee Display -->
        <div class="marquee">
          <h2>LUCKY SLOTS</h2>
          <div class="stats">
            <span>COST: {cost} CR</span>
            <span class="credits">CREDITS: {credits}</span>
          </div>
        </div>

        <!-- REEL VIEWPORT FRAME -->
        <div class="reels-window">
          {#each reels as imageIndex, i}
            <div class="reel-box">
              <div class="reel-content" class:blur={spinningReels[i]}>
                <img src={images[imageIndex]} alt="Slot Reel {i + 1}" />
              </div>
              <div class="glass-overlay"></div>
            </div>
          {/each}
        </div>

        <!-- Status Panel -->
        <div class="status-panel">
          <div class="status-text">{displayMessage}</div>
        </div>

        <!-- Spin Button Controls -->
        <button 
          class="spin-button" 
          on:click={handleSpin} 
          disabled={isSpinning || !canAfford}
        >
          {#if isSpinning}SPINNING...{:else if !canAfford}NO CREDITS{:else}SPIN{/if}
        </button>
        
      </div>

      <!-- MECHANICAL LEVER ASSEMBLY -->
      <div class="lever-assembly">
        <div class="lever-base"></div>
        <button 
          class="lever" 
          class:pulled={leverPulled} 
          on:click={handleSpin} 
          disabled={isSpinning || !canAfford}
          aria-label="Pull machine lever"
        >
          <div class="lever-knob"></div>
          <div class="lever-shaft"></div>
        </button>
      </div>

    </div>
  {/if}
</div>

<style>
  /* Base Container Sizing Mechanics */
  .slot-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #18181b;
    font-family: monospace;
    color: white;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* Modifies container constraints if the user requests absolute full window takeover */
  .slot-container.full-screen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    padding: 3vh;
    z-index: 50;
  }

  .machine-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: 90%; 
    padding-right: 12vh;
    box-sizing: border-box;
  }

  /* Structural Viewport Constraints */
  .cabinet {
    height: 100%;
    width: min(72vh, 85vw);
    background: linear-gradient(to bottom, #991b1b, #7f1d1d, #451a03);
    border: min(0.6vh, 6px) solid #eab308;
    border-radius: 4vh 4vh 1.5vh 1.5vh;
    padding: 3.5vh;
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 4px 20px rgba(255,255,255,0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .marquee {
    width: 100%;
    background: black;
    border: 2px solid #facc15;
    border-radius: 1vh;
    padding: 1.5vh;
    text-align: center;
    box-shadow: 0 0 15px rgba(234, 179, 8, 0.3);
    box-sizing: border-box;
  }

  .marquee h2 {
    margin: 0;
    font-size: calc(1.2rem + 1vh);
    font-weight: 900;
    letter-spacing: 0.1em;
    color: #facc15;
  }

  .stats {
    display: flex;
    justify-content: space-between;
    font-size: calc(0.6rem + 0.4vh);
    color: #a1a1aa;
    margin-top: 0.5vh;
  }

  .credits {
    color: #34d399;
    font-weight: bold;
  }

  .reels-window {
    width: 100%;
    flex: 1;
    min-height: 0;
    background: #09090b;
    border: min(0.5vh, 4px) solid #d97706;
    border-radius: 1.5vh;
    padding: 2vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2vh;
    margin: 2vh 0;
    box-shadow: inset 0 4px 14px rgba(0,0,0,0.9);
    box-sizing: border-box;
    align-items: center;
  }

  .reel-box {
    position: relative;
    background: white;
    height: 100%;
    max-width: 100%;
    aspect-ratio: 3 / 4;
    margin: 0 auto;
    border-radius: 1vh;
    border: 2px solid #3f3f46;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 1.5vh;
    box-shadow: inset 0 8px 16px rgba(0,0,0,0.4);
    box-sizing: border-box;
  }

  .reel-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 0.1s ease, transform 0.1s ease;
  }

  .reel-content.blur {
    filter: blur(5px);
    transform: scaleY(0.9);
  }

  .reel-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .glass-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 40%, rgba(0,0,0,0.3));
    pointer-events: none;
  }

  .status-panel {
    width: 100%;
    background: #18181b;
    border: 2px solid #3f3f46;
    border-radius: 1vh;
    padding: 1.5vh;
    text-align: center;
    box-sizing: border-box;
  }

  .status-text {
    font-size: calc(0.7rem + 0.5vh);
    font-weight: bold;
    color: #e4e4e7;
    letter-spacing: 0.05em;
  }

  .spin-button {
    width: 100%;
    background: linear-gradient(to bottom, #eab308, #ca8a04);
    border: 2px solid #fef08a;
    border-radius: 1vh;
    color: black;
    font-weight: 900;
    font-size: calc(1rem + 0.4vh);
    padding: 2vh;
    margin-top: 2vh;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    text-shadow: 0 1px 1px rgba(255,255,255,0.4);
    transition: transform 0.05s ease;
  }

  .spin-button:active:not(:disabled) {
    transform: scale(0.98);
  }

  .spin-button:disabled {
    background: #27272a;
    border-color: #3f3f46;
    color: #52525b;
    cursor: not-allowed;
    box-shadow: none;
    text-shadow: none;
  }

  .lever-assembly {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-4vh);
    display: flex;
    align-items: center;
  }

  .lever-base {
    width: 2vh;
    height: 8vh;
    background: linear-gradient(to bottom, #52525b, #27272a);
    border: 1px solid #71717a;
    border-radius: 0 0.5vh 0.5vh 0;
  }

  .lever {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-origin: bottom center;
    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .lever.pulled {
    transform: rotate(55deg) translateY(2vh) scaleY(0.85);
  }

  .lever-knob {
    width: 6vh;
    height: 6vh;
    background: linear-gradient(135deg, #ef4444, #b91c1c);
    border-radius: 50%;
    box-shadow: 0 6px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.4);
  }

  .lever-shaft {
    width: 1.5vh;
    height: 20vh;
    background: linear-gradient(to right, #a1a1aa, #f4f4f5, #71717a);
    margin-top: -1vh;
    border-radius: 0 0 0.5vh 0.5vh;
  }

  .fallback-error {
    color: #ef4444;
    font-weight: bold;
    border: 2px dashed #ef4444;
    padding: 20px;
    border-radius: 8px;
  }
</style>