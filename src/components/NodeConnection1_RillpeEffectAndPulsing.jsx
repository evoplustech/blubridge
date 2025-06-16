import React, { useRef, useEffect } from 'react';

const NodeConnections1 = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const PARTICLE_COUNT = 160;
  const HOVER_RADIUS = 100;
  const NEIGHBOR_COUNT = 4;
  const BASE_OPACITY = 0.08;
  const HOVER_OPACITY = 0.5;
  const OPACITY_LERP_SPEED = 0.12;

  const seededRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const seed = width * height;

    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)));
    const rows = Math.ceil(PARTICLE_COUNT / cols);
    const gridSpacingX = width / cols;
    const gridSpacingY = height / rows;

    let idx = 0;
    points.current = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => {
        if (idx++ >= PARTICLE_COUNT) return null;
        const x = col * gridSpacingX + seededRandom(seed + idx * 13) * gridSpacingX;
        const y = row * gridSpacingY + seededRandom(seed + idx * 73) * gridSpacingY;
        return {
          x,
          y,
          originalX: x,
          originalY: y,
          offsetX: 0,
          offsetY: 0,
          waveOffset: Math.random() * Math.PI * 2,
          pulsePhase: Math.random() * Math.PI * 2, // For unique pulse timing
        };
      })
    ).flat().filter(Boolean);

    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const opacityMap = new Map();

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pointer = mousePos.current;

      points.current.forEach((point) => {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = (dist / 30 - time * 0.002 + point.waveOffset) % (2 * Math.PI);
        const wave = Math.sin(angle) * Math.exp(-dist / 300) * 5;

        point.x = point.originalX + wave;
        point.y = point.originalY + wave;
      });

      points.current.forEach((point, idx) => {
        const neighbors = points.current
          .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
          .filter((n) => n.index !== idx)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, NEIGHBOR_COUNT);

        neighbors.forEach(({ index }) => {
          const neighbor = points.current[index];
          const key = `${Math.min(idx, index)}-${Math.max(idx, index)}`;
          let targetOpacity = BASE_OPACITY;

          const dist = getDistance(mousePos.current, {
            x: (point.x + neighbor.x) / 2,
            y: (point.y + neighbor.y) / 2,
          });

          if (dist < HOVER_RADIUS) {
            targetOpacity = HOVER_OPACITY;
          }

          const prev = opacityMap.get(key) ?? BASE_OPACITY;
          const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
          opacityMap.set(key, next);

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.strokeStyle = `rgba(128, 128, 128, ${next.toFixed(4)})`; // Dull grey line
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw pulsing node dots
      points.current.forEach((point) => {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let radius = 2;
        if (dist < HOVER_RADIUS) {
          radius += Math.sin((time / 150) + point.pulsePhase) * 1.2 + 1.5;
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(90, 100, 115, 0.5)'; // Slightly darker dots
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};

export default NodeConnections1;
