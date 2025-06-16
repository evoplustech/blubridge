import React, { useRef, useEffect } from 'react';

const NodeConnections1 = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const PARTICLE_COUNT = 160;
  const HOVER_RADIUS = 90;
  const NEIGHBOR_COUNT = 4;
  const BASE_OPACITY = 0.06;
  const HOVER_OPACITY = 0.55;
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
          angle: seededRandom(seed + idx * 59) * Math.PI * 2,
          speed: 0.02 + seededRandom(seed + idx * 97) * 0.03,
          // amplitude: 2 + seededRandom(seed + idx * 31) * 2,
          amplitude: 0.8 + seededRandom(seed + idx * 31) * 1.2,

        };
      })
    )
      .flat()
      .filter(Boolean);

    const getDistance = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getDistanceToSegment = (px, py, x1, y1, x2, y2) => {
      const A = px - x1;
      const B = py - y1;
      const C = x2 - x1;
      const D = y2 - y1;
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = lenSq !== 0 ? dot / lenSq : -1;
      if (param < 0) param = 0;
      else if (param > 1) param = 1;
      const xx = x1 + param * C;
      const yy = y1 + param * D;
      const dx = px - xx;
      const dy = py - yy;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const opacityMap = new Map();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointer = mousePos.current;

      points.current.forEach((point) => {
        point.angle += point.speed;
        point.offsetX = Math.cos(point.angle) * point.amplitude;
        point.offsetY = Math.sin(point.angle) * point.amplitude;

        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.exp(-dist / 100) * 2;

        const targetX = point.originalX + point.offsetX;
        const targetY = point.originalY + point.offsetY;

        // point.x += (targetX - point.x) * 0.05 + dx * 0.0005 * force;
        // point.y += (targetY - point.y) * 0.05 + dy * 0.0005 * force;
        point.x += (targetX - point.x) * 0.12 + dx * 0.0007 * force;
        point.y += (targetY - point.y) * 0.12 + dy * 0.0007 * force;

      });

      // Regular neighbor lines
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

          const dist = getDistanceToSegment(
            pointer.x,
            pointer.y,
            point.x,
            point.y,
            neighbor.x,
            neighbor.y
          );

          if (dist < HOVER_RADIUS) {
            targetOpacity = HOVER_OPACITY;
          }

          const prev = opacityMap.get(key) ?? BASE_OPACITY;
          const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
          opacityMap.set(key, next);

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.strokeStyle = `rgba(162, 166, 171, ${next.toFixed(5)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // 🔄 Virtual node with gradient lines
      // 🔺 Virtual node forms triangle with 3 nearest points
        const virtualNode = { x: pointer.x, y: pointer.y };
        const nearest = points.current
        .map((p) => ({
            point: p,
            distance: getDistance(p, virtualNode),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

        // if (nearest.length === 1) {
        // // Connect mouse to all 3 points
        // nearest.forEach(({ point }) => {
        //     const grad = ctx.createLinearGradient(
        //     virtualNode.x,
        //     virtualNode.y,
        //     point.x,
        //     point.y
        //     );
        //     grad.addColorStop(0, 'rgba(169, 169, 169, 0.2)');
        //     grad.addColorStop(1, 'rgba(169, 169, 169, 0.2)');

        //     ctx.beginPath();
        //     ctx.moveTo(virtualNode.x, virtualNode.y);
        //     ctx.lineTo(point.x, point.y);
        //     ctx.strokeStyle = grad;
        //     ctx.lineWidth = 1.4;
        //     ctx.stroke();
        // });

        // // Connect 3 points to each other (triangle edges)
        // for (let i = 0; i < 3; i++) {
        //     for (let j = i + 1; j < 3; j++) {
        //     const p1 = nearest[i].point;
        //     const p2 = nearest[j].point;
        //     const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        //     grad.addColorStop(0, 'rgba(148, 163, 184, 0.2)');
        //     grad.addColorStop(1, 'rgba(55, 65, 81, 0.6)');

        //     ctx.beginPath();
        //     ctx.moveTo(p1.x, p1.y);
        //     ctx.lineTo(p2.x, p2.y);
        //     ctx.strokeStyle = grad;
        //     ctx.lineWidth = 1;
        //     ctx.stroke();
        //     }
        // }
        // }

        if (nearest.length >= 1) {
          nearest.forEach(({ point }) => {
            const grad = ctx.createLinearGradient(
              virtualNode.x,
              virtualNode.y,
              point.x,
              point.y
            );
            grad.addColorStop(0, 'rgba(55, 65, 81, 0.9)');
            grad.addColorStop(1, 'rgba(148, 163, 184, 0.2)');

            ctx.beginPath();
            ctx.moveTo(virtualNode.x, virtualNode.y);
            ctx.lineTo(point.x, point.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          });
        }


      nearest.forEach(({ point }) => {
        const grad = ctx.createLinearGradient(
          virtualNode.x,
          virtualNode.y,
          point.x,
          point.y
        );

        grad.addColorStop(0, 'rgba(55, 65, 81, 0.9)'); // near cursor
        grad.addColorStop(1, 'rgba(148, 163, 184, 0.2)'); // far end

        ctx.beginPath();
        ctx.moveTo(virtualNode.x, virtualNode.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // Optional: dot at mouse
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(71, 85, 105, 0.6)';
      ctx.fill();

      // Node circles
      points.current.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138, 139, 160, 0.2)';
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
        }}
      />
    </div>
  );
};

export default NodeConnections1;
