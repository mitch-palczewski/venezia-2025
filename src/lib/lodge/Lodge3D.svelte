<script lang="ts">
    import { T, useThrelte } from "@threlte/core";
    import type { Lodge } from "./Lodge.svelte";
	import { useFirstPersonControls } from "$lib/3d/core/controls/movement/firstPersonControls";
	import { moveCamera, useKeyboardMovement } from "$lib/3d/core/controls/keyboardMovement";
	import TestLodgeRoom from "./components/TestLodgeRoom.svelte";

    type Props = {
        lodge: Lodge;
    };
    let { lodge }: Props = $props();
	let {camera } = useThrelte()

	

	 useFirstPersonControls()
	 useKeyboardMovement(()=> 10, (step) => moveCamera(camera.current, step, lodge.bounds), {lockYMovement:true})

    
</script>

<T.PerspectiveCamera
    makeDefault
    position={[0, 3, 0.1]}
    fov={75}
>
</T.PerspectiveCamera>

<T.AmbientLight intensity={2} />
<T.PointLight position={[0, 8, 0]} intensity={13} distance={25} />



<TestLodgeRoom {lodge} height={10} width={20} depth={20}/>

