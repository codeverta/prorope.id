"use client";

import { CSSProperties, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";

type Motion = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tailX: number;
  tailY: number;
  tailVx: number;
  tailVy: number;
  endX: number;
  endY: number;
  endVx: number;
  endVy: number;
};

const still: Motion = {
  x: 0, y: 0, vx: 0, vy: 0,
  tailX: 0, tailY: 0, tailVx: 0, tailVy: 0,
  endX: 0, endY: 0, endVx: 0, endVy: 0,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HeroRope() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, ropeX: 0, ropeY: 0 });
  const motionRef = useRef<Motion>({ ...still });
  const [motion, setMotion] = useState<Motion>(still);
  const [dragging, setDragging] = useState(false);

  const animate = () => {
    const next = motionRef.current;
    const target = targetRef.current;

    next.vx = (next.vx + (target.x - next.x) * 0.14) * 0.74;
    next.vy = (next.vy + (target.y - next.y) * 0.14) * 0.74;
    next.x += next.vx;
    next.y += next.vy;

    const tailTargetX = next.x * 0.58;
    const tailTargetY = next.y * 0.64;
    next.tailVx = (next.tailVx + (tailTargetX - next.tailX) * 0.085) * 0.8;
    next.tailVy = (next.tailVy + (tailTargetY - next.tailY) * 0.085) * 0.8;
    next.tailX += next.tailVx;
    next.tailY += next.tailVy;

    const endTargetX = next.tailX * 0.42;
    const endTargetY = next.tailY * 0.48;
    next.endVx = (next.endVx + (endTargetX - next.endX) * 0.055) * 0.83;
    next.endVy = (next.endVy + (endTargetY - next.endY) * 0.055) * 0.83;
    next.endX += next.endVx;
    next.endY += next.endVy;

    setMotion({ ...next });

    const energy = Math.abs(next.x) + Math.abs(next.y) + Math.abs(next.vx) + Math.abs(next.vy)
      + Math.abs(next.tailX) + Math.abs(next.tailY) + Math.abs(next.tailVx) + Math.abs(next.tailVy)
      + Math.abs(next.endX) + Math.abs(next.endY) + Math.abs(next.endVx) + Math.abs(next.endVy);

    if (draggingRef.current || energy > 0.35) frameRef.current = requestAnimationFrame(animate);
    else {
      motionRef.current = { ...still };
      setMotion(still);
      frameRef.current = null;
    }
  };

  const startAnimation = () => {
    if (frameRef.current === null && !reduceMotionRef.current) frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      reduceMotionRef.current = media.matches;
      if (media.matches && frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => {
      media.removeEventListener("change", syncPreference);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setDragging(true);
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      ropeX: targetRef.current.x,
      ropeY: targetRef.current.y,
    };
    startAnimation();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (!draggingRef.current) return;
    event.preventDefault();
    const start = dragStartRef.current;
    const maxX = Math.min(140, window.innerWidth * 0.28);
    const x = clamp(start.ropeX + event.clientX - start.pointerX, -maxX, maxX);
    const y = clamp(start.ropeY + event.clientY - start.pointerY, -190, 220);
    targetRef.current = { x, y };

    if (reduceMotionRef.current) {
      const direct = {
        ...still,
        x,
        y,
        tailX: x * 0.58,
        tailY: y * 0.64,
        endX: x * 0.24,
        endY: y * 0.31,
      };
      motionRef.current = direct;
      setMotion(direct);
    } else startAnimation();
  };

  const releaseRope = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (!draggingRef.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    draggingRef.current = false;
    setDragging(false);
    targetRef.current = { x: 0, y: 0 };

    if (reduceMotionRef.current) {
      motionRef.current = { ...still };
      setMotion(still);
    } else startAnimation();
  };

  const deviceX = motion.x;
  const deviceY = motion.y;
  const tailX = motion.tailX;
  const tailY = motion.tailY;
  const endX = motion.endX;
  const endY = motion.endY;
  const mainPath = `M23-10 C23 150 ${24 + deviceX * 0.12} 285 ${31 + deviceX} ${426 + deviceY} C${32 + tailX} ${595 + tailY * 0.35} ${30 + tailX} ${770 + tailY} ${27 + endX} ${1010 + endY}`;
  const backupPath = `M39-10 C39 155 ${40 + deviceX * 0.12} 290 ${45 + deviceX} ${426 + deviceY} C${46 + tailX} ${600 + tailY * 0.35} ${45 + tailX} ${775 + tailY} ${43 + endX} ${1010 + endY}`;
  const tilt = clamp(motion.vx * 0.8, -12, 12);
  const ropeStyle = {
    "--rope-x": `${motion.x}px`,
    "--rope-y": `${motion.y}px`,
    "--rope-tilt": `${4 + tilt}deg`,
  } as CSSProperties;

  return (
    <div className={`hero__rope${dragging ? " is-dragging" : ""}`} style={ropeStyle} ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 72 1000" preserveAspectRatio="none">
        <path className="hero__rope-shadow" d={mainPath} />
        <path className="hero__rope-main" d={mainPath} />
        <path className="hero__rope-backup" d={backupPath} />
      </svg>
      <span
        className="hero__rope-device"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releaseRope}
        onPointerCancel={releaseRope}
      ><i /><b /></span>
      <span className="hero__rope-label">DRAG • RELEASE</span>
    </div>
  );
}
