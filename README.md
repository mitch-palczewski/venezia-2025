


## Aspect-Ratio Responsive Design

We use a custom, prefix-free reactive layout system driven by Svelte 5 and Tailwind v4. This allows you to apply utility classes based on the screen's aspect ratio rather than just pixel widths.

### Basic Usage
Bind the `data-ratio` attribute to a parent wrapper, and use the fraction modifiers (`1/1:`, `16/9:`, etc.) just like standard Tailwind breakpoints:

```html
<div data-ratio={ratioClass} class="w-full 16/9:grid-cols-3 9/16:grid-cols-1 1/1:p-8">
  </div>