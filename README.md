# 3D Pile Networked



```
venezia-2025
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ eslint.config.js
├─ Optimize_02.svelte
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ src
│  ├─ app.css
│  ├─ app.d.ts
│  ├─ app.html
│  ├─ lib
│  │  ├─ 3d
│  │  ├─ api    # Genaric database input output and networking
│  │  ├─ assets # Contains assets that are dynamically loaded 
│  │  ├─ components
│  │  │  ├─ 3d-canvas   # Scripts to set up threlte canvas
│  │  │  ├─ layouts     # Non-3D elements for website
│  │  │  ├─ lights      
│  │  ├─ constants.ts
│  │  └─ pile   # Contains scripts specific to the pile 
│  │     ├─ components
│  │     │  ├─ camera
│  │     │  │  ├─ CameraController.svelte
│  │     │  │  ├─ idleManager.svelte.ts
│  │     │  │  └─ movement.ts
│  │     │  ├─ imageTemplate.svelte 
│  │     │  ├─ modelTemplate.svelte # Script that sets up a model (important)
│  │     │  └─ UI
│  │     │     ├─ add-menu
│  │     │     │  ├─ AddMenu.svelte
│  │     │     │  └─ ElementBtn.svelte
│  │     │     ├─ AddNewModel.svelte
│  │     │     ├─ btns
│  │     │     │  ├─ AddBtn.svelte
│  │     │     │  ├─ DeleteBtn.svelte
│  │     │     │  ├─ FullscreenBtn.svelte
│  │     │     │  ├─ GeneralButton.svelte
│  │     │     │  ├─ ScreenshotBtn.svelte
│  │     │     │  ├─ SettingsBtn.svelte
│  │     │     │  └─ TransformModeBtn.svelte
│  │     │     ├─ ChooseEnvironment.svelte
│  │     │     ├─ pileUI.svelte
│  │     │     ├─ ScaleSlider.svelte
│  │     │     ├─ settings-menu
│  │     │     │  ├─ Controls.svelte
│  │     │     │  ├─ Menu.svelte
│  │     │     │  └─ Settings.svelte
│  │     │     ├─ SettingsKeyBind.svelte
│  │     │     └─ Tooltip.svelte
│  │     ├─ index.ts
│  │     ├─ pile.svelte
│  │     ├─ types.ts
│  │     └─ util
│  │        ├─ animator.svelte.ts
│  │        ├─ api
│  │        │  ├─ pileDatabase.ts
│  │        │  ├─ pileMapper.ts
│  │        │  └─ screenshotApi.ts
│  │        ├─ assetInventory
│  │        │  ├─ abstractAssetMap.ts
│  │        │  ├─ assetsMap.ts
│  │        │  ├─ environmentMap.ts
│  │        │  ├─ object2DMap.ts
│  │        │  └─ object3DMap.ts
│  │        ├─ pileApp.svelte.ts
│  │        ├─ pileEnvironment.svelte.ts
│  │        ├─ pileObject.svelte.ts
│  │        ├─ pileState.svelte.ts
│  │        └─ ui
│  │           ├─ settingsState.svelte.ts
│  │           └─ uiActions.ts
│  └─ routes
│     ├─ +layout.svelte
│     ├─ +page.server.ts
│     ├─ +page.svelte
│     ├─ 3d
│     │  ├─ +layout.svelte # sets up 3d canvas for children pages (important)
│     │  └─ pile
│     │     ├─ +page.server.ts
│     │     ├─ +page.svelte
│     │     └─ +page.ts
│     ├─ api
│     │  └─ upload-screenshot
│     │     └─ +server.ts
│     ├─ gallery
│     │  ├─ +page.server.ts
│     │  ├─ +page.svelte
│     │  ├─ film
│     │  │  └─ +page.svelte
│     │  ├─ pile-3d-gallery
│     │  │  ├─ +page.server.ts
│     │  │  └─ +page.svelte
│     │  └─ prints
│     │     └─ +page.svelte
│     └─ sitemap.xml
│        └─ +server.ts
├─ static
│  ├─ environment
│  │  ├─ citrus_orchard_road.hdr
│  │  ├─ ...
│  ├─ favicon.ico
│  ├─ gifs
│  │  ├─ Ibix_01_preview2.gif
│  │  ├─ ...
│  ├─ images
│  │  └─ prints
│  │     ├─ 1_LOD2.avif
│  │     ├─ ...
│  ├─ media
│  │  ├─ city-pile_sc.png
│  │  ├─ ...
│  └─ robots.txt
├─ svelte.config.js
├─ tsconfig.json
├─ vercel.json
└─ vite.config.ts

```