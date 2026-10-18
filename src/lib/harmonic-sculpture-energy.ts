import * as THREE from "three";

// Reuse a small pool: a long drag never adds objects or GPU allocations.
export function createSculptureEnergy(scene: THREE.Scene, camera: THREE.Camera) {
    const ringGeometry = new THREE.TorusGeometry(1, 0.014, 6, 96);
    const sparkCanvas = document.createElement("canvas");
    sparkCanvas.width = sparkCanvas.height = 32;
    const brush = sparkCanvas.getContext("2d")!;
    const glow = brush.createRadialGradient(16, 16, 0, 16, 16, 16);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.25, "rgba(255,255,255,0.8)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    brush.fillStyle = glow;
    brush.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(sparkCanvas);
    const bursts = Array.from({ length: 4 }, (_, index) => {
        const group = new THREE.Group();
        group.position.set(0, 0.25, 0);
        group.quaternion.copy(camera.quaternion);
        group.rotateZ(index * 0.7);
        group.visible = false;
        scene.add(group);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x209f78, transparent: true, depthWrite: false, toneMapped: false });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        const echo = new THREE.Mesh(ringGeometry, ringMaterial);
        echo.rotation.x = 0.65;
        echo.rotation.y = -0.35;
        group.add(ring, echo);
        const positions = new Float32Array(48 * 3);
        const trails = new Float32Array(48 * 6);
        const directions = Array.from({ length: 48 }, (_, spark) => {
            const angle = spark * 2.399963;
            return new THREE.Vector3(Math.cos(angle), Math.sin(angle), Math.sin(spark * 1.7) * 0.35);
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
        const material = new THREE.PointsMaterial({ color: 0x209f78, map: texture, size: 0.085, transparent: true, depthWrite: false, toneMapped: false });
        const sparks = new THREE.Points(geometry, material);
        const trailGeometry = new THREE.BufferGeometry();
        trailGeometry.setAttribute("position", new THREE.BufferAttribute(trails, 3).setUsage(THREE.DynamicDrawUsage));
        const trailMaterial = new THREE.LineBasicMaterial({ color: 0x209f78, transparent: true, depthWrite: false, toneMapped: false });
        const streaks = new THREE.LineSegments(trailGeometry, trailMaterial);
        // Their positions expand after upload, outside the initial zero bounds.
        sparks.frustumCulled = false;
        streaks.frustumCulled = false;
        group.add(sparks, streaks);
        return { group, ring, echo, ringMaterial, sparks, streaks, directions, positions, trails, started: -10, strength: 0 };
    });
    let next = 0;
    let last = -10;

    return {
        emit(time: number, strength: number) {
            if (time - last < 0.3) return;
            last = time;
            const burst = bursts[next++ % bursts.length];
            burst.started = time;
            burst.strength = THREE.MathUtils.clamp(strength, 0.25, 1);
            burst.group.visible = true;
        },
        setTheme(dark: boolean) {
            for (const burst of bursts) {
                burst.ringMaterial.color.setHex(dark ? 0x87ffd2 : 0x20966f);
                burst.sparks.material.color.setHex(dark ? 0xa0ffdc : 0x15815e);
                burst.streaks.material.color.setHex(dark ? 0x87ffd2 : 0x20966f);
                burst.sparks.material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
            }
        },
        update(time: number) {
            let energy = 0;
            for (const burst of bursts) {
                if (!burst.group.visible) continue;
                const age = (time - burst.started) / 1.15;
                if (age >= 1) {
                    burst.group.visible = false;
                    continue;
                }
                const fade = Math.pow(1 - age, 1.2);
                const expansion = 1 - Math.pow(1 - age, 2);
                const radius = 0.45 + expansion * (1.1 + burst.strength * 0.5);
                burst.ring.scale.setScalar(radius);
                burst.echo.scale.setScalar(radius * 0.86);
                burst.ringMaterial.opacity = fade * (0.6 + burst.strength * 0.35);
                burst.sparks.material.opacity = fade;
                burst.sparks.material.size = 0.08 + burst.strength * 0.08;
                burst.streaks.material.opacity = fade * 0.85;
                for (let index = 0; index < burst.directions.length; index++) {
                    const direction = burst.directions[index];
                    const distance = radius * (0.65 + (index % 5) * 0.09);
                    burst.positions[index * 3] = direction.x * distance;
                    burst.positions[index * 3 + 1] = direction.y * distance;
                    burst.positions[index * 3 + 2] = direction.z * distance;
                    const tail = distance - (0.08 + burst.strength * 0.16) * (1 - age);
                    direction.toArray(burst.trails, index * 6);
                    direction.toArray(burst.trails, index * 6 + 3);
                    for (let axis = 0; axis < 3; axis++) {
                        burst.trails[index * 6 + axis] *= tail;
                        burst.trails[index * 6 + 3 + axis] *= distance;
                    }
                }
                burst.sparks.geometry.attributes.position.needsUpdate = true;
                burst.streaks.geometry.attributes.position.needsUpdate = true;
                energy = Math.max(energy, fade * burst.strength);
            }
            return energy;
        },
        clear() {
            for (const burst of bursts) burst.group.visible = false;
            last = -10;
        },
        dispose() {
            for (const burst of bursts) {
                scene.remove(burst.group);
                burst.ringMaterial.dispose();
                burst.sparks.geometry.dispose();
                burst.sparks.material.dispose();
                burst.streaks.geometry.dispose();
                burst.streaks.material.dispose();
            }
            ringGeometry.dispose();
            texture.dispose();
        },
    };
}
