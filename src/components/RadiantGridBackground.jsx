import React, { useEffect, useRef } from 'react';

const RadiantGridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const gridSize = 20;
    const radiantLines = [];

    const createRadiantLine = () => {
      const horizontal = Math.random() > 0.5;
      const speed = 0.5 + Math.random() * 1.5; // slower and variable speeds
      const length = 30 + Math.random() * 40;  // longer lines
      const color = `hsl(${Math.random() * 360}, 100%, 65%)`;

      if (horizontal) {
        const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        radiantLines.push({ x: 0, y, speed, length, horizontal: true, color });
      } else {
        const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        radiantLines.push({ x, y: 0, speed, length, horizontal: false, color });
      }
    };

    // Prepopulate radiant lines initially
    for (let i = 0; i < 20; i++) {
      createRadiantLine();
    }

    const drawGrid = () => {
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawRadiantLines = () => {
      for (let i = radiantLines.length - 1; i >= 0; i--) {
        const line = radiantLines[i];
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        if (line.horizontal) {
          ctx.lineTo(line.x + line.length, line.y);
          line.x += line.speed;
          if (line.x > canvas.width) radiantLines.splice(i, 1);
        } else {
          ctx.lineTo(line.x, line.y + line.length);
          line.y += line.speed;
          if (line.y > canvas.height) radiantLines.splice(i, 1);
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawRadiantLines();
      if (Math.random() < 0.3) createRadiantLine(); // Increase frequency
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundColor: '#fdfdfd',
      }}
    />
  );
};

export default RadiantGridBackground;
