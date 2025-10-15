<script lang="ts">
    import { T, useThrelte } from "@threlte/core";
    let cameraActive = $state(false)

</script>

<T.PerspectiveCamera
    position={[0,0,2]}
    fov={50}
    near={1}
    far={10}
>
</T.PerspectiveCamera>

