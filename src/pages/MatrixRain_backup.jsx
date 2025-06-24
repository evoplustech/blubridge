import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
      // Fading effect over light background
      ctx.fillStyle = 'rgba(255, 253, 247, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#84756d'; // Green for the "Matrix" rain
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height || Math.random() > 0.875) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // const draw = () => {
    // // Clear with a slight overlay to simulate fade-out
    // ctx.fillStyle = 'rgba(255, 253, 247, 0.15)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.font = `${fontSize}px monospace`;

    // for (let i = 0; i < drops.length; i++) {
    //     const x = i * fontSize;
    //     const y = drops[i] * fontSize;

    //     const text = Math.random() > 0.5 ? '1' : '0';

    //     // Create gradient for each character (top = dark, bottom = faded)
    //     const gradient = ctx.createLinearGradient(x, y - fontSize * 10, x, y);
    //     gradient.addColorStop(0, '#3c3b39'); // Dark start
    //     gradient.addColorStop(1, '#c7c1bc'); // Light faded end

    //     ctx.fillStyle = gradient;
    //     ctx.fillText(text, x, y);

    //     if (y > canvas.height || Math.random() > 0.975) {
    //     drops[i] = 0;
    //     }

    //     drops[i] += 0.5; // slow drop
    // }
    // };
    const interval = setInterval(draw, 200);    
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '150px',
        backgroundColor: '#fffdf7',
        borderRadius: '20px'
      }}
    />
  );
};

export default MatrixRain;
