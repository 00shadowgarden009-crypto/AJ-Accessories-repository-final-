"use client";

import { useCallback, useRef } from "react";

export default function HeroVisual() {
  const scene = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const move = useCallback((clientX: number, clientY: number) => {
    const element = scene.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = (clientX - bounds.left) / bounds.width - 0.5;
    const y = (clientY - bounds.top) / bounds.height - 0.5;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--pointer-x", `${x}`);
      element.style.setProperty("--pointer-y", `${y}`);
    });
  }, []);

  const reset = useCallback(() => {
    const element = scene.current;
    if (!element) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--pointer-x", "0");
      element.style.setProperty("--pointer-y", "0");
    });
  }, []);

  return (
    <div
      className="hero-visual"
      ref={scene}
      onPointerMove={(event) => move(event.clientX, event.clientY)}
      onPointerLeave={reset}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") move(event.clientX, event.clientY);
      }}
      onPointerUp={reset}
      role="img"
      aria-label="Interactive product composition with a smartphone, wireless earbuds and smartwatch"
    >
      <div className="visual-grid" />
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-glow glow-red" />
      <div className="visual-glow glow-gold" />
      <div className="visual-label label-top"><span>AJ / OBJECT 001</span><span>ENGINEERED FOR EVERY DAY</span></div>
      <div className="product-device" aria-hidden="true">
        <div className="device-side" />
        <div className="device-frame">
          <div className="device-screen"><div className="screen-light" /><span>AJ</span><small>MOVE DIFFERENT</small></div>
          <div className="device-camera camera-one" /><div className="device-camera camera-two" /><div className="device-camera camera-three" />
        </div>
      </div>
      <div className="earbud-case" aria-hidden="true"><div className="case-lid" /><div className="case-light" /><span>AJ</span></div>
      <div className="earbud earbud-left" aria-hidden="true"><i /></div>
      <div className="earbud earbud-right" aria-hidden="true"><i /></div>
      <div className="watch-face" aria-hidden="true"><div className="watch-band" /><div className="watch-screen"><span>09</span><small>41</small><i /></div></div>
      <div className="visual-label label-bottom"><span>01 — FORM MEETS FUNCTION</span><span>DESIGNED TO MOVE</span></div>
      <div className="visual-crosshair crosshair-one" /><div className="visual-crosshair crosshair-two" />
    </div>
  );
}
