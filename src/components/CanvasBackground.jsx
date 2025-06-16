import React, { useEffect, useRef, useState } from 'react';

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node class
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(0, 123, 255, 0.7)';
        context.fill();
      }
    }

    // Create nodes
    const nodes = Array.from({ length: 50 }, () => new Node());

    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      context.strokeStyle = 'rgba(0, 123, 255, 0.2)';
      context.lineWidth = 0.3;
      nodes.forEach((node, index) => {
        nodes.slice(index).forEach(otherNode => {
          const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2));
          if (distance < 100) {
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(otherNode.x, otherNode.y);
            context.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => node.draw());

      // Draw hover effect
      const gradient = context.createRadialGradient(position.x, position.y, 0, position.x, position.y, 80);
      gradient.addColorStop(0, 'rgba(128, 0, 128, 0.3)');
      gradient.addColorStop(1, 'rgba(128, 0, 128, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};

export default CanvasBackground;
