import React, { useRef, useEffect } from 'react';

const NodeConnections1 = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const PARTICLE_COUNT = 160;
  const BASE_OPACITY = 0.05;
  const HOVER_OPACITY = 0.6;

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

    points.current = [];
    while (points.current.length < PARTICLE_COUNT) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const vx = (Math.random() - 0.5) * 0.05;
      const vy = (Math.random() - 0.5) * 0.05;

      let tooClose = false;
      for (const p of points.current) {
        const dx = p.x - x;
        const dy = p.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) {
        points.current.push({ x, y, baseX: x, baseY: y, vx, vy });
      }
    }

    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      points.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.x - p.baseX) > 10) p.vx *= -1;
        if (Math.abs(p.y - p.baseY) > 10) p.vy *= -1;
      });

      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        const neighbors = points.current
          .map((other, j) => ({ point: other, dist: getDistance(p, other), index: j }))
          .filter((_, j) => j !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 2);

        neighbors.forEach(({ point: np }) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(np.x, np.y);
          ctx.strokeStyle = `rgba(100, 100, 100, ${BASE_OPACITY})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      const hoverPoint = mousePos.current;
      const nearby = points.current
        .map((p) => ({ p, d: getDistance(p, hoverPoint) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);

      // Draw hover node
      ctx.beginPath();
      ctx.arc(hoverPoint.x, hoverPoint.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(60, 60, 60, 0.6)';
      ctx.fill();

      nearby.forEach(({ p }) => {
        ctx.beginPath();
        ctx.moveTo(hoverPoint.x, hoverPoint.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(60, 60, 60, ${HOVER_OPACITY})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      if (nearby.length === 2) {
        ctx.beginPath();
        ctx.moveTo(nearby[0].p.x, nearby[0].p.y);
        ctx.lineTo(nearby[1].p.x, nearby[1].p.y);
        ctx.lineTo(hoverPoint.x, hoverPoint.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(60, 60, 60, ${HOVER_OPACITY})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      points.current.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 2.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(110, 112, 130, 0.35)';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

export default NodeConnections1;
