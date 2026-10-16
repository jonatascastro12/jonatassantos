"use client";

import { useEffect, useRef } from "react";

export function HarmonicSculpture() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const host = ref.current;
        const canvas = host?.querySelector("canvas");
        if (!host || !canvas) return;
        const reduced = matchMedia("(prefers-reduced-motion: reduce)");
        let disposed = false;
        let visible = true;
        let frame = 0;
        let revealFrame = 0;
        let elapsed = 0;
        let previous = 0;
        let scene: Awaited<ReturnType<typeof import("@/lib/harmonic-sculpture-scene").createSculpture>> | undefined;

        const render = () => scene?.render(elapsed);
        const tick = (now: number) => {
            if (now - previous >= 1000 / 30) {
                elapsed += previous ? Math.min((now - previous) / 1000, 0.1) : 0;
                previous = now;
                render();
            }
            frame = requestAnimationFrame(tick);
        };
        const resume = () => {
            cancelAnimationFrame(frame);
            previous = 0;
            render();
            if (scene && visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
        };
        const resize = () => {
            scene?.resize(host.clientWidth, host.clientHeight);
            render();
        };
        const theme = () => {
            scene?.setTheme(document.documentElement.classList.contains("dark"));
            render();
        };
        const lost = (event: Event) => {
            event.preventDefault();
            cancelAnimationFrame(frame);
            cancelAnimationFrame(revealFrame);
            scene?.dispose();
            scene = undefined;
            delete host.dataset.ready;
        };
        const intersection = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            resume();
        });
        const size = new ResizeObserver(resize);
        const observer = new MutationObserver(theme);
        intersection.observe(host);
        size.observe(host);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        document.addEventListener("visibilitychange", resume);
        reduced.addEventListener("change", resume);
        canvas.addEventListener("webglcontextlost", lost);

        // Reserve the artwork's space while loading. Reveal only the actual
        // rendered scene; unavailable WebGL leaves this decorative area clear.
        import("@/lib/harmonic-sculpture-scene").then(({ createSculpture }) => {
            if (disposed) return;
            scene = createSculpture(canvas);
            if (!scene) return;
            resize();
            theme();
            resume();
            revealFrame = requestAnimationFrame(() => {
                if (!disposed && scene) host.dataset.ready = "true";
            });
        }).catch(() => {
            scene?.dispose();
            scene = undefined;
            delete host.dataset.ready;
        });

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            cancelAnimationFrame(revealFrame);
            intersection.disconnect();
            size.disconnect();
            observer.disconnect();
            document.removeEventListener("visibilitychange", resume);
            reduced.removeEventListener("change", resume);
            canvas.removeEventListener("webglcontextlost", lost);
            scene?.dispose();
            delete host.dataset.ready;
        };
    }, []);

    return (
        <div ref={ref} className="hero-artwork" aria-hidden="true">
            <canvas />
        </div>
    );
}
