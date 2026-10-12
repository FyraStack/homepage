/*
 * Ported from Paper Shaders "Dithering" (https://github.com/paper-design/shaders)
 * Copyright Paper Design, licensed under the Apache License 2.0.
 * Modified: WebGL 1.0 port, multi-color ramp, vertical fade, drift, shimmer, clear zone,
 * center-anchored pixel grid, height-relative clear zone and one-fragment-per-cell rendering.
 */
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_cellOffset;
uniform float u_time;
uniform float u_pxSize;
uniform float u_scale;
uniform float u_speed;
uniform float u_seed;
uniform float u_intensity;
uniform float u_fadeTop;
uniform float u_fadeBottom;
uniform float u_driftX;
uniform float u_driftY;
uniform float u_shimmer;
uniform float u_shimmerRate;
uniform float u_clearAmount;
uniform float u_clearX;
uniform float u_clearY;
uniform float u_clearW;
uniform float u_clearH;
uniform vec3 u_colorBack;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

float shapeWarp(vec2 p, float t) {
  p *= 0.003;
  for (float i = 1.0; i < 6.0; i++) {
    p.x += 0.6 / i * cos(i * 2.5 * p.y + t);
    p.y += 0.6 / i * cos(i * 1.5 * p.x + t);
  }
  float s = 0.15 / max(0.001, abs(sin(t - p.y - p.x)));
  return smoothstep(0.02, 1.0, s);
}

vec3 ramp(float level) {
  if (level < 0.5) return u_colorBack;
  if (level < 1.5) return u_color1;
  if (level < 2.5) return u_color2;
  if (level < 3.5) return u_color3;
  return u_color4;
}

void main() {
  float t = 0.5 * (u_time * u_speed + u_seed);
  float px = max(1.0, u_pxSize);

  vec2 anchor = floor(0.5 * u_resolution + 0.5);
  vec2 cell = floor(gl_FragCoord.xy) + u_cellOffset;
  vec2 centered = (cell + 0.5) * px;
  vec2 center = centered + anchor;
  vec2 drift = vec2(u_driftX, u_driftY) * u_time;
  vec2 world = (centered - drift) / u_scale;

  float shape = shapeWarp(world, t);

  float yNorm = center.y / u_resolution.y;
  float fade = (1.0 - smoothstep(1.0 - u_fadeTop - 0.0001, 1.0, yNorm)) * smoothstep(0.0, u_fadeBottom + 0.0001, yNorm);
  vec2 fromTop = vec2(centered.x / u_resolution.y + 0.5, 1.0 - yNorm);
  vec2 zone = (fromTop - vec2(u_clearX, u_clearY)) / max(vec2(u_clearW, u_clearH), vec2(0.001));
  float clear = mix(1.0, smoothstep(0.55, 1.35, length(zone)), clamp(u_clearAmount, 0.0, 1.0));
  shape = clamp(shape * u_intensity * fade * clear, 0.0, 1.0);

  float sparkle = hash21(cell + floor(u_time * u_shimmerRate)) - 0.5;
  float threshold = bayer8(cell) - 0.5 + u_shimmer * 0.5 * sparkle;
  float level = clamp(floor(shape * 4.0 + 0.5 + threshold), 0.0, 4.0);

  gl_FragColor = vec4(ramp(level), 1.0);
}
