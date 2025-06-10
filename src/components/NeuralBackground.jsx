import React, { useEffect, useState, useRef } from 'react';

const NeuralNetworkBackground = () => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const generateNodes = () => {
      if (!containerRef.current) return [];
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      const nodeArray = [];
      const numNodes = Math.floor((width * height) / 25000); 
      for (let i = 0; i < Math.min(numNodes, 70); i++) { 
        nodeArray.push({
          id: i,
          x: Math.random() * 100, 
          y: Math.random() * 100, 
          vx: (Math.random() - 0.5) * 0.1, 
          vy: (Math.random() - 0.5) * 0.1, 
          delay: Math.random() * 5, 
        });
      }
      setNodes(nodeArray);
      return nodeArray;
    };

    const generateConnections = (currentNodes) => {
      if (currentNodes.length < 2) {
        setConnections([]);
        return;
      }
      const connectionArray = [];
      const numConnectionsTarget = Math.floor(currentNodes.length * 1.1); 

      for (let i = 0; i < currentNodes.length; i++) {
        for (let j = i + 1; j < currentNodes.length; j++) {
          const node1 = currentNodes[i];
          const node2 = currentNodes[j];
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 25) { 
            const startX = node1.x;
            const startY = node1.y;
            const length = distance;
            const angle = Math.atan2(node2.y - node1.y, node2.x - node1.x) * (180 / Math.PI);
            
            connectionArray.push({
              id: `conn-${i}-${j}`,
              x: startX,
              y: startY,
              length: length,
              angle: angle,
              delay: Math.random() * 3,
            });
          }
        }
      }
      setConnections(connectionArray.slice(0, Math.min(connectionArray.length, numConnectionsTarget + 5)));
    };
    
    let animationFrameId;
    const updateAnimation = () => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(node => {
          let newX = node.x + node.vx;
          let newY = node.y + node.vy;

          if (newX > 100 || newX < 0) node.vx *= -1;
          if (newY > 100 || newY < 0) node.vy *= -1;
          
          newX = Math.max(0, Math.min(100, newX));
          newY = Math.max(0, Math.min(100, newY));

          return { ...node, x: newX, y: newY };
        });
        generateConnections(newNodes); 
        return newNodes;
      });
      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    const currentNodes = generateNodes();
    if (currentNodes.length > 0) {
      generateConnections(currentNodes);
      animationFrameId = requestAnimationFrame(updateAnimation);
    }
    

    const handleResize = () => {
        const newNodes = generateNodes();
        if (newNodes.length > 0) {
            generateConnections(newNodes);
        }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };

  }, []); 

  return (
    <div ref={containerRef} className="neural-bg">
      {connections.map((connection) => (
        <div
          key={connection.id}
          className="neural-connection"
          style={{
            left: `${connection.x}%`,
            top: `${connection.y}%`,
            width: `${connection.length}%`,
            transform: `rotate(${connection.angle}deg)`,
            animationDelay: `${connection.delay}s`,
          }}
        />
      ))}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="neural-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.delay}s`,
            animationName: 'float', 
            animationDuration: '10s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite'
          }}
        />
      ))}
    </div>
  );
};

export default NeuralNetworkBackground;