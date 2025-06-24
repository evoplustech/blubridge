import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const fontSize = 13;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const columns = Math.floor(canvas.width / fontSize);
    const characters = ['0', '1'];

    // Each column will have a drop object: y, pulseFrame
    const drops = Array(columns).fill().map(() => ({
      y: 0,
      pulseFrame: -1 // negative means not pulsing
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(255, 253, 247, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const drop = drops[i];
        const y = drop.y * fontSize;
        const char = characters[Math.floor(Math.random() * characters.length)];

        // Decide when to pulse: small chance once every few steps
        if (drop.pulseFrame === -1 && Math.random() < 0.02) {
          drop.pulseFrame = 0; // start pulsing
        }

        let scale = 1;
        if (drop.pulseFrame === 0) scale = 1.5;
        else if (drop.pulseFrame === 1) scale = 1.2;
        else if (drop.pulseFrame === 2) scale = 1.05;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = '#84756d';
        ctx.fillText(char, 0, 0);
        ctx.restore();

        // Update pulse frame if pulsing
        if (drop.pulseFrame >= 0) {
          drop.pulseFrame++;
          if (drop.pulseFrame > 2) drop.pulseFrame = -1;
        }

        // Move down
        drop.y++;

        // Reset if out of bounds or random reset
        if (drop.y * fontSize > canvas.height || Math.random() > 0.98) {
          drop.y = 0;
          drop.pulseFrame = -1;
        }
      }
    };

    const interval = setInterval(draw, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '150px',
        backgroundColor: '#fffdf7',
        borderRadius: '20px',
        display: 'block'
      }}
    />
  );
};

export default MatrixRain;
