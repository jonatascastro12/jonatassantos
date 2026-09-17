"use client";

import { useEffect, useRef } from "react";

// Original GLSL: a drifting computational constellation. Inspired by the
// Tech / Binary family at https://www.shadcn.io/shaders, not copied shader code.
const vertexSource = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;
const fragmentSource = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float dark;
vec2 hash(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3)))) * 43758.5453);
}
vec2 node(vec2 cell, float t) {
  vec2 h = hash(cell);
  return cell + 0.5 + 0.3 * sin(t * 0.17 + h * 6.2831);
}
float segment(vec2 p, vec2 a, vec2 b) {
  vec2 v = b-a;
  return length(p-a-v*clamp(dot(p-a,v)/max(dot(v,v),0.001),0.0,1.0));
}
void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = (gl_FragCoord.xy - 0.5*resolution) / resolution.y;
  float angle = -0.23;
  p = mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*p;
  p = p*9.0 + vec2(time*0.025, time*0.013);
  vec2 cell = floor(p);
  float lines = 0.0;
  float points = 0.0;
  float signal = 0.0;
  for (int y=-1; y<=1; y++) {
    for (int x=-1; x<=1; x++) {
      vec2 c = cell + vec2(float(x),float(y));
      vec2 a = node(c,time);
      vec2 h = hash(c);
      float d = length(p-a);
      points += 0.022 / (d*d*90.0+0.02);
      vec2 b = node(c + vec2(1.0, h.x>0.5 ? 1.0 : 0.0),time);
      float edge = segment(p,a,b);
      lines += (1.0-smoothstep(0.006,0.02,edge))*0.25;
      vec2 packet = mix(a,b,fract(time*0.11+h.y));
      float pd = length(p-packet);
      signal += exp(-pd*pd*2400.0)*0.8;
    }
  }
  // Protect the reading column; keep detail concentrated at the margins.
  float sides = smoothstep(0.10,0.48,abs(uv.x-0.5));
  float vignette = smoothstep(0.0,0.22,uv.y)*smoothstep(0.0,0.22,1.0-uv.y);
  float strength = (lines + points*0.4 + signal)*mix(0.035,0.55,sides)*vignette;
  vec3 ink = mix(vec3(0.04,0.43,0.41),vec3(0.18,0.78,0.68),dark);
  gl_FragColor = vec4(ink, clamp(strength,0.0,0.65));
}
`;

export function ShaderBackground() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: "low-power" });
        if (!gl) return; // CSS provides the static fallback.
        const shaders: WebGLShader[] = [];
        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            shaders.push(shader);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
        };
        const vertex = compile(gl.VERTEX_SHADER, vertexSource);
        const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
        const program = gl.createProgram();
        if (!vertex || !fragment || !program) {
            shaders.forEach((shader) => gl.deleteShader(shader));
            if (program) gl.deleteProgram(program);
            return;
        }
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            shaders.forEach((shader) => gl.deleteShader(shader));
            gl.deleteProgram(program);
            return;
        }
        gl.useProgram(program);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
        ]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const resolution = gl.getUniformLocation(program, "resolution");
        const time = gl.getUniformLocation(program, "time");
        const dark = gl.getUniformLocation(program, "dark");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        let elapsed = 0;
        let last = 0;
        let lost = false;
        const draw = () => {
            if (lost) return;
            gl.uniform2f(resolution, canvas.width, canvas.height);
            gl.uniform1f(time, elapsed);
            gl.uniform1f(dark, document.documentElement.classList.contains("dark") ? 1 : 0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            canvas.dataset.ready = "true";
        };
        const tick = (now: number) => {
            // Cap animation at 30fps and never catch up after a hidden tab.
            if (now - last >= 1000 / 30) {
                elapsed += last ? Math.min((now - last) / 1000, 0.1) : 0;
                last = now;
                draw();
            }
            frame = requestAnimationFrame(tick);
        };
        const resume = () => {
            cancelAnimationFrame(frame);
            last = 0;
            draw();
            if (!document.hidden && !reduced.matches && !lost) frame = requestAnimationFrame(tick);
        };
        const resize = () => {
            // Budget under 0.6 megapixels; decorative rendering does not need retina resolution.
            const dpr = Math.min(1, Math.sqrt(600000 / (window.innerWidth * window.innerHeight)));
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            draw();
        };
        const onLost = (event: Event) => {
            event.preventDefault();
            lost = true;
            cancelAnimationFrame(frame);
            canvas.style.opacity = "0";
        };
        const observer = new MutationObserver(draw);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", resume);
        reduced.addEventListener("change", resume);
        canvas.addEventListener("webglcontextlost", onLost);
        resize();
        resume();
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", resume);
            reduced.removeEventListener("change", resume);
            canvas.removeEventListener("webglcontextlost", onLost);
            gl.deleteBuffer(buffer);
            shaders.forEach((shader) => gl.deleteShader(shader));
            gl.deleteProgram(program);
        };
    }, []);

    return <div className="shader-bg" aria-hidden="true"><canvas ref={ref} /></div>;
}
