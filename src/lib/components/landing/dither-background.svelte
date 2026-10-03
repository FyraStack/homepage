<script lang="ts" module>
  export interface DitherSettings {
    clearAmount: number;
    clearH: number;
    clearW: number;
    clearX: number;
    clearY: number;
    driftX: number;
    driftY: number;
    fadeBottom: number;
    fadeTop: number;
    intensity: number;
    pxSize: number;
    scale: number;
    seed: number;
    shape: 1 | 2 | 3 | 4;
    shimmer: number;
    shimmerRate: number;
    speed: number;
  }

  const defaultSettings: DitherSettings = {
    clearAmount: 0,
    clearH: 0.2,
    clearW: 0.35,
    clearX: 0.5,
    clearY: 0.25,
    driftX: 18,
    driftY: -10,
    fadeBottom: 0,
    fadeTop: 0.4,
    intensity: 1,
    pxSize: 4,
    scale: 1,
    seed: 0,
    shape: 2,
    shimmer: 0.35,
    shimmerRate: 6,
    speed: 1,
  };

  const palette = {
    color1: "#3a171a",
    color2: "#a54a4b",
    color3: "#fe6565",
    color4: "#fef400",
    colorBack: "#18181a",
  };

  const rampDurationMs = 4000;
  const maxFrameGapMs = 100;

  const vertexSource = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

  function hexToRgb(hex: string): [number, number, number] {
    const channel = (offset: number) =>
      Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return [channel(1), channel(3), channel(5)];
  }

  function compileShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ) {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    }
    gl.deleteShader(shader);
    return null;
  }

  function createProgram(gl: WebGLRenderingContext, fragmentSource: string) {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!(vertex && fragment)) {
      return null;
    }
    const program = gl.createProgram();
    if (!program) {
      return null;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import fragmentSource from "$lib/shaders/dithering.frag?raw";
  import { cn } from "$lib/utils";

  let {
    poster,
    settings = {},
    priority = false,
    class: className,
  }: {
    poster: string;
    settings?: Partial<DitherSettings>;
    priority?: boolean;
    class?: string;
  } = $props();

  let canvas = $state<HTMLCanvasElement>();
  let rendering = $state(false);

  onMount(() => {
    const element = canvas;
    if (!element) {
      return;
    }
    const gl = element.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      return;
    }
    const program = createProgram(gl, fragmentSource);
    if (!program) {
      return;
    }

    const config = { ...defaultSettings, ...settings };
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    for (const [key, value] of Object.entries(config)) {
      gl.uniform1f(uniform(`u_${key}`), value);
    }
    for (const [key, hex] of Object.entries(palette)) {
      gl.uniform3fv(uniform(`u_${key}`), hexToRgb(hex));
    }
    const resolutionLocation = uniform("u_resolution");
    const timeLocation = uniform("u_time");

    const resize = () => {
      element.width = Math.max(1, Math.round(element.clientWidth));
      element.height = Math.max(1, Math.round(element.clientHeight));
      gl.viewport(0, 0, element.width, element.height);
      gl.uniform2f(resolutionLocation, element.width, element.height);
    };

    const draw = (seconds: number) => {
      gl.uniform1f(timeLocation, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rendering = true;
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let shaderSeconds = 0;
    let lastFrame: number | null = null;
    let rampStart: number | null = null;
    let frame = 0;
    let visible = false;

    const rampProgress = (now: number) => {
      rampStart ??= now;
      const progress = Math.min(1, (now - rampStart) / rampDurationMs);
      return progress * progress * (3 - 2 * progress);
    };

    const loop = (now: number) => {
      const elapsed =
        lastFrame === null ? 0 : Math.min(now - lastFrame, maxFrameGapMs);
      shaderSeconds += (elapsed / 1000) * rampProgress(now);
      lastFrame = now;
      draw(shaderSeconds);
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      lastFrame = null;
      if (reducedMotion.matches) {
        draw(0);
      } else if (visible) {
        frame = requestAnimationFrame(loop);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(shaderSeconds);
    });
    resizeObserver.observe(element);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(element);
    reducedMotion.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", sync);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  });
</script>

<svelte:head>
  {#if priority}
    <link as="image" fetchpriority="high" href={poster} rel="preload">
  {/if}
</svelte:head>

<div
  aria-hidden="true"
  class={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
>
  <img
    alt=""
    class="absolute inset-0 size-full object-none [image-rendering:pixelated]"
    decoding={priority ? "sync" : "async"}
    fetchpriority={priority ? "high" : "auto"}
    loading={priority ? "eager" : "lazy"}
    src={poster}
  >
  <canvas
    class={cn(
      "absolute inset-0 size-full transition-opacity duration-700 [image-rendering:pixelated]",
      rendering ? "opacity-100" : "opacity-0"
    )}
    bind:this={canvas}
  ></canvas>
</div>
