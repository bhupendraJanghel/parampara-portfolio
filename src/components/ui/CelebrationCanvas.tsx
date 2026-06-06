"use client";

import { useEffect, useRef, useState } from "react";
import BalloonBackground from "./BalloonBackground";

interface ConfettiParticle {
  type: "confetti";
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  w: number;
  h: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface Spark {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  vx: number;
  vy: number;
  color: string;
  isCore: boolean;
  size: number;
  opacity: number;
  gravity: number;
  fadeSpeed: number;
}

interface FireworkRocket {
  type: "firework";
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  state: "launch" | "exploded";
  sparks: Spark[];
  delay: number;
  trail: Array<{ x: number; y: number }>;
}

type Particle = ConfettiParticle | FireworkRocket;

const COLORS = [
  "#caa56c", // Gold
  "#e6c787", // Light gold
  "#fbf8f1", // Cream
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#10b981", // Green
  "#f59e0b", // Yellow
  "#ec4899", // Pink
  "#8b5cf6", // Purple
];

export default function CelebrationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animatingRef = useRef(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateAndRender = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animatingRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === "confetti") {
          // Gentler physics for floating sway
          p.x += p.vx + Math.sin(p.rotation) * 0.6;
          p.y += p.vy;
          // Apply minimal gravity capped at a slow terminal velocity
          p.vy = Math.min(p.vy + 0.01, 2.0);
          p.vx *= 0.99; // Minimal friction to allow horizontal drift
          p.rotation += p.rotationSpeed;
          // Slow fade out to allow full screen journey
          p.opacity -= 0.002;

          if (p.y > canvas.height || p.opacity <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
        else if (p.type === "firework") {
          if (p.delay > 0) {
            p.delay--;
            continue;
          }

          if (p.state === "launch") {
            // Store previous position for trail
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > 12) {
              p.trail.shift();
            }

            p.x += p.vx;
            p.y += p.vy;

            // Decelerate rocket upward (gravity + air drag)
            p.vy += 0.15; // Gravity pull (positive down)
            p.vx *= 0.985;
            p.vy *= 0.985;

            // Draw rocket trail (glowing, tapering dots)
            if (p.trail.length > 1) {
              ctx.save();
              for (let t = 0; t < p.trail.length; t++) {
                const pt = p.trail[t];
                const opacity = (t / p.trail.length) * 0.6;
                const size = (t / p.trail.length) * 2.2;

                // Jitter to simulate sputtering embers
                const jitterX = (Math.random() - 0.5) * 3;
                const jitterY = (Math.random() - 0.5) * 3;

                ctx.beginPath();
                ctx.arc(pt.x + jitterX, pt.y + jitterY, size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = opacity * (Math.random() * 0.4 + 0.6);
                ctx.fill();
              }
              ctx.restore();
            }

            // Draw glowing rocket head (magnesium spark effect)
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.3;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = 1.0;
            ctx.fill();

            // Explode at peak of trajectory (when y velocity changes from going up to going down)
            if (p.vy >= -0.3) {
              p.state = "exploded";
              // Staggered size sphere explosion
              const numSparks = 80 + Math.floor(Math.random() * 40);
              for (let k = 0; k < numSparks; k++) {
                const angle = Math.random() * Math.PI * 2;
                // Layered explosion speeds for nice round shell shape
                const speed = (Math.random() * 0.7 + 0.3) * (Math.random() * 6 + 2);
                const isCore = Math.random() < 0.25; // 25% magnesium cores
                p.sparks.push({
                  x: p.x,
                  y: p.y,
                  lastX: p.x,
                  lastY: p.y,
                  vx: Math.cos(angle) * speed,
                  vy: Math.sin(angle) * speed,
                  color: p.color,
                  isCore: isCore,
                  size: Math.random() * 2 + 1.2,
                  opacity: 1.0,
                  gravity: 0.05 + Math.random() * 0.03,
                  fadeSpeed: 0.008 + Math.random() * 0.008,
                });
              }
            }
          } else {
            let aliveSparks = false;
            ctx.save();

            for (let j = 0; j < p.sparks.length; j++) {
              const s = p.sparks[j];
              if (s.opacity > 0) {
                s.lastX = s.x;
                s.lastY = s.y;

                s.x += s.vx;
                s.y += s.vy;
                s.vy += s.gravity;
                s.vx *= 0.95; // Air drag
                s.vy *= 0.95;
                s.opacity -= s.fadeSpeed;

                if (s.opacity > 0) {
                  ctx.beginPath();
                  ctx.moveTo(s.lastX, s.lastY);
                  ctx.lineTo(s.x, s.y);

                  let sparkColor = s.color;
                  if (s.isCore && s.opacity > 0.6) {
                    sparkColor = "#ffffff";
                  } else if (s.isCore && s.opacity > 0.4) {
                    sparkColor = "#fffbeb";
                  }

                  ctx.strokeStyle = sparkColor;
                  ctx.lineWidth = s.size;
                  ctx.lineCap = "round";

                  // Twinkle shimmer effect
                  const twinkle = Math.random() * 0.3 + 0.7;
                  ctx.globalAlpha = Math.max(0, s.opacity * twinkle);
                  ctx.stroke();

                  aliveSparks = true;
                }
              }
            }
            ctx.restore();

            if (!aliveSparks) {
              particles.splice(i, 1);
              continue;
            }
          }
        }
      }

      if (particles.length === 0) {
        animatingRef.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        requestAnimationFrame(updateAndRender);
      }
    };

    const trigger = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = particlesRef.current;

      // 1. Confetti (rain falling from top)
      for (let i = 0; i < 150; i++) {
        particles.push({
          type: "confetti",
          x: Math.random() * canvas.width,
          y: -Math.random() * (canvas.height * 0.6) - 20,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 1.5 + 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          w: Math.random() * 6 + 5,
          h: Math.random() * 10 + 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: Math.random() * 0.08 - 0.04,
          opacity: 1,
        });
      }

      // 2. Fireworks (realistic launch)
      const numFireworks = 6 + Math.floor(Math.random() * 4); // 6 to 9 fireworks
      for (let i = 0; i < numFireworks; i++) {
        const delay = Math.floor(Math.random() * 110); // staggered delay: 0 to 110 frames
        const vx = Math.random() * 4 - 2; // slight horizontal velocity
        const vy = -(Math.random() * 5 + 13); // initial velocity: -13 to -18 (shoots up fast)

        particles.push({
          type: "firework",
          x: canvas.width * 0.15 + Math.random() * (canvas.width * 0.7),
          y: canvas.height + 15,
          vx: vx,
          vy: vy,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          state: "launch",
          sparks: [],
          delay: delay,
          trail: [],
        });
      }

      // 3. Trigger 3D Balloons
      setShowBalloons(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowBalloons(false);
      }, 7500);

      if (!animatingRef.current) {
        animatingRef.current = true;
        requestAnimationFrame(updateAndRender);
      }
    };

    if (typeof window !== "undefined") {
      window.triggerCelebration = trigger;
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (typeof window !== "undefined") {
        delete window.triggerCelebration;
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 999999,
        }}
      />
      {showBalloons && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999998 }}>
          <BalloonBackground
            count={15}
            risingSpeed={0.3}
            maxVelocity={0.2}
            minSize={0.5}
            maxSize={1.1}
            followCursor={false}
            startDelay={0}
          />
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    triggerCelebration?: () => void;
  }
}
