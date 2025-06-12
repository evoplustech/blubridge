// Working fine one start
// import React, { useRef, useEffect } from 'react';
// import { Delaunay } from 'd3-delaunay';

// const NetworkCanvas = () => {
//   const canvasRef = useRef(null);
//   const points = useRef([]);
//   const triangles = useRef([]);
//   const mousePos = useRef({ x: 0, y: 0 });
//   const isHovering = useRef(false);

//   const PARTICLE_COUNT = 60;
//   const HOVER_RADIUS = 80;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const dpr = window.devicePixelRatio || 1;

//     // Set canvas size once
//     canvas.width = window.innerWidth * dpr;
//     canvas.height = window.innerHeight * dpr;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.scale(dpr, dpr);

//     // Generate points once
//     points.current = Array.from({ length: PARTICLE_COUNT }, () => [
//       Math.random() * window.innerWidth,
//       Math.random() * window.innerHeight,
//     ]);

//     const delaunay = Delaunay.from(points.current);
//     triangles.current = delaunay.triangles;

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

//       for (let i = 0; i < triangles.current.length; i += 3) {
//         const a = points.current[triangles.current[i]];
//         const b = points.current[triangles.current[i + 1]];
//         const c = points.current[triangles.current[i + 2]];

//         [[a, b], [b, c], [c, a]].forEach(([p1, p2]) => {
//           let opacity = 0.2;

//           if (isHovering.current) {
//             const dist = getDistanceToSegment(mousePos.current.x, mousePos.current.y, p1[0], p1[1], p2[0], p2[1]);
//             if (dist < HOVER_RADIUS) {
//               opacity = 0.8; // darker on hover
//             }
//           }

//           ctx.beginPath();
//           ctx.moveTo(p1[0], p1[1]);
//           ctx.lineTo(p2[0], p2[1]);
//           ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         });
//       }

//       points.current.forEach(([x, y]) => {
//         ctx.beginPath();
//         ctx.arc(x, y, 3, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(100, 116, 139, 0.75)';
//         ctx.fill();
//       });

//       requestAnimationFrame(draw);
//     };

//     // Start drawing loop
//     requestAnimationFrame(draw);

//     // Mouse listeners without triggering React re-renders
//     const handleMouseMove = (e) => {
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

// export default NetworkCanvas;
// working fine one end



// import React, { useRef, useEffect } from 'react';

// const NetworkCanvas = () => {
//   const canvasRef = useRef(null);
//   const points = useRef([]);
//   const mousePos = useRef({ x: 0, y: 0 });
//   const isHovering = useRef(false);

//   const PARTICLE_COUNT = 150;
//   const HOVER_RADIUS = 80;
//   const NEIGHBOR_COUNT = 4;

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

//     // Generate points
//     points.current = Array.from({ length: PARTICLE_COUNT }, () => [
//       Math.random() * window.innerWidth,
//       Math.random() * window.innerHeight,
//     ]);

//     const getDistance = (p1, p2) => {
//       const dx = p1[0] - p2[0];
//       const dy = p1[1] - p2[1];
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

//       points.current.forEach((point, idx) => {
//         // Find nearest neighbors
//         const neighbors = points.current
//           .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
//           .filter((n) => n.index !== idx)
//           .sort((a, b) => a.distance - b.distance)
//           .slice(0, NEIGHBOR_COUNT);

//         neighbors.forEach(({ index }) => {
//           const neighbor = points.current[index];
//           let opacity = 0.2;

//           if (isHovering.current) {
//             const dist = getDistanceToSegment(
//               mousePos.current.x,
//               mousePos.current.y,
//               point[0],
//               point[1],
//               neighbor[0],
//               neighbor[1]
//             );
//             if (dist < HOVER_RADIUS) {
//               opacity = 0.8;
//             }
//           }

//           ctx.beginPath();
//           ctx.moveTo(point[0], point[1]);
//           ctx.lineTo(neighbor[0], neighbor[1]);
//           ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         });
//       });

//       // Draw dots
//       points.current.forEach(([x, y]) => {
//         ctx.beginPath();
//         ctx.arc(x, y, 3, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(100, 116, 139, 0.75)';
//         ctx.fill();
//       });

//       requestAnimationFrame(draw);
//     };

//     requestAnimationFrame(draw);

//     const handleMouseMove = (e) => {
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

// export default NetworkCanvas;



// import React, { useRef, useEffect } from 'react';

// const NetworkCanvas = () => {
//   const canvasRef = useRef(null);
//   const points = useRef([]);
//   const opacityMap = useRef(new Map());
//   const mousePos = useRef({ x: 0, y: 0 });
//   const isHovering = useRef(false);

