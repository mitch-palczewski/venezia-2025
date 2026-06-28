# Aspect Ratio Responsive Layouts

This project uses custom Tailwind v4 variants to handle responsive layouts based on screen aspect ratios rather than traditional width-based breakpoints. 

The viewport state is initialized once at the root layout and becomes globally available across your entire application via Svelte context and automatic HTML root data attributes.

---

## 1. Global Initialization

To activate aspect ratio tracking, invoke `initViewportContext()` within your root layout file. This setup configures the window event listeners, handles automatic lifecycle cleanup, and synchronizes the active aspect ratio directly with the `<html>` document root element.

```svelte
<script lang="ts">
    import { initViewportContext } from '$lib/core/viewport/viewport.context';
    import '../app.css';

    // Initializes orchestration, global document binding, and cleanup automatically
    initViewportContext();

    let { children } = $props();
</script>

{@render children?.()}
```

## 2. Basic Usage (Tailwind Styling)

Because the viewport aspect ratio is automatically injected into the document root, you can apply custom aspect ratio utility variants onto any HTML element in any component with zero container boilerplate.

```svelte
<div class="r16-9:block r1-1:grid r9-16:hidden">
    Content adapted to the active aspect ratio.
</div>
```

## 3. Advanced Usage (Programmatic Context)

If a downstream component requires access to the underlying reactive coordinates, layout tiers, or raw string slugs for JavaScript/TypeScript logic, pull the active instance out of context using `getViewportContext()`.

```svelte
<script lang="ts">
    import { getViewportContext } from '$lib/core/viewport/viewport.context';

    // Retrieve the active, rune-backed Viewport instance
    const vp = getViewportContext();
</script>

<div class="p-4">
    <p>Current Dimensions: {vp.width}px x {vp.height}px</p>
    <p>Screen Orientation: {vp.orientation}</p>
    <p>Target Match Slug: {vp.ratioSlug}</p>
</div>
```

# Tailwind Configuration (app.css)

Every custom aspect ratio passed into your layout tracker must be explicitly registered as a variant in your global stylesheet so the Tailwind compilation engine can build the corresponding utilities:

```svelte
/*
 * ASPECT RATIO VARIANTS (Tailwind v4)
 * Maps runtime viewport states to responsive design system modifiers.
 * * Maintenance: Every custom aspect ratio passed to initViewportContext() 
 * must be explicitly registered here for Tailwind to compile its utilities.
 *
 * Example: class="r16-9:block r1-1:grid"
 */
@custom-variant r1-1 (:root[data-ratio="1-1"] &);
@custom-variant r4-3 (:root[data-ratio="4-3"] &);
@custom-variant r3-4 (:root[data-ratio="3-4"] &);
/*
@custom-variant r3-2 (:root[data-ratio="3-2"] &);
@custom-variant r2-3 (:root[data-ratio="2-3"] &);
*/
@custom-variant r9-16 (:root[data-ratio="9-16"] &);
@custom-variant r16-9 (:root[data-ratio="16-9"] &);
```