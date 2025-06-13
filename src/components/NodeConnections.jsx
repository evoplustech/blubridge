// NodeConnections
import React, { useRef, useEffect } from 'react';

const NodeConnections = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const PARTICLE_COUNT = 160;
  const HOVER_RADIUS = 90;
  const NEIGHBOR_COUNT = 5;
  const BASE_OPACITY = 0.08;
  const HOVER_OPACITY = 0.65;
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
          amplitude: 2 + seededRandom(seed + idx * 31) * 2,
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

        point.x += (targetX - point.x) * 0.05 + dx * 0.0005 * force;
        point.y += (targetY - point.y) * 0.05 + dy * 0.0005 * force;
      });

      // Lines between neighbors
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

      // ✅ Mouse-following lines to nearby points
      points.current.forEach((point) => {
        const dx = pointer.x - point.x;
        const dy = pointer.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < HOVER_RADIUS) {
          const strength = (HOVER_RADIUS - dist) / HOVER_RADIUS;
          const alpha = 0.6 + 0.4 * strength; // darker closer
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(100, 116, 139, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Dots
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

export default NodeConnections;




// Working One This is Fine start
// import React, { useRef, useEffect } from 'react';

// const NodeConnections = () => {
//   const canvasRef = useRef(null);
//   const points = useRef([]);
//   const mousePos = useRef({ x: 0, y: 0 });
//   const PARTICLE_COUNT = 300;
//   const HOVER_RADIUS = 100;
//   const NEIGHBOR_COUNT = 5;
//   const BASE_OPACITY = 0.08;
//   const HOVER_OPACITY = 0.6;
//   const OPACITY_LERP_SPEED = 0.12;

//   const seededRandom = (seed) => {
//     let x = Math.sin(seed++) * 10000;
//     return x - Math.floor(x);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = window.innerWidth * dpr;
//     canvas.height = window.innerHeight * dpr;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.scale(dpr, dpr);

//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const seed = width * height;

//     // Use grid layout to avoid empty gaps
//     const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (width / height)));
//     const rows = Math.ceil(PARTICLE_COUNT / cols);
//     const gridSpacingX = width / cols;
//     const gridSpacingY = height / rows;
//     let idx = 0;

//     points.current = Array.from({ length: rows }, (_, row) =>
//       Array.from({ length: cols }, (_, col) => {
//         if (idx++ >= PARTICLE_COUNT) return null;
//         const x = col * gridSpacingX + seededRandom(seed + idx * 13) * gridSpacingX;
//         const y = row * gridSpacingY + seededRandom(seed + idx * 73) * gridSpacingY;
//         return {
//           x,
//           y,
//           originalX: x,
//           originalY: y,
//         };
//       })
//     )
//       .flat()
//       .filter(Boolean);

//     const getDistance = (p1, p2) => {
//       const dx = p1.x - p2.x;
//       const dy = p1.y - p2.y;
//       return Math.sqrt(dx * dx + dy * dy);
//     };

//     const getDistanceToSegment = (px, py, x1, y1, x2, y2) => {
//       const A = px - x1;
//       const B = py - y1;
//       const C = x2 - x1;
//       const D = y2 - y1;
//       const dot = A * C + B * D;
//       const lenSq = C * C + D * D;
//       let param = lenSq !== 0 ? dot / lenSq : -1;
//       if (param < 0) param = 0;
//       else if (param > 1) param = 1;
//       const xx = x1 + param * C;
//       const yy = y1 + param * D;
//       const dx = px - xx;
//       const dy = py - yy;
//       return Math.sqrt(dx * dx + dy * dy);
//     };

//     const opacityMap = new Map();

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const pointer = mousePos.current;

//       points.current.forEach((point) => {
//         const dx = pointer.x - point.x;
//         const dy = pointer.y - point.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const force = Math.exp(-dist / 100) * 2;

//         point.x += (point.originalX - point.x) * 0.05 + dx * 0.0005 * force;
//         point.y += (point.originalY - point.y) * 0.05 + dy * 0.0005 * force;
//       });

//       points.current.forEach((point, idx) => {
//         const neighbors = points.current
//           .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
//           .filter((n) => n.index !== idx)
//           .sort((a, b) => a.distance - b.distance)
//           .slice(0, NEIGHBOR_COUNT);

//         neighbors.forEach(({ index }) => {
//           const neighbor = points.current[index];
//           const key = `${Math.min(idx, index)}-${Math.max(idx, index)}`;
//           let targetOpacity = BASE_OPACITY;

//           const dist = getDistanceToSegment(
//             pointer.x,
//             pointer.y,
//             point.x,
//             point.y,
//             neighbor.x,
//             neighbor.y
//           );

//           if (dist < HOVER_RADIUS) {
//             targetOpacity = HOVER_OPACITY;
//           }

//           const prev = opacityMap.get(key) ?? BASE_OPACITY;
//           const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
//           opacityMap.set(key, next);

//           ctx.beginPath();
//           ctx.moveTo(point.x, point.y);
//           ctx.lineTo(neighbor.x, neighbor.y);
//           ctx.strokeStyle = `rgba(100, 116, 139, ${next.toFixed(3)})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         });
//       });

//       points.current.forEach(({ x, y }) => {
//         ctx.beginPath();
//         ctx.arc(x, y, 3, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(138, 139, 160, 0.6)';
//         ctx.fill();
//       });

//       requestAnimationFrame(draw);
//     };

//     requestAnimationFrame(draw);

//     const handleMouseMove = (e) => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: -1,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           width: '100%',
//           height: '100%',
//           display: 'block',
//         }}
//       />
//     </div>
//   );
// };

// export default NodeConnections;

// Workign one fine END


// // NodeConnections.js
// import React, { useRef, useEffect } from 'react';

// const NodeConnections = () => {
//   const canvasRef = useRef(null);
//   const basePoints = useRef([]);
//   const opacityMap = useRef(new Map());
//   const mousePos = useRef({ x: 0, y: 0 });
//   const isHovering = useRef(false);

//   const PARTICLE_COUNT = 200;
//   const NEIGHBOR_COUNT = 5;
//   const BASE_OPACITY = 0.15;
//   const HOVER_OPACITY = 0.8;
//   const OPACITY_LERP_SPEED = 0.08;
//   const CURSOR_EFFECT_RADIUS = 150;
//   const CURSOR_PULL_STRENGTH = 0.1;

//   const seededRandom = (seed) => {
//     let x = Math.sin(seed++) * 10000;
//     return x - Math.floor(x);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = window.innerWidth * dpr;
//     canvas.height = window.innerHeight * dpr;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.scale(dpr, dpr);

//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const seed = width * height;

//     basePoints.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
//       return {
//         x: seededRandom(seed + i * 13) * width,
//         y: seededRandom(seed + i * 73) * height,
//         originX: 0,
//         originY: 0
//       };
//     }).map(p => ({ ...p, originX: p.x, originY: p.y }));

//     const getDistance = (p1, p2) => {
//       const dx = p1.x - p2.x;
//       const dy = p1.y - p2.y;
//       return Math.sqrt(dx * dx + dy * dy);
//     };

//     const getDistanceToSegment = (px, py, x1, y1, x2, y2) => {
//       const A = px - x1;
//       const B = py - y1;
//       const C = x2 - x1;
//       const D = y2 - y1;
//       const dot = A * C + B * D;
//       const lenSq = C * C + D * D;
//       let param = lenSq !== 0 ? dot / lenSq : -1;
//       if (param < 0) param = 0;
//       else if (param > 1) param = 1;
//       const xx = x1 + param * C;
//       const yy = y1 + param * D;
//       const dx = px - xx;
//       const dy = py - yy;
//       return Math.sqrt(dx * dx + dy * dy);
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const points = basePoints.current.map(p => {
//         const dx = mousePos.current.x - p.x;
//         const dy = mousePos.current.y - p.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         if (isHovering.current && dist < CURSOR_EFFECT_RADIUS) {
//           const force = (1 - dist / CURSOR_EFFECT_RADIUS) * CURSOR_PULL_STRENGTH;
//           p.x += dx * force;
//           p.y += dy * force;
//         } else {
//           // return to original position
//           p.x += (p.originX - p.x) * 0.02;
//           p.y += (p.originY - p.y) * 0.02;
//         }

//         return p;
//       });

//       points.forEach((point, idx) => {
//         const neighbors = points
//           .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
//           .filter(n => n.index !== idx)
//           .sort((a, b) => a.distance - b.distance)
//           .slice(0, NEIGHBOR_COUNT);

//         neighbors.forEach(({ index }) => {
//           const neighbor = points[index];
//           const key = `${idx}-${index}`;
//           let targetOpacity = BASE_OPACITY;

//           if (isHovering.current) {
//             const dist = getDistanceToSegment(
//               mousePos.current.x,
//               mousePos.current.y,
//               point.x,
//               point.y,
//               neighbor.x,
//               neighbor.y
//             );
//             if (dist < CURSOR_EFFECT_RADIUS) {
//               targetOpacity = HOVER_OPACITY;
//             }
//           }

//           const prev = opacityMap.current.get(key) ?? BASE_OPACITY;
//           const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
//           opacityMap.current.set(key, next);

//           ctx.beginPath();
//           ctx.moveTo(point.x, point.y);
//           ctx.lineTo(neighbor.x, neighbor.y);
//           ctx.strokeStyle = `rgba(180, 180, 180, ${next.toFixed(3)})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         });
//       });

//       points.forEach(p => {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(120, 120, 150, 0.7)';
//         ctx.fill();
//       });

//       requestAnimationFrame(draw);
//     };

//     requestAnimationFrame(draw);

//     const handleMouseMove = e => {
//       mousePos.current = { x: e.clientX, y: e.clientY };
//       isHovering.current = true;
//     };

//     const handleMouseLeave = () => {
//       isHovering.current = false;
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: -1,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           width: '100%',
//           height: '100%',
//           display: 'block',
//         }}
//       />
//     </div>
//   );
// };

// export default NodeConnections;
