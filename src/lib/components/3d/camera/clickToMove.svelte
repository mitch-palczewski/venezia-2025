<script lang="ts">
  import { CameraControls, type CameraControlsRef } from '@threlte/extras'
  let controls = $state<CameraControlsRef>()
  $effect.pre(() => {
    controls?.truck(1, 0, true)
  })
</script>
<CameraControls
  bind:ref={controls}
 
/>