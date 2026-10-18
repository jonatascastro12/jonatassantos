type SculptureControls = {
    surface: HTMLButtonElement;
    reset: HTMLButtonElement;
    rotate: (yaw: number, pitch: number) => void;
    energize: (strength: number) => void;
    restore: () => void;
};

export function bindSculptureControls({ surface, reset, rotate, energize, restore }: SculptureControls) {
    let pointer: { id: number; x: number; y: number; time: number; touch: boolean; dragging: boolean } | undefined;
    let suppressClick = false;
    const release = () => {
        const id = pointer?.id;
        pointer = undefined;
        delete surface.dataset.dragging;
        if (id !== undefined && surface.hasPointerCapture(id)) surface.releasePointerCapture(id);
    };
    const down = (event: PointerEvent) => {
        if (!event.isPrimary || event.button !== 0 || pointer) return;
        suppressClick = false;
        pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, touch: event.pointerType === "touch", dragging: false };
        if (!pointer.touch) surface.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
        if (!pointer || pointer.id !== event.pointerId) return;
        const dx = event.clientX - pointer.x;
        const dy = event.clientY - pointer.y;
        if (!pointer.dragging) {
            if (Math.hypot(dx, dy) < 6) return;
            // Vertical touch gestures belong to page scrolling; horizontal
            // gestures rotate the sculpture. Native pan-y handles cancellation.
            if (pointer.touch && Math.abs(dy) > Math.abs(dx)) {
                suppressClick = true;
                release();
                return;
            }
            pointer.dragging = true;
            surface.dataset.dragging = "true";
            surface.setPointerCapture(event.pointerId);
        }
        suppressClick = true;
        const speed = Math.hypot(dx, dy) / Math.max(16, event.timeStamp - pointer.time);
        rotate(dx / surface.clientWidth * Math.PI * 1.5, pointer.touch ? 0 : dy / surface.clientHeight * Math.PI);
        energize(Math.min(1, 0.25 + speed * 0.55));
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.time = event.timeStamp;
    };
    const end = (event: PointerEvent) => {
        if (pointer?.id !== event.pointerId) return;
        if (event.type !== "pointerup") suppressClick = true;
        release();
    };
    const click = (event: MouseEvent) => {
        if (event.detail === 0 || !suppressClick) energize(0.9);
    };
    const key = (event: KeyboardEvent) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "Home" || event.key === "Escape") {
            event.preventDefault();
            release();
            restore();
        } else if ([
            "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
        ].includes(event.key)) {
            event.preventDefault();
            rotate(event.key === "ArrowLeft" ? -0.15 : event.key === "ArrowRight" ? 0.15 : 0,
                event.key === "ArrowUp" ? -0.12 : event.key === "ArrowDown" ? 0.12 : 0);
            energize(0.5);
        }
    };
    surface.addEventListener("pointerdown", down);
    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerup", end);
    surface.addEventListener("pointercancel", end);
    surface.addEventListener("lostpointercapture", end);
    surface.addEventListener("click", click);
    surface.addEventListener("keydown", key);
    surface.addEventListener("blur", release);
    reset.addEventListener("click", restore);
    return () => {
        release();
        surface.removeEventListener("pointerdown", down);
        surface.removeEventListener("pointermove", move);
        surface.removeEventListener("pointerup", end);
        surface.removeEventListener("pointercancel", end);
        surface.removeEventListener("lostpointercapture", end);
        surface.removeEventListener("click", click);
        surface.removeEventListener("keydown", key);
        surface.removeEventListener("blur", release);
        reset.removeEventListener("click", restore);
    };
}
