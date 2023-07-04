import React from 'react';
import { Network } from 'vis-network/standalone';
import 'vis-network/dist/vis-network.css';

const Neo4jVisualization = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const nodes = new window.vis.DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
    ]);

    const edges = new window.vis.DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
    ]);

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: '#000000',
      },
      height: '500px',
    };

    const network = new Network(containerRef.current, data, options);

    return () => {
      network.destroy();
    };
  }, []);

  return (
    <div>
      <h2>Neo4j Visualization</h2>
      <div ref={containerRef} style={{ height: '500px' }}></div>
    </div>
  );
};

export default Neo4jVisualization;
