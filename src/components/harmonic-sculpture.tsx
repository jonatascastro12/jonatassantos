"use client";

import { useEffect, useId, useRef } from "react";
import { messages, type Locale } from "@/lib/i18n";
import { bindSculptureControls } from "@/lib/harmonic-sculpture-controls";

export function HarmonicSculpture({ locale }: { locale: Locale }) {
    const ref = useRef<HTMLDivElement>(null);
    const helpId = useId();
    const text = messages[locale];

    useEffect(() => {
        const host = ref.current;
        const canvas = host?.querySelector("canvas");
        const surface = host?.querySelector<HTMLButtonElement>(".sculpture-surface");
        const reset = host?.querySelector<HTMLButtonElement>(".sculpture-reset");
        if (!host || !canvas || !surface || !reset) return;
        const reduced = matchMedia("(prefers-reduced-motion: reduce)");
        let disposed = false;
        let visible = true;
        let frame = 0;
        let revealFrame = 0;
        let elapsed = 0;
        let previous = 0;
        let unbind: (() => void) | undefined;
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
            if (reduced.matches) scene?.clearEnergy();
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
            unbind?.();
            unbind = undefined;
            surface.disabled = reset.disabled = true;
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

        // Keep controls out of keyboard navigation until the real scene exists.
        import("@/lib/harmonic-sculpture-scene").then(({ createSculpture }) => {
            if (disposed) return;
            scene = createSculpture(canvas);
            if (!scene) return;
            resize();
            theme();
            resume();
            unbind = bindSculptureControls({
                surface,
                reset,
                rotate: (yaw, pitch) => {
                    scene?.rotate(yaw, pitch);
                    if (reduced.matches) render();
                },
                energize: (strength) => {
                    if (reduced.matches) return;
                    scene?.energize(elapsed, strength);
                },
                restore: () => {
                    scene?.reset();
                    render();
                },
            });
            revealFrame = requestAnimationFrame(() => {
                if (!disposed && scene) {
                    host.dataset.ready = "true";
                    surface.disabled = reset.disabled = false;
                }
            });
        }).catch(() => {
            unbind?.();
            unbind = undefined;
            surface.disabled = reset.disabled = true;
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
            unbind?.();
            surface.disabled = reset.disabled = true;
            scene?.dispose();
            delete host.dataset.ready;
        };
    }, []);

    return (
        <div ref={ref} className="hero-artwork">
            <button type="button" className="sculpture-surface" disabled aria-label={text.sculptureLabel} aria-describedby={helpId}>
                <canvas aria-hidden="true" />
            </button>
            <div className="sculpture-toolbar">
                <button type="button" className="sculpture-reset" disabled aria-label={text.sculptureReset} title={text.sculptureReset}>
                    <span aria-hidden="true">↺</span>
                </button>
            </div>
            <span id={helpId} className="sr-only">{text.sculptureHelp}</span>
        </div>
    );
}
