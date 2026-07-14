<script lang="ts">
	import SlotMachine from "$lib/features/misc/SlotMachine.svelte";


  // Dynamic image assets path array passed directly down to the child component
  const myAppImages = [
    '/images/prints/1_LOD2.avif',
    '/images/prints/2_LOD2.avif',
    '/images/prints/3_LOD2.avif',
    '/images/prints/4_LOD2.avif'
  ];

  // Ambient placeholder paths for the Italian casino atmosphere
  // Swap these out with architectural textures, drapes, or canal views as needed
  const leftBannerImage = '/media/city-pile_sc.png';
  const rightBannerImage = '/media/pilemaker_sc.png';

  // Track global state out in the main app layout
  let globalUserCredits = 250;

  function onSpinStarted(event: CustomEvent<{ cost: number }>) {
    console.log(`User initiated spin. Cost deducted: ${event.detail.cost}`);
  }

  function onSpinEnded(event: CustomEvent<{ outcome: string; reward: number; reels: number[] }>) {
    const { outcome, reward, reels } = event.detail;
    console.log(`Spin completed! Outcome: ${outcome}. Gained: ${reward}.`, reels);
  }
</script>

<!-- Venetian Palace UI Layout Shell -->
<main class="casino-layout">
  
  <!-- Regal Venetian Header -->
  <header class="casino-header">
    <div class="header-emblem">
      <span class="establishment-date">FONDATO NEL 1638</span>
      <h1>Casinò di Venezia</h1>
      <span class="room-title">SALA REGIA</span>
    </div>
    
    <div class="cassa-pill">
      <span class="label">CASSA:</span>
      <span class="amount">{globalUserCredits} <span>Bitcoin</span></span>
    </div>
  </header>

  <!-- Grand Gaming Floor -->
  <div class="gaming-floor">
    
    <!-- Left Ambient Banner (e.g., Brocade Tapestry or Venetian Arch Window) -->
    <aside class="ambient-banner left-side">
      <div class="banner-overlay"></div>
      <img src={leftBannerImage} alt="Venetian Ambiance Left" class="fallback-pattern" />
      <div class="banner-frame"></div>
    </aside>

    <!-- Center Stage: The Slot Alcove -->
    <div class="game-viewport">
      <div class="alcove-shadow"></div>
      
      <SlotMachine 
        images={myAppImages}
        bind:credits={globalUserCredits}
        cost={10}
        jackpotReward={150}
        matchTwoReward={30}
        fullScreen={false}
        on:spinStart={onSpinStarted}
        on:spinEnd={onSpinEnded}
      />
    </div>

    <!-- Right Ambient Banner -->
    <aside class="ambient-banner right-side">
      <div class="banner-overlay"></div>
      <img src={rightBannerImage} alt="Venetian Ambiance Right" class="fallback-pattern" />
      <div class="banner-frame"></div>
    </aside>

  </div>
  
  <!-- Decorative Footer Trim -->
  <footer class="casino-footer">
    <p>Riservato ai Maggiori di Età — Il giuoco può causare dipendenza patologica.</p>
  </footer>
</main>

<style>
  /* Global Layout Foundations - Shifting from Arcade to Luxury Palace */
  .casino-layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: radial-gradient(circle at center, #2d0408 0%, #0d0102 100%);
    overflow: hidden;
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    color: #f3e5ab; /* Soft gold linen color */
  }

  /* Luxury Gold & Crimson Header */
  .casino-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5vh 4vw;
    background: linear-gradient(to bottom, #1a0204 0%, #0a0001 100%);
    border-bottom: 3px double #d4af37; /* Classic Venetian Gold Accent */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }

  .header-emblem {
    text-align: left;
  }

  .establishment-date {
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    color: #aa7c11;
    display: block;
    font-weight: bold;
  }

  .casino-header h1 {
    margin: 2px 0;
    font-size: calc(1.4rem + 0.6vh);
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: transparent;
    background: linear-gradient(to bottom, #fff3cc 0%, #d4af37 50%, #aa7c11 100%);
    -webkit-background-clip: text;
    background-clip: text;
    filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
  }

  .room-title {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    color: #e6c687;
    font-family: sans-serif;
  }

  /* Elegant Cash Counter (Cassa) */
  .cassa-pill {
    background: linear-gradient(135deg, #2a0307 0%, #150103 100%);
    border: 1px solid #d4af37;
    padding: 1vh 2vw;
    border-radius: 4px;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.8), 0 2px 8px rgba(212,175,55,0.2);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cassa-pill .label {
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    color: #aa7c11;
  }

  .cassa-pill .amount {
    font-size: calc(1.1rem + 0.5vh);
    color: #ffffff;
    font-weight: bold;
    text-shadow: 0 0 8px rgba(255,255,255,0.3);
  }

  .cassa-pill .amount span {
    font-size: 0.75rem;
    color: #d4af37;
    margin-left: 2px;
  }

  /* Three-Column Theater Presentation Layer */
  .gaming-floor {
    flex: 1;
    display: flex;
    position: relative;
    min-height: 0;
  }

  /* Ambient Side Elements (The Banners) */
  .ambient-banner {
    width: 18vw;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #120103;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: width 0.3s ease;
  }

  .left-side {
    border-right: 2px solid #8a6421;
  }

  .right-side {
    border-left: 2px solid #8a6421;
  }

  /* Shading overlays to integrate temp images beautifully without high contrast */
  .banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(13,1,2,0.4) 0%, transparent 50%, rgba(13,1,2,0.8) 100%),
                radial-gradient(circle at center, transparent 30%, #0d0102 110%);
    z-index: 2;
    pointer-events: none;
  }

  /* Gracefully contains user ambient images or acts as a damask wall canvas alternative */
  .fallback-pattern {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.25; /* Low opacity keeps focus entirely on the central gameplay */
    filter: sepia(0.5) hue-rotate(-35deg) brightness(0.6);
  }

  /* Classical gold filigree frame mockup lines */
  .banner-frame {
    position: absolute;
    inset: 12px;
    border: 1px solid rgba(212, 175, 55, 0.15);
    pointer-events: none;
    z-index: 3;
  }

  /* Central Alcove */
  .game-viewport {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3vh 2vw;
    box-sizing: border-box;
    position: relative;
    background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%);
  }

  /* Deep shadow backing behind the machine to simulate a recessed wall frame */
  .alcove-shadow {
    position: absolute;
    width: 80%;
    height: 90%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50% / 10%;
    filter: blur(40px);
    pointer-events: none;
    z-index: 0;
  }

  /* Responsible Responsible Advisory Footer */
  .casino-footer {
    background-color: #050000;
    border-top: 1px solid #2a0307;
    padding: 0.8vh;
    text-align: center;
    z-index: 10;
  }

  .casino-footer p {
    margin: 0;
    font-family: sans-serif;
    font-size: 0.65rem;
    color: #5c4346;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Responsive Scaling Behavior adjustments for smaller screens */
  @media (max-width: 1024px) {
    .ambient-banner {
      width: 10vw; /* Compress banners slightly to preserve cabinet footprint on narrower views */
    }
  }
</style>