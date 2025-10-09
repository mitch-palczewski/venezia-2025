<script>
	import CanvasPortal from '$lib/components/3d-core/CanvasPortal.svelte';
	
    import { AsciiRenderer } from '@threlte/extras';
    import { T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
</script>

<CanvasPortal>
    <AsciiRenderer characters=" .:/|\%#"/>
    <T.PerspectiveCamera
    makeDefault
    position={[3,3,3]}> 
        <OrbitControls/>
    </T.PerspectiveCamera>
    
	<T.Mesh>
        <T.MeshNormalMaterial/>
        <T.TorusKnotGeometry/>
    </T.Mesh>
</CanvasPortal>
