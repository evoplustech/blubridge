import React, { useRef, useEffect } from 'react';

const NodeConnections2 = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const PARTICLE_COUNT = 100;
  const MIN_DISTANCE = 50;

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

    const tempPoints = [];
    let i = 0;
    while (tempPoints.length < PARTICLE_COUNT && i < PARTICLE_COUNT * 10) {
      const x = seededRandom(seed + i * 13) * width;
      const y = seededRandom(seed + i * 73) * height;
      const isFar = tempPoints.every(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) > MIN_DISTANCE;
      });
      if (isFar) {
        tempPoints.push({
          baseX: x,
          baseY: y,
          angle: Math.random() * Math.PI * 2,
          radius: 1 + Math.random() * 1.5,
          speed: 0.001 + Math.random() * 0.002,
          offset: Math.random() * 1000,
          x,
          y,
          connections: []
        });
      }
      i++;
    }

    points.current = tempPoints;

    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const generateConnections = () => {
      points.current.forEach((p1, i) => {
        const neighbors = points.current
          .map((p2, j) => ({ p: p2, d: getDistance(p1, p2), i: j }))
          .filter(({ i: j }) => j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
          .map(({ p }) => p);

        p1.connections = neighbors;
      });
    };

    const drawTriangle = (p1, p2, p3, hover = false) => {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.strokeStyle = hover
        ? 'rgba(100,100,100,0.5)'
        : 'rgba(100,100,100,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const updatePositions = (time) => {
      points.current.forEach(p => {
        const t = time * p.speed + p.offset;
        const prevX = p.x;
        const prevY = p.y;
        p.x = p.baseX + Math.cos(t) * p.radius;
        p.y = p.baseY + Math.sin(t) * p.radius;
        p.prevX = prevX;
        p.prevY = prevY;
      });
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      updatePositions(time);
      generateConnections();

      for (let i = 0; i < points.current.length; i++) {
        const p1 = points.current[i];
        const [p2, p3] = p1.connections;
        if (p2 && p3) {
          drawTriangle(p1, p2, p3);
        }
      }

      const virtual = { x: mousePos.current.x, y: mousePos.current.y };
      const nearest = points.current
        .map((p) => ({ p, d: getDistance(p, virtual) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .map(({ p }) => p);

      if (nearest.length === 2) {
        drawTriangle(virtual, nearest[0], nearest[1], true);
        ctx.beginPath();
        ctx.arc(virtual.x, virtual.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
        ctx.fill();
      }

      points.current.forEach(({ x, y }) => {
        const dist = getDistance({ x, y }, mousePos.current);
        const highlight = dist < 100;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = highlight ? 'rgba(60, 60, 60, 0.85)' : 'rgba(80, 80, 80, 0.4)';
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
        backgroundColor: 'transparent'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default NodeConnections2;
