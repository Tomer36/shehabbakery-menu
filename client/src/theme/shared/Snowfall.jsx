import { useEffect, useRef } from 'react';

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * Snow presets. Each layer: share of the total flakes, radius / speed / opacity ranges,
 * chance of being a 6-armed crystal, and an optional canvas blur for depth of field.
 */
const VARIANTS = {
  // Three depths: faint distant specks, mid flakes, a few large soft-focus ones up close.
  depth: {
    count: (w) => (w < 600 ? 55 : w < 1200 ? 85 : 110),
    layers: [
      { share: 0.55, r: [0.7, 1.5], crystal: 0,    speed: [10, 20], alpha: [0.35, 0.6], blur: 0 },
      { share: 0.35, r: [1.8, 3], crystalR: [4.5, 7], crystal: 0.25, speed: [22, 38], alpha: [0.75, 1], blur: 0 },
      { share: 0.10, r: [3.5, 6],   crystal: 0,    speed: [45, 70], alpha: [0.35, 0.55], blur: 2.5 },
    ],
  },
};

function drawCrystal(ctx, f) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.angle);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -f.r);
    ctx.moveTo(0, -f.r * 0.55);
    ctx.lineTo(f.r * 0.28, -f.r * 0.8);
    ctx.moveTo(0, -f.r * 0.55);
    ctx.lineTo(-f.r * 0.28, -f.r * 0.8);
  }
  ctx.stroke();
  ctx.restore();
}

export default function Snowfall({ variant = 'depth' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const preset = VARIANTS[variant] ?? VARIANTS.depth;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, raf = 0, last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const makeFlake = (layer, y) => {
      const crystal = Math.random() < layer.crystal;
      return {
        layer,
        crystal,
        x: Math.random() * w,
        y: y ?? Math.random() * h,
        r: crystal ? rand(...layer.crystalR) : rand(...layer.r),
        speed: rand(...layer.speed),
        drift: Math.random() * Math.PI * 2,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 1.2,
        opacity: rand(...layer.alpha),
      };
    };

    const total = preset.count(w);
    // Grouped by layer so blur/shadow are set once per layer, far layers drawn first.
    const layers = preset.layers.map(layer => ({
      layer,
      flakes: Array.from({ length: Math.round(total * layer.share) }, () => makeFlake(layer)),
    }));

    const tick = (t) => {
      const dt = Math.min((t - last) / 1000 || 0, 0.05);
      last = t;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';

      for (const { layer, flakes } of layers) {
        ctx.filter = layer.blur ? `blur(${layer.blur}px)` : 'none';
        // Soft blue-grey halo so white flakes still read on the light page.
        ctx.shadowColor = 'rgba(90, 110, 140, 0.45)';
        ctx.shadowBlur = layer.blur ? 0 : 3;

        for (const f of flakes) {
          f.y += f.speed * dt;
          f.drift += dt;
          f.angle += f.spin * dt;
          f.x += Math.sin(f.drift) * 15 * dt;
          if (f.y > h + 12) Object.assign(f, makeFlake(layer, -12));
          ctx.globalAlpha = f.opacity;
          if (f.crystal) {
            drawCrystal(ctx, f);
          } else {
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      raf = requestAnimationFrame(tick);
    };

    const start = () => { last = performance.now(); raf = requestAnimationFrame(tick); };
    const stop = () => cancelAnimationFrame(raf);
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="theme-snow" aria-hidden="true" />;
}
