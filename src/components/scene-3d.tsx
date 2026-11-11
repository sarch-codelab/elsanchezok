"use client";

import { useEffect, useRef, useState } from "react";

export type SceneStatus = "idle" | "loading" | "live" | "static";

/**
 * Comprueba si el navegador puede crear un contexto WebGL antes de tocar
 * Three.js. Sin esta comprobación, la propia librería escribe un error en
 * consola y descarga su bundle para nada (navegadores con GPU desactivada).
 */
function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!context) return false;
    // Libera el contexto de prueba para no gastar uno de los limitados.
    (context as WebGLRenderingContext)
      .getExtension("WEBGL_lose_context")
      ?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Escultura 3D en blanco y negro: nudo toroidal + malla exterior + partículas.
 * Se carga con import() dinámico cuando la sección se acerca al viewport.
 */
export function Scene3D({
  onStatusChange,
}: {
  onStatusChange?: (status: SceneStatus) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let observer: IntersectionObserver | null = null;
    let startedOnce = false;

    const start = () => {
      if (startedOnce) return;
      startedOnce = true;
      setStarted(true);
      observer?.disconnect();
    };

    // Un documento oculto (pestaña en segundo plano, ventana minimizada) no
    // recibe callbacks del observer; al volver a verse comprobamos a mano.
    const checkVisible = () => {
      if (document.visibilityState !== "visible") return;
      const rect = element.getBoundingClientRect();
      const margin = 300;
      if (rect.top < window.innerHeight + margin && rect.bottom > -margin) {
        start();
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { rootMargin: "300px" },
    );

    observer.observe(element);
    document.addEventListener("visibilitychange", checkVisible);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", checkVisible);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let frame = 0;
    let dispose: (() => void) | undefined;

    // Si no hay WebGL, ni siquiera descargamos Three.js.
    if (!canUseWebGL()) {
      setFailed(true);
      return;
    }

    (async () => {
      const THREE = await import("three");
      if (cancelled || !container) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        setFailed(true);
        return;
      }

      const canvas = renderer.domElement;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.touchAction = "pan-y";
      canvas.style.cursor = "grab";
      canvas.setAttribute("aria-hidden", "true");
      container.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
      camera.position.set(0, 0, 6.4);

      const group = new THREE.Group();
      scene.add(group);

      const knotGeometry = new THREE.TorusKnotGeometry(1.32, 0.4, 200, 28, 2, 3);
      const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x0b0b0b });
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xf1efea,
        wireframe: true,
        transparent: true,
        opacity: 0.42,
      });

      const core = new THREE.Mesh(knotGeometry, coreMaterial);
      const wire = new THREE.Mesh(knotGeometry, wireMaterial);
      wire.scale.setScalar(1.008);
      group.add(core, wire);

      const shellGeometry = new THREE.IcosahedronGeometry(2.5, 1);
      const shellMaterial = new THREE.MeshBasicMaterial({
        color: 0xf1efea,
        wireframe: true,
        transparent: true,
        opacity: 0.09,
      });
      const shell = new THREE.Mesh(shellGeometry, shellMaterial);
      group.add(shell);

      const starCount = 220;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i += 1) {
        const radius = 3.1 + Math.random() * 0.9;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.cos(phi);
        positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      }
      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const starMaterial = new THREE.PointsMaterial({
        color: 0xf1efea,
        size: 0.032,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
      });
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // Estado de interacción
      let baseRotation = 0;
      let dragX = 0;
      let dragY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let tiltX = 0;
      let tiltY = 0;
      let targetTiltX = 0;
      let targetTiltY = 0;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let visible = true;

      const resize = () => {
        const width = container.clientWidth || 1;
        const height = container.clientHeight || 1;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      resize();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        targetTiltX = (event.clientY - rect.top) / rect.height - 0.5;
        targetTiltY = (event.clientX - rect.left) / rect.width - 0.5;

        if (!dragging) return;

        const deltaX = event.clientX - lastX;
        const deltaY = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;

        dragY += deltaX * 0.006;
        dragX += deltaY * 0.006;
        velocityY = deltaX * 0.006;
        velocityX = deltaY * 0.006;
      };

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        velocityX = 0;
        velocityY = 0;
        canvas.style.cursor = "grabbing";
        canvas.setPointerCapture?.(event.pointerId);
      };

      const onPointerUp = (event: PointerEvent) => {
        dragging = false;
        canvas.style.cursor = "grab";
        canvas.releasePointerCapture?.(event.pointerId);
      };

      const onPointerLeave = () => {
        if (dragging) return;
        targetTiltX = 0;
        targetTiltY = 0;
      };

      // Si el sistema retira el contexto (GPU reiniciada, pestaña en segundo
      // plano mucho tiempo…), pasamos al modo estático sin dejar el hueco.
      const onContextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(frame);
        setFailed(true);
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("webglcontextlost", onContextLost);

      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        },
        { rootMargin: "120px" },
      );
      visibilityObserver.observe(container);

      let firstFrame = true;

      const render = () => {
        frame = requestAnimationFrame(render);
        if (!visible || document.hidden) return;

        baseRotation += 0.0022;
        tiltX += (targetTiltX - tiltX) * 0.05;
        tiltY += (targetTiltY - tiltY) * 0.05;

        velocityX *= 0.92;
        velocityY *= 0.92;
        if (!dragging) {
          dragX += velocityX;
          dragY += velocityY;
        }

        group.rotation.x = dragX + tiltX * 0.45;
        group.rotation.y = baseRotation + dragY + tiltY * 0.65;
        group.rotation.z = tiltY * 0.08;
        group.position.y = Math.sin(baseRotation * 5) * 0.05;

        shell.rotation.y = -baseRotation * 0.55;
        shell.rotation.x = baseRotation * 0.25;
        stars.rotation.y = baseRotation * 0.12;

        renderer.render(scene, camera);

        if (firstFrame) {
          firstFrame = false;
          setReady(true);
        }
      };

      render();

      dispose = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("webglcontextlost", onContextLost);

        knotGeometry.dispose();
        shellGeometry.dispose();
        starGeometry.dispose();
        coreMaterial.dispose();
        wireMaterial.dispose();
        shellMaterial.dispose();
        starMaterial.dispose();
        renderer.dispose();
        canvas.remove();
      };

      if (cancelled) dispose();
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [started]);

  useEffect(() => {
    if (!onStatusChange) return;
    onStatusChange(failed ? "static" : ready ? "live" : "loading");
  }, [failed, ready, onStatusChange]);

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label={
        failed
          ? "Escultura en malla de alambre: vista estática del nudo toroidal"
          : "Escultura 3D interactiva: nudo toroidal de alambre girando en tiempo real"
      }
    >
      <div ref={containerRef} className="absolute inset-0" />

      {!ready && !failed && (
        // Mientras llega Three.js el marco ya muestra la malla en carga, así
        // no queda un hueco negro con un texto suelto.
        <div className="absolute inset-0 animate-pulse opacity-45">
          <StaticSculpture label="Cargando objeto…" />
        </div>
      )}

      {failed && (
        <StaticSculpture label="Vista estática — este navegador no expone WebGL" />
      )}
    </div>
  );
}