//   const PARTICLE_COUNT = 150;
//   const HOVER_RADIUS = 80;
//   const NEIGHBOR_COUNT = 4;
//   const BASE_OPACITY = 0.2;
//   const HOVER_OPACITY = 0.8;
//   const OPACITY_LERP_SPEED = 0.08; // Lower = smoother

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

//     // Generate points
//     points.current = Array.from({ length: PARTICLE_COUNT }, () => [
//       Math.random() * window.innerWidth,
//       Math.random() * window.innerHeight,
//     ]);

//     const getDistance = (p1, p2) => {
//       const dx = p1[0] - p2[0];
//       const dy = p1[1] - p2[1];
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

//       points.current.forEach((point, idx) => {
//         const neighbors = points.current
//           .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
//           .filter((n) => n.index !== idx)
//           .sort((a, b) => a.distance - b.distance)
//           .slice(0, NEIGHBOR_COUNT);

//         neighbors.forEach(({ index }) => {
//           const neighbor = points.current[index];
//           const key = `${idx}-${index}`;
//           let targetOpacity = BASE_OPACITY;

//           if (isHovering.current) {
//             const dist = getDistanceToSegment(
//               mousePos.current.x,
//               mousePos.current.y,
//               point[0],
//               point[1],
//               neighbor[0],
//               neighbor[1]
//             );
//             if (dist < HOVER_RADIUS) {
//               targetOpacity = HOVER_OPACITY;
//             }
//           }

//           const prev = opacityMap.current.get(key) ?? BASE_OPACITY;
//           const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
//           opacityMap.current.set(key, next);

//           ctx.beginPath();
//           ctx.moveTo(point[0], point[1]);
//           ctx.lineTo(neighbor[0], neighbor[1]);
//           ctx.strokeStyle = `rgba(100, 116, 139, ${next.toFixed(3)})`;
//           ctx.lineWidth = 1;
//           ctx.stroke();
//         });
//       });

//       // Draw dots
//       points.current.forEach(([x, y]) => {
//         ctx.beginPath();
//         ctx.arc(x, y, 3, 0, Math.PI * 2);
//         ctx.fillStyle = 'rgba(100, 116, 139, 0.75)';
//         ctx.fill();
//       });

//       requestAnimationFrame(draw);
//     };

//     requestAnimationFrame(draw);

//     const handleMouseMove = (e) => {
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

// export default NetworkCanvas;



import React, { useRef, useEffect } from 'react';

const NetworkCanvas = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const opacityMap = useRef(new Map());
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  const PARTICLE_COUNT = 150;
  const HOVER_RADIUS = 80;
  const NEIGHBOR_COUNT = 4;
  const BASE_OPACITY = 0.1;
  const HOVER_OPACITY = 0.7;
  const OPACITY_LERP_SPEED = 0.08;

  // --- Seeded random generator to get consistent layout ---
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

    // --- Generate consistent points based on screen size seed ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    const seed = width * height;

    points.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => [
      seededRandom(seed + i * 13) * width,
      seededRandom(seed + i * 73) * height,
    ]);

    const getDistance = (p1, p2) => {
      const dx = p1[0] - p2[0];
      const dy = p1[1] - p2[1];
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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.current.forEach((point, idx) => {
        const neighbors = points.current
          .map((p, i) => ({ index: i, distance: getDistance(point, p) }))
          .filter((n) => n.index !== idx)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, NEIGHBOR_COUNT);

        neighbors.forEach(({ index }) => {
          const neighbor = points.current[index];
          const key = `${idx}-${index}`;
          let targetOpacity = BASE_OPACITY;

          if (isHovering.current) {
            const dist = getDistanceToSegment(
              mousePos.current.x,
              mousePos.current.y,
              point[0],
              point[1],
              neighbor[0],
              neighbor[1]
            );
            if (dist < HOVER_RADIUS) {
              targetOpacity = HOVER_OPACITY;
            }
          }

          const prev = opacityMap.current.get(key) ?? BASE_OPACITY;
          const next = prev + (targetOpacity - prev) * OPACITY_LERP_SPEED;
          opacityMap.current.set(key, next);

          ctx.beginPath();
          ctx.moveTo(point[0], point[1]);
          ctx.lineTo(neighbor[0], neighbor[1]);
          ctx.strokeStyle = `rgba(100, 116, 139, ${next.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw dots
      points.current.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138, 139, 160, 0.6)';
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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

export default NetworkCanvas;
