import { useEffect, useRef } from 'react';

const CursorConnector = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createNodes();
    };

    const createNodes = () => {
      const newNodes = [];
      const totalNodes = 160; // Reduced number of dots

      for (let i = 0; i < totalNodes; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const radius = 1.5;
        const velocityX = (Math.random() - 0.5) * 0.5;
        const velocityY = (Math.random() - 0.5) * 0.5;

        newNodes.push({ id: i, x, y, radius, velocityX, velocityY });
      }

      nodesRef.current = newNodes;
    };

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mousePosRef.current;

      nodesRef.current.forEach((node) => {
        // Move node
        node.x += node.velocityX;
        node.y += node.velocityY;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.velocityX *= -1;
        if (node.y < 0 || node.y > canvas.height) node.velocityY *= -1;

        // Distance to mouse
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.8; // slightly stronger
          ctx.beginPath();
          ctx.strokeStyle = `rgba(132, 123, 123, ${opacity})`; // darker gray line
          ctx.lineWidth = 1.2;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#6B7280'; // gray-500
        ctx.fill();

        // Optional glow
        if (distance < 150) {
          const glow = (1 - distance / 150) * 0.3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(107, 114, 128, ${glow})`;
          ctx.fill();
        }
      });

      // Cursor dot
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#6B7280'; // gray cursor
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default CursorConnector;
