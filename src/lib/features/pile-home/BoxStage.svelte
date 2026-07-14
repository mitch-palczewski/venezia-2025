<script lang="ts">
    interface Props {
        depth?: number;
        resolution?: number;
        backImg?: string;
        leftImg?: string;
        rightImg?: string;
        topImg?: string;
        bottomImg?: string;
    }

    let {
        depth = 3,
        resolution = 300,
        backImg = '',
        leftImg = '',
        rightImg = '',
        topImg = '',
        bottomImg = ''
    }: Props = $props();

    const getBgStyle = (url: string | undefined) => (url ? `background-image: url('${url}');` : '');

    // Calculate the physical depth of each slice (1/3 of the total bottom face resolution)
    let sliceDepth = $derived(resolution / 3);
</script>

<div
    class="relative -z-100 flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-800"
    style="perspective: {resolution * depth}px;"
>
    <!-- 3D Scene Wrapper -->
    <div class="relative h-full w-full" style="transform-style: preserve-3d;">
        
        <!-- BACK WALL -->
        <div
            class="absolute inset-0 bg-neutral-900 bg-cover bg-center bg-no-repeat"
            style="
                transform: translateZ(-{resolution}px);
                {getBgStyle(backImg)}
            "
        ></div>

        <!-- LEFT WALL -->
        <div
            class="bg-neutral-850 absolute top-0 left-0 h-full border-r border-neutral-700/50"
            style="
                width: {resolution}px; 
                transform-origin: left center; 
                transform: rotateY(90deg);
                {getBgStyle(leftImg)}
            "
        ></div>

        <!-- RIGHT WALL -->
        <div
            class="absolute top-0 right-0 h-full border-l border-neutral-700/50 bg-neutral-800"
            style="
                width: {resolution}px; 
                transform-origin: right center; 
                transform: rotateY(-90deg);
                {getBgStyle(rightImg)}
            "
        ></div>

        <!-- CEILING (TOP) -->
        <div
            class="absolute top-0 left-0 w-full border-b border-neutral-700/50 bg-neutral-950"
            style="
                height: {resolution}px; 
                transform-origin: center top; 
                transform: rotateX(-90deg);
                {getBgStyle(topImg)}
            "
        ></div>

        <!-- ========================================== -->
        <!-- SLICED FLOOR (BOTTOM) & OVERLAP ANCHORS      -->
        <!-- ========================================== -->
        
        <!-- 1. BACK SLICE (Furthest back: -resolution to -2/3 resolution) -->
        <div
            class="absolute bottom-0 left-0 w-full border-t border-neutral-700/50 bg-neutral-700"
            style="
                height: {sliceDepth}px; 
                transform-origin: center bottom; 
                transform: translateY(-{sliceDepth * 2}px) translateZ(-{sliceDepth * 2}px) rotateX(90deg);
                background-position: center top;
                background-size: 100% {resolution}px;
                {getBgStyle(bottomImg)}
            "
        ></div>

        <!-- Element slot 1: Sticks through between Back and Middle floor slices -->
        <div 
            class="absolute bottom-0 left-1/4 flex justify-center items-end pointer-events-none"
            style="
                transform: translateZ(-{sliceDepth * 2}px); 
                height: {sliceDepth}px;
                width: 150px;
            "
        >
            <!-- Your custom overlapping element here -->
            <div class="pointer-events-auto w-12 h-24 bg-red-500 rounded-t shadow-lg transform translate-y-6"></div>
        </div>


        <!-- 2. MIDDLE SLICE (Midground: -2/3 resolution to -1/3 resolution) -->
        <div
            class="absolute bottom-0 left-0 w-full border-t border-neutral-700/50 bg-neutral-700"
            style="
                height: {sliceDepth}px; 
                transform-origin: center bottom; 
                transform: translateY(-{sliceDepth}px) translateZ(-{sliceDepth}px) rotateX(90deg);
                background-position: center center;
                background-size: 100% {resolution}px;
                {getBgStyle(bottomImg)}
            "
        ></div>

        <!-- Element slot 2: Sticks through between Middle and Front floor slices -->
        <div 
            class="absolute bottom-0 left-1/2 flex justify-center items-end pointer-events-none"
            style="
                transform: translateZ(-{sliceDepth}px); 
                height: {sliceDepth}px;
                width: 150px;
            "
        >
            <!-- Your custom overlapping element here -->
            <div class="pointer-events-auto w-16 h-32 bg-blue-500 rounded-t shadow-lg transform translate-y-10"></div>
        </div>


        <!-- 3. FRONT SLICE (Closest to viewer: -1/3 resolution to 0) -->
        <div
            class="absolute bottom-0 left-0 w-full border-t border-neutral-700/50 bg-neutral-700"
            style="
                height: {sliceDepth}px; 
                transform-origin: center bottom; 
                transform: rotateX(90deg);
                background-position: center bottom;
                background-size: 100% {resolution}px;
                {getBgStyle(bottomImg)}
            "
        ></div>

        <!-- Element slot 3: Sticks through at the very front of the scene -->
        <div 
            class="absolute bottom-0 left-3/4 flex justify-center items-end pointer-events-none"
            style="
                transform: translateZ(0px); 
                height: {sliceDepth}px;
                width: 150px;
            "
        >
            <!-- Your custom overlapping element here -->
            <div class="pointer-events-auto w-20 h-40 bg-emerald-500 rounded-t shadow-lg transform translate-y-16"></div>
        </div>

    </div>
</div>