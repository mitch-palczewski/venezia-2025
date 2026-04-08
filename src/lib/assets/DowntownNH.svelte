<script lang="ts">
/* eslint-disable svelte/require-store-reactive-access */

  import type * as THREE from 'three'

  import type { Snippet } from 'svelte'
  import { T, type Props } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  let {
    fallback,
    error,
    children,
    ref = $bindable(),
    ...props
  }: Props<THREE.Group> & {
    ref?: THREE.Group
    children?: Snippet<[{ ref: THREE.Group }]>
    fallback?: Snippet
    error?: Snippet<[{ error: Error }]>
  } = $props()

  type GLTFResult = {
    nodes: {
      MAP01: THREE.Mesh
      MAP01_1: THREE.Mesh
      MAP01_2: THREE.Mesh
      MAP01_3: THREE.Mesh
      MAP01_4: THREE.Mesh
      MAP01_5: THREE.Mesh
      MAP01_6: THREE.Mesh
      MAP01_7: THREE.Mesh
      MAP01_8: THREE.Mesh
      MAP01_9: THREE.Mesh
      MAP01_10: THREE.Mesh
      MAP01_11: THREE.Mesh
      MAP01_12: THREE.Mesh
      MAP01_13: THREE.Mesh
      MAP01_14: THREE.Mesh
      MAP01_15: THREE.Mesh
      MAP01_16: THREE.Mesh
      MAP01_17: THREE.Mesh
      MAP01_18: THREE.Mesh
      MAP01_19: THREE.Mesh
      MAP01_20: THREE.Mesh
      Road03: THREE.Mesh
      MAP01_21: THREE.Mesh
      MAP01_22: THREE.Mesh
      road_01: THREE.Mesh
      MAP01_23: THREE.Mesh
      MAP01_24: THREE.Mesh
      MAP01_25: THREE.Mesh
      MAP01_26: THREE.Mesh
      MAP01_27: THREE.Mesh
      MAP01_28: THREE.Mesh
      MAP01_29: THREE.Mesh
      MAP01_30: THREE.Mesh
      MAP01_31: THREE.Mesh
      MAP01_32: THREE.Mesh
      MAP01_33: THREE.Mesh
      MAP01_34: THREE.Mesh
      MAP01_35: THREE.Mesh
      MAP01_36: THREE.Mesh
      MAP01_37: THREE.Mesh
      MAP01_38: THREE.Mesh
      MAP01_39: THREE.Mesh
      MAP01_40: THREE.Mesh
      MAP01_41: THREE.Mesh
      MAP01_42: THREE.Mesh
      MAP01_43: THREE.Mesh
      MAP01_44: THREE.Mesh
      MAP01_45: THREE.Mesh
      MAP01_46: THREE.Mesh
      MAP01_47: THREE.Mesh
      MAP01_48: THREE.Mesh
      Road_02: THREE.Mesh
      MAP01_49: THREE.Mesh
      MAP01_132: THREE.Mesh
      MAP01_133: THREE.Mesh
      MAP01_134: THREE.Mesh
      MAP01_135: THREE.Mesh
      MAP01_136: THREE.Mesh
      MAP01_137: THREE.Mesh
      MAP01_138: THREE.Mesh
      MAP01_139: THREE.Mesh
      MAP01_140: THREE.Mesh
      MAP01_141: THREE.Mesh
      MAP01_142: THREE.Mesh
      MAP01_143: THREE.Mesh
      MAP01_144: THREE.Mesh
      MAP01_145: THREE.Mesh
      MAP01_146: THREE.Mesh
      MAP01_147: THREE.Mesh
      MAP01_148: THREE.Mesh
      MAP01_149: THREE.Mesh
      MAP01_150: THREE.Mesh
      MAP01_151: THREE.Mesh
      MAP01_152: THREE.Mesh
      MAP01_153: THREE.Mesh
      MAP01_154: THREE.Mesh
      MAP01_155: THREE.Mesh
      MAP01_156: THREE.Mesh
      MAP01_157: THREE.Mesh
      MAP01_158: THREE.Mesh
      MAP01_159: THREE.Mesh
      MAP01_160: THREE.Mesh
      MAP01_161: THREE.Mesh
      MAP01_162: THREE.Mesh
      MAP01_163: THREE.Mesh
      MAP01_164: THREE.Mesh
      MAP01_165: THREE.Mesh
      MAP01_166: THREE.Mesh
      MAP01_167: THREE.Mesh
      MAP01_168: THREE.Mesh
      MAP01_169: THREE.Mesh
      MAP01_170: THREE.Mesh
      MAP01_171: THREE.Mesh
      MAP01_172: THREE.Mesh
      MAP01_173: THREE.Mesh
      MAP01_174: THREE.Mesh
      MAP01_175: THREE.Mesh
      MAP01_176: THREE.Mesh
      MAP01_177: THREE.Mesh
      MAP01_178: THREE.Mesh
      MAP01_179: THREE.Mesh
      MAP01_180: THREE.Mesh
      MAP01_181: THREE.Mesh
      MAP01_182: THREE.Mesh
      MAP01_183: THREE.Mesh
      MAP01_184: THREE.Mesh
      MAP01_185: THREE.Mesh
      MAP01_186: THREE.Mesh
      MAP01_187: THREE.Mesh
      MAP01_188: THREE.Mesh
      MAP01_189: THREE.Mesh
      MAP01_190: THREE.Mesh
      MAP01_191: THREE.Mesh
      MAP01_192: THREE.Mesh
      MAP01_193: THREE.Mesh
      MAP01_194: THREE.Mesh
      MAP01_195: THREE.Mesh
      MAP01_196: THREE.Mesh
      MAP01_197: THREE.Mesh
      MAP01_198: THREE.Mesh
      MAP01_199: THREE.Mesh
      MAP01_200: THREE.Mesh
      MAP01_201: THREE.Mesh
      MAP01_202: THREE.Mesh
      MAP01_203: THREE.Mesh
      MAP01_204: THREE.Mesh
      MAP01_205: THREE.Mesh
      MAP01_206: THREE.Mesh
      MAP01_207: THREE.Mesh
      MAP01_208: THREE.Mesh
      MAP01_209: THREE.Mesh
      MAP01_210: THREE.Mesh
      MAP01_211: THREE.Mesh
      MAP01_212: THREE.Mesh
      MAP01_213: THREE.Mesh
      MAP01_214: THREE.Mesh
      MAP01_215: THREE.Mesh
      MAP01_216: THREE.Mesh
      MAP01_217: THREE.Mesh
      MAP01_218: THREE.Mesh
      MAP01_219: THREE.Mesh
      MAP01_220: THREE.Mesh
      MAP01_221: THREE.Mesh
      MAP01_222: THREE.Mesh
      MAP01_223: THREE.Mesh
      MAP01_224: THREE.Mesh
      MAP01_225: THREE.Mesh
      MAP01_226: THREE.Mesh
      MAP01_227: THREE.Mesh
      MAP01_228: THREE.Mesh
      MAP01_229: THREE.Mesh
      MAP01_230: THREE.Mesh
      MAP01_231: THREE.Mesh
      MAP01_232: THREE.Mesh
      MAP01_233: THREE.Mesh
      MAP01_234: THREE.Mesh
      MAP01_235: THREE.Mesh
      MAP01_236: THREE.Mesh
      MAP01_237: THREE.Mesh
      MAP01_238: THREE.Mesh
      MAP01_239: THREE.Mesh
      MAP01_240: THREE.Mesh
      MAP01_241: THREE.Mesh
      MAP01_242: THREE.Mesh
      MAP01_243: THREE.Mesh
      MAP01_244: THREE.Mesh
      MAP01_245: THREE.Mesh
      MAP01_246: THREE.Mesh
      MAP01_247: THREE.Mesh
      MAP01_248: THREE.Mesh
      MAP01_249: THREE.Mesh
      MAP01_250: THREE.Mesh
      MAP01_251: THREE.Mesh
      MAP01_252: THREE.Mesh
      MAP01_253: THREE.Mesh
      MAP01_254: THREE.Mesh
      MAP01_255: THREE.Mesh
      MAP01_256: THREE.Mesh
      MAP01_257: THREE.Mesh
      MAP01_258: THREE.Mesh
      MAP01_259: THREE.Mesh
      MAP01_260: THREE.Mesh
      MAP01_261: THREE.Mesh
      MAP01_262: THREE.Mesh
      MAP01_263: THREE.Mesh
      MAP01_264: THREE.Mesh
      MAP01_265: THREE.Mesh
      MAP01_266: THREE.Mesh
      MAP01_267: THREE.Mesh
      MAP01_268: THREE.Mesh
      MAP01_269: THREE.Mesh
      MAP01_270: THREE.Mesh
      MAP01_271: THREE.Mesh
      MAP01_272: THREE.Mesh
      MAP01_273: THREE.Mesh
      MAP01_274: THREE.Mesh
      MAP01_275: THREE.Mesh
      MAP01_276: THREE.Mesh
      MAP01_277: THREE.Mesh
      MAP01_278: THREE.Mesh
      MAP01_279: THREE.Mesh
      MAP01_280: THREE.Mesh
      MAP01_281: THREE.Mesh
      MAP01_282: THREE.Mesh
      MAP01_283: THREE.Mesh
      MAP01_284: THREE.Mesh
      MAP01_285: THREE.Mesh
      MAP01_286: THREE.Mesh
      MAP01_287: THREE.Mesh
      MAP01_288: THREE.Mesh
      MAP01_289: THREE.Mesh
      MAP01_290: THREE.Mesh
      MAP01_291: THREE.Mesh
      MAP01_292: THREE.Mesh
      MAP01_293: THREE.Mesh
      MAP01_294: THREE.Mesh
      MAP01_295: THREE.Mesh
      MAP01_296: THREE.Mesh
      MAP01_297: THREE.Mesh
      MAP01_298: THREE.Mesh
      MAP01_299: THREE.Mesh
      MAP01_300: THREE.Mesh
      MAP01_301: THREE.Mesh
      MAP01_302: THREE.Mesh
      MAP01_303: THREE.Mesh
      MAP01_304: THREE.Mesh
      MAP01_305: THREE.Mesh
      MAP01_306: THREE.Mesh
      MAP01_307: THREE.Mesh
      MAP01_308: THREE.Mesh
      MAP01_309: THREE.Mesh
      MAP01_310: THREE.Mesh
      MAP01_311: THREE.Mesh
      MAP01_312: THREE.Mesh
      MAP01_313: THREE.Mesh
      MAP01_314: THREE.Mesh
      MAP01_315: THREE.Mesh
      MAP01_316: THREE.Mesh
      MAP01_317: THREE.Mesh
      MAP01_318: THREE.Mesh
      MAP01_319: THREE.Mesh
      MAP01_320: THREE.Mesh
      MAP01_321: THREE.Mesh
      MAP01_322: THREE.Mesh
      MAP01_323: THREE.Mesh
      MAP01_324: THREE.Mesh
      MAP01_325: THREE.Mesh
      MAP01_326: THREE.Mesh
      MAP01_327: THREE.Mesh
      MAP01_328: THREE.Mesh
      MAP01_329: THREE.Mesh
      MAP01_330: THREE.Mesh
      MAP01_331: THREE.Mesh
      MAP01_332: THREE.Mesh
      MAP01_333: THREE.Mesh
      MAP01_334: THREE.Mesh
      MAP01_335: THREE.Mesh
      MAP01_336: THREE.Mesh
      MAP01_337: THREE.Mesh
      MAP01_338: THREE.Mesh
      MAP01_339: THREE.Mesh
      MAP01_340: THREE.Mesh
      MAP01_341: THREE.Mesh
      MAP01_342: THREE.Mesh
      MAP01_343: THREE.Mesh
      MAP01_344: THREE.Mesh
      MAP01_345: THREE.Mesh
      MAP01_346: THREE.Mesh
      MAP01_347: THREE.Mesh
      MAP01_348: THREE.Mesh
      MAP01_349: THREE.Mesh
      MAP01_350: THREE.Mesh
      MAP01_351: THREE.Mesh
      MAP01_352: THREE.Mesh
      MAP01_353: THREE.Mesh
      MAP01_354: THREE.Mesh
      MAP01_355: THREE.Mesh
      MAP01_356: THREE.Mesh
      MAP01_357: THREE.Mesh
      MAP01_358: THREE.Mesh
      MAP01_359: THREE.Mesh
      MAP01_360: THREE.Mesh
      MAP01_361: THREE.Mesh
      MAP01_362: THREE.Mesh
      MAP01_363: THREE.Mesh
      MAP01_364: THREE.Mesh
      MAP01_365: THREE.Mesh
      MAP01_366: THREE.Mesh
      MAP01_367: THREE.Mesh
      MAP01_368: THREE.Mesh
      MAP01_369: THREE.Mesh
      MAP01_370: THREE.Mesh
      MAP01_371: THREE.Mesh
      MAP01_372: THREE.Mesh
      MAP01_373: THREE.Mesh
      MAP01_374: THREE.Mesh
      MAP01_375: THREE.Mesh
      MAP01_376: THREE.Mesh
      MAP01_377: THREE.Mesh
      MAP01_378: THREE.Mesh
      MAP01_379: THREE.Mesh
      MAP01_380: THREE.Mesh
      MAP01_381: THREE.Mesh
      MAP01_382: THREE.Mesh
      MAP01_383: THREE.Mesh
      MAP01_384: THREE.Mesh
      MAP01_385: THREE.Mesh
      MAP01_386: THREE.Mesh
      MAP01_387: THREE.Mesh
      MAP01_388: THREE.Mesh
      MAP01_389: THREE.Mesh
      MAP01_390: THREE.Mesh
      MAP01_391: THREE.Mesh
      MAP01_392: THREE.Mesh
      MAP01_393: THREE.Mesh
      MAP01_394: THREE.Mesh
      MAP01_395: THREE.Mesh
      MAP01_396: THREE.Mesh
      MAP01_397: THREE.Mesh
      MAP01_398: THREE.Mesh
      MAP01_399: THREE.Mesh
      MAP01_400: THREE.Mesh
      MAP01_401: THREE.Mesh
      MAP01_402: THREE.Mesh
      MAP01_403: THREE.Mesh
      MAP01_404: THREE.Mesh
      MAP01_405: THREE.Mesh
      MAP01_406: THREE.Mesh
      MAP01_407: THREE.Mesh
      MAP01_408: THREE.Mesh
      MAP01_409: THREE.Mesh
      MAP01_410: THREE.Mesh
      MAP01_411: THREE.Mesh
      MAP01_412: THREE.Mesh
      MAP01_413: THREE.Mesh
      MAP01_414: THREE.Mesh
      MAP01_415: THREE.Mesh
      MAP01_416: THREE.Mesh
      MAP01_417: THREE.Mesh
      MAP01_418: THREE.Mesh
      MAP01_419: THREE.Mesh
      MAP01_420: THREE.Mesh
      MAP01_421: THREE.Mesh
      MAP01_422: THREE.Mesh
      MAP01_423: THREE.Mesh
      MAP01_424: THREE.Mesh
      MAP01_425: THREE.Mesh
      MAP01_426: THREE.Mesh
      MAP01_427: THREE.Mesh
      MAP01_428: THREE.Mesh
      MAP01_429: THREE.Mesh
      MAP01_430: THREE.Mesh
      MAP01_431: THREE.Mesh
      MAP01_432: THREE.Mesh
      MAP01_433: THREE.Mesh
      MAP01_434: THREE.Mesh
      MAP01_435: THREE.Mesh
      MAP01_436: THREE.Mesh
      MAP01_437: THREE.Mesh
      MAP01_438: THREE.Mesh
      MAP01_439: THREE.Mesh
      MAP01_440: THREE.Mesh
      MAP01_441: THREE.Mesh
      MAP01_442: THREE.Mesh
      MAP01_443: THREE.Mesh
      MAP01_444: THREE.Mesh
      MAP01_445: THREE.Mesh
      MAP01_446: THREE.Mesh
      MAP01_447: THREE.Mesh
      MAP01_448: THREE.Mesh
      MAP01_449: THREE.Mesh
      MAP01_450: THREE.Mesh
      MAP01_451: THREE.Mesh
      MAP01_452: THREE.Mesh
      MAP01_453: THREE.Mesh
      MAP01_454: THREE.Mesh
      MAP01_455: THREE.Mesh
      MAP01_456: THREE.Mesh
      MAP01_457: THREE.Mesh
      MAP01_458: THREE.Mesh
      MAP01_459: THREE.Mesh
      MAP01_460: THREE.Mesh
      MAP01_461: THREE.Mesh
      MAP01_462: THREE.Mesh
      MAP01_463: THREE.Mesh
      MAP01_464: THREE.Mesh
      MAP01_465: THREE.Mesh
      MAP01_466: THREE.Mesh
      MAP01_467: THREE.Mesh
      MAP01_468: THREE.Mesh
      MAP01_469: THREE.Mesh
      MAP01_470: THREE.Mesh
      MAP01_471: THREE.Mesh
      MAP01_472: THREE.Mesh
      MAP01_473: THREE.Mesh
      MAP01_474: THREE.Mesh
      MAP01_475: THREE.Mesh
      MAP01_476: THREE.Mesh
      MAP01_477: THREE.Mesh
      MAP01_478: THREE.Mesh
      MAP01_479: THREE.Mesh
      MAP01_480: THREE.Mesh
      MAP01_481: THREE.Mesh
      MAP01_482: THREE.Mesh
      MAP01_483: THREE.Mesh
      MAP01_484: THREE.Mesh
      MAP01_485: THREE.Mesh
      MAP01_486: THREE.Mesh
      MAP01_487: THREE.Mesh
      MAP01_488: THREE.Mesh
      MAP01_489: THREE.Mesh
      MAP01_490: THREE.Mesh
      MAP01_491: THREE.Mesh
      MAP01_492: THREE.Mesh
      MAP01_493: THREE.Mesh
      MAP01_494: THREE.Mesh
      MAP01_51: THREE.Mesh
      MAP01_52: THREE.Mesh
      MAP01_53: THREE.Mesh
      MAP01_54: THREE.Mesh
      MAP01_55: THREE.Mesh
      MAP01_56: THREE.Mesh
      MAP01_57: THREE.Mesh
      MAP01_58: THREE.Mesh
      MAP01_59: THREE.Mesh
      MAP01_60: THREE.Mesh
      MAP01_61: THREE.Mesh
      MAP01_62: THREE.Mesh
      MAP01_63: THREE.Mesh
      MAP01_64: THREE.Mesh
      MAP01_65: THREE.Mesh
      MAP01_66: THREE.Mesh
      manhole_: THREE.Mesh
      MAP01_67: THREE.Mesh
      MAP01_68: THREE.Mesh
      MAP01_69: THREE.Mesh
      MAP01_70: THREE.Mesh
      MAP01_71: THREE.Mesh
      MAP01_72: THREE.Mesh
      MAP01_73: THREE.Mesh
      MAP01_74: THREE.Mesh
      MAP01_75: THREE.Mesh
      MAP01_76: THREE.Mesh
      MAP01_77: THREE.Mesh
      MAP01_78: THREE.Mesh
      MAP01_79: THREE.Mesh
      MAP01_80: THREE.Mesh
      MAP01_81: THREE.Mesh
    }
    materials: {
      BACC03: THREE.MeshStandardMaterial
      YWIN01: THREE.MeshStandardMaterial
      BRIK20: THREE.MeshStandardMaterial
      WIND06: THREE.MeshStandardMaterial
      GRAYVRAK: THREE.MeshStandardMaterial
      E5GRND03: THREE.MeshStandardMaterial
      RECY04: THREE.MeshStandardMaterial
      COPR01: THREE.MeshStandardMaterial
      SANDZ01: THREE.MeshStandardMaterial
      TOPOS01: THREE.MeshStandardMaterial
      CLCK01: THREE.MeshStandardMaterial
      RECY03: THREE.MeshStandardMaterial
      F_SKY1: THREE.MeshStandardMaterial
      DOORSTF1: THREE.MeshStandardMaterial
      TANROCK2: THREE.MeshStandardMaterial
      PIRE06C: THREE.MeshStandardMaterial
      GARG02: THREE.MeshStandardMaterial
      RROCK09: THREE.MeshStandardMaterial
      BACC04: THREE.MeshStandardMaterial
      TRAF01: THREE.MeshStandardMaterial
      WIND01: THREE.MeshStandardMaterial
      TRAFF04: THREE.MeshStandardMaterial
      GRASS1: THREE.MeshStandardMaterial
      BRIK23: THREE.MeshStandardMaterial
      TRAFF07: THREE.MeshStandardMaterial
      STORD0: THREE.MeshStandardMaterial
      METBARF2: THREE.MeshStandardMaterial
      BACC02: THREE.MeshStandardMaterial
      FILL_031: THREE.MeshStandardMaterial
      SNAKD04: THREE.MeshStandardMaterial
      W15_4GRY: THREE.MeshStandardMaterial
      CEIL5_1: THREE.MeshStandardMaterial
      FILL_029: THREE.MeshStandardMaterial
      AART102: THREE.MeshStandardMaterial
      AART89: THREE.MeshStandardMaterial
      GRAYFLA4: THREE.MeshStandardMaterial
      ALLBLACK: THREE.MeshStandardMaterial
      AART24: THREE.MeshStandardMaterial
      BASR01: THREE.MeshStandardMaterial
      E5SHAW89: THREE.MeshStandardMaterial
      BKRK01: THREE.MeshStandardMaterial
      BRIK21: THREE.MeshStandardMaterial
      STORC0: THREE.MeshStandardMaterial
      TILE02: THREE.MeshStandardMaterial
      BRICK5: THREE.MeshStandardMaterial
      AART87: THREE.MeshStandardMaterial
      STORE0: THREE.MeshStandardMaterial
      WIND03: THREE.MeshStandardMaterial
      WIND07: THREE.MeshStandardMaterial
      ZIMMER8: THREE.MeshStandardMaterial
      YWIN03: THREE.MeshStandardMaterial
      TRAF02: THREE.MeshStandardMaterial
      SNAKD03: THREE.MeshStandardMaterial
      GRAY_N65: THREE.MeshStandardMaterial
      FLOOR4_6: THREE.MeshStandardMaterial
      TILE01: THREE.MeshStandardMaterial
      ROCK01: THREE.MeshStandardMaterial
      CROSW02: THREE.MeshStandardMaterial
      BRICK12: THREE.MeshStandardMaterial
      RECY01: THREE.MeshStandardMaterial
      RECY02: THREE.MeshStandardMaterial
      WIND05: THREE.MeshStandardMaterial
      DOOR12_1: THREE.MeshStandardMaterial
      FILL_014: THREE.MeshStandardMaterial
      FILL_034: THREE.MeshStandardMaterial
      FLAT1_1W: THREE.MeshStandardMaterial
      STORB0: THREE.MeshStandardMaterial
      WOODP01: THREE.MeshStandardMaterial
      ELEV1: THREE.MeshStandardMaterial
      YUAG03: THREE.MeshStandardMaterial
      MHOL01: THREE.MeshStandardMaterial
      FILL_030: THREE.MeshStandardMaterial
      BROWNHUG: THREE.MeshStandardMaterial
      FLOOR5_4: THREE.MeshStandardMaterial
      FILL_02: THREE.MeshStandardMaterial
      RECY05: THREE.MeshStandardMaterial
      CROSW01: THREE.MeshStandardMaterial
      WOODSHAC: THREE.MeshStandardMaterial
      FLOR01: THREE.MeshStandardMaterial
      FILL_028: THREE.MeshStandardMaterial
      BRIK22: THREE.MeshStandardMaterial
      FLAT20: THREE.MeshStandardMaterial
      BSTONE2: THREE.MeshStandardMaterial
      YUAG01: THREE.MeshStandardMaterial
      GRAY_N27: THREE.MeshStandardMaterial
      STORF0: THREE.MeshStandardMaterial
    }
  }

  const gltf = useGltf<GLTFResult>(
    '/models/Downtown NH.glb'
  )
</script>

<T.Group
  bind:ref
  dispose={false}
  {...props}
>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <T.Mesh
      geometry={gltf.nodes.MAP01.geometry}
      material={gltf.materials.BACC03}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_1.geometry}
      material={gltf.materials.YWIN01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_2.geometry}
      material={gltf.materials.BRIK20}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_3.geometry}
      material={gltf.materials.WIND06}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_4.geometry}
      material={gltf.materials.GRAYVRAK}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_5.geometry}
      material={gltf.materials.E5GRND03}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_6.geometry}
      material={gltf.materials.RECY04}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_7.geometry}
      material={gltf.materials.COPR01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_8.geometry}
      material={gltf.materials.SANDZ01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_9.geometry}
      material={gltf.materials.TOPOS01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_10.geometry}
      material={gltf.materials.CLCK01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_11.geometry}
      material={gltf.materials.RECY03}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_12.geometry}
      material={gltf.materials.F_SKY1}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_13.geometry}
      material={gltf.materials.DOORSTF1}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_14.geometry}
      material={gltf.materials.TANROCK2}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_15.geometry}
      material={gltf.materials.PIRE06C}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_16.geometry}
      material={gltf.materials.GARG02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_17.geometry}
      material={gltf.materials.RROCK09}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_18.geometry}
      material={gltf.materials.BACC04}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_19.geometry}
      material={gltf.materials.TRAF01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_20.geometry}
      material={gltf.materials.WIND01}
    />
    <T.Mesh
      geometry={gltf.nodes.Road03.geometry}
      material={gltf.materials.TRAFF04}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_21.geometry}
      material={gltf.materials.GRASS1}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_22.geometry}
      material={gltf.materials.BRIK23}
    />
    <T.Mesh
      geometry={gltf.nodes.road_01.geometry}
      material={gltf.materials.TRAFF07}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_23.geometry}
      material={gltf.materials.STORD0}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_24.geometry}
      material={gltf.materials.METBARF2}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_25.geometry}
      material={gltf.materials.BACC02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_26.geometry}
      material={gltf.materials.FILL_031}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_27.geometry}
      material={gltf.materials.SNAKD04}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_28.geometry}
      material={gltf.materials.W15_4GRY}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_29.geometry}
      material={gltf.materials.CEIL5_1}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_30.geometry}
      material={gltf.materials.FILL_029}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_31.geometry}
      material={gltf.materials.AART102}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_32.geometry}
      material={gltf.materials.AART89}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_33.geometry}
      material={gltf.materials.GRAYFLA4}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_34.geometry}
      material={gltf.materials.ALLBLACK}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_35.geometry}
      material={gltf.materials.AART24}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_36.geometry}
      material={gltf.materials.BASR01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_37.geometry}
      material={gltf.materials.E5SHAW89}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_38.geometry}
      material={gltf.materials.BKRK01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_39.geometry}
      material={gltf.materials.BRIK21}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_40.geometry}
      material={gltf.materials.STORC0}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_41.geometry}
      material={gltf.materials.TILE02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_42.geometry}
      material={gltf.materials.BRICK5}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_43.geometry}
      material={gltf.materials.AART87}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_44.geometry}
      material={gltf.materials.STORE0}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_45.geometry}
      material={gltf.materials.WIND03}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_46.geometry}
      material={gltf.materials.WIND07}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_47.geometry}
      material={gltf.materials.ZIMMER8}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_48.geometry}
      material={gltf.materials.YWIN03}
    />
    <T.Mesh
      geometry={gltf.nodes.Road_02.geometry}
      material={gltf.materials.TRAF02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_49.geometry}
      material={gltf.materials.SNAKD03}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_51.geometry}
      material={gltf.materials.FLOOR4_6}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_52.geometry}
      material={gltf.materials.TILE01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_53.geometry}
      material={gltf.materials.ROCK01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_54.geometry}
      material={gltf.materials.CROSW02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_55.geometry}
      material={gltf.materials.BRICK12}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_56.geometry}
      material={gltf.materials.RECY01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_57.geometry}
      material={gltf.materials.RECY02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_58.geometry}
      material={gltf.materials.WIND05}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_59.geometry}
      material={gltf.materials.DOOR12_1}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_60.geometry}
      material={gltf.materials.FILL_014}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_61.geometry}
      material={gltf.materials.FILL_034}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_62.geometry}
      material={gltf.materials.FLAT1_1W}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_63.geometry}
      material={gltf.materials.STORB0}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_64.geometry}
      material={gltf.materials.WOODP01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_65.geometry}
      material={gltf.materials.ELEV1}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_66.geometry}
      material={gltf.materials.YUAG03}
    />
    <T.Mesh
      geometry={gltf.nodes.manhole_.geometry}
      material={gltf.materials.MHOL01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_67.geometry}
      material={gltf.materials.FILL_030}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_68.geometry}
      material={gltf.materials.BROWNHUG}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_69.geometry}
      material={gltf.materials.FLOOR5_4}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_70.geometry}
      material={gltf.materials.FILL_02}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_71.geometry}
      material={gltf.materials.RECY05}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_72.geometry}
      material={gltf.materials.CROSW01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_73.geometry}
      material={gltf.materials.WOODSHAC}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_74.geometry}
      material={gltf.materials.FLOR01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_75.geometry}
      material={gltf.materials.FILL_028}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_76.geometry}
      material={gltf.materials.BRIK22}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_77.geometry}
      material={gltf.materials.FLAT20}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_78.geometry}
      material={gltf.materials.BSTONE2}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_79.geometry}
      material={gltf.materials.YUAG01}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_80.geometry}
      material={gltf.materials.GRAY_N27}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_81.geometry}
      material={gltf.materials.STORF0}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_132.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_133.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_134.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_135.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_136.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_137.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_138.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_139.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_140.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_141.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_142.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_143.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_144.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_145.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_146.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_147.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_148.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_149.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_150.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_151.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_152.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_153.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_154.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_155.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_156.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_157.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_158.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_159.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_160.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_161.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_162.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_163.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_164.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_165.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_166.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_167.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_168.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_169.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_170.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_171.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_172.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_173.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_174.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_175.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_176.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_177.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_178.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_179.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_180.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_181.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_182.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_183.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_184.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_185.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_186.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_187.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_188.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_189.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_190.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_191.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_192.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_193.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_194.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_195.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_196.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_197.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_198.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_199.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_200.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_201.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_202.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_203.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_204.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_205.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_206.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_207.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_208.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_209.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_210.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_211.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_212.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_213.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_214.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_215.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_216.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_217.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_218.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_219.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_220.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_221.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_222.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_223.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_224.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_225.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_226.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_227.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_228.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_229.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_230.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_231.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_232.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_233.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_234.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_235.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_236.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_237.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_238.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_239.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_240.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_241.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_242.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_243.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_244.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_245.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_246.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_247.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_248.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_249.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_250.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_251.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_252.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_253.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_254.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_255.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_256.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_257.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_258.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_259.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_260.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_261.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_262.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_263.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_264.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_265.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_266.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_267.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_268.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_269.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_270.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_271.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_272.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_273.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_274.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_275.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_276.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_277.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_278.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_279.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_280.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_281.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_282.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_283.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_284.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_285.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_286.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_287.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_288.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_289.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_290.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_291.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_292.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_293.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_294.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_295.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_296.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_297.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_298.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_299.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_300.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_301.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_302.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_303.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_304.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_305.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_306.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_307.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_308.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_309.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_310.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_311.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_312.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_313.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_314.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_315.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_316.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_317.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_318.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_319.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_320.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_321.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_322.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_323.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_324.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_325.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_326.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_327.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_328.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_329.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_330.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_331.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_332.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_333.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_334.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_335.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_336.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_337.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_338.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_339.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_340.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_341.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_342.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_343.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_344.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_345.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_346.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_347.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_348.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_349.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_350.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_351.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_352.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_353.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_354.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_355.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_356.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_357.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_358.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_359.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_360.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_361.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_362.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_363.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_364.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_365.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_366.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_367.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_368.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_369.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_370.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_371.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_372.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_373.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_374.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_375.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_376.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_377.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_378.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_379.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_380.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_381.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_382.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_383.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_384.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_385.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_386.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_387.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_388.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_389.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_390.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_391.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_392.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_393.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_394.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_395.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_396.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_397.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_398.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_399.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_400.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_401.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_402.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_403.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_404.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_405.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_406.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_407.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_408.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_409.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_410.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_411.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_412.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_413.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_414.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_415.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_416.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_417.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_418.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_419.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_420.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_421.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_422.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_423.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_424.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_425.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_426.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_427.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_428.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_429.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_430.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_431.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_432.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_433.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_434.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_435.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_436.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_437.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_438.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_439.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_440.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_441.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_442.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_443.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_444.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_445.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_446.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_447.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_448.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_449.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_450.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_451.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_452.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_453.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_454.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_455.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_456.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_457.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_458.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_459.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_460.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_461.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_462.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_463.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_464.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_465.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_466.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_467.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_468.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_469.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_470.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_471.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_472.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_473.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_474.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_475.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_476.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_477.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_478.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_479.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_480.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_481.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_482.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_483.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_484.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_485.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_486.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_487.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_488.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_489.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_490.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_491.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_492.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_493.geometry}
      material={gltf.materials.GRAY_N65}
    />
    <T.Mesh
      geometry={gltf.nodes.MAP01_494.geometry}
      material={gltf.materials.GRAY_N65}
    />
  {:catch err}
    {@render error?.({ error: err })}
  {/await}
  {#if ref}
      {@render children?.({ ref })}
  {/if}
</T.Group>