/** Meridianos y paralelos de una esfera: la vista dibujada del objeto. */
const meridians = [92, 85, 65, 35, 0];
const parallels = [-66, -44, -22, 0, 22, 44, 66];

function StaticSculpture({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 240 240"
          aria-hidden
          className="w-[78%] max-w-[430px] text-[#f1efea]"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.55"
          >
            <circle cx="120" cy="120" r="92" opacity="0.8" />
            {parallels.map((y) => {
              const rx = Math.sqrt(92 * 92 - y * y);
              return (
                <ellipse
                  key={`p${y}`}
                  cx="120"
                  cy={120 + y}
                  rx={rx}
                  ry={rx * 0.19}
                  opacity={0.55}
                />
              );
            })}
            {meridians.map((rx) => (
              <ellipse
                key={`m${rx}`}
                cx="120"
                cy="120"
                rx={rx}
                ry="92"
                opacity="0.45"
              />
            ))}
          </g>

          <g fill="currentColor" opacity="0.7">
            <circle cx="120" cy="28" r="1.4" />
            <circle cx="186" cy="72" r="1" />
            <circle cx="54" cy="72" r="1" />
            <circle cx="203" cy="152" r="1.2" />
            <circle cx="37" cy="152" r="1" />
            <circle cx="150" cy="205" r="1" />
            <circle cx="90" cy="205" r="1.1" />
            <circle cx="120" cy="120" r="2" opacity="0.5" />
          </g>
        </svg>
      </div>

      {label && (
        <p className="meta absolute inset-x-0 bottom-4 px-6 text-center text-white/40">
          {label}
        </p>
      )}
    </div>
  );
}
