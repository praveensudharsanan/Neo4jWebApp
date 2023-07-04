import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Neo4jVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [graphKey, setGraphKey] = useState(uuidv4());

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get('http://localhost:8080/test_api/neo4j_get/');
        const data = response.data.result;

        console.log('API Response:', data);

        if (!data) {
          console.error('Invalid API response:', response.data);
          return;
        }

        const nodes = data.map((node) => {
          const nodeId = node.identity.low.toString();
          const nodeLabels = node.labels;
          const nodeProperties = node.properties;

          return {
            id: nodeId,
            label: nodeLabels.join(', '), // Concatenate all labels
            title: JSON.stringify(nodeProperties), // Display properties as a JSON string
          };
        });

        setGraphData({ nodes, edges: [] });
        setGraphKey(uuidv4()); // Generate a new key
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  console.log('Graph Data:', graphData);

  const options = {
    layout: {
      hierarchical: false, // Disable hierarchical layout
    },
    nodes: {
      shape: 'circle', // Use circle shape for nodes
      font: {
        size: 16, // Font size for node labels
      },
    },
    edges: {
      color: '#000000', // Edge color
      width: 1, // Edge width
      arrows: {
        to: { enabled: true, scaleFactor: 0.5 }, // Enable arrow at the end of edges
      },
    },
    physics: {
      enabled: true, // Enable physics simulation
      solver: 'forceAtlas2Based', // Use forceAtlas2 algorithm for layout
      forceAtlas2Based: {
        gravitationalConstant: -300, // Attraction force between nodes
        centralGravity: 0.02, // Strength of the central gravity force
        springLength: 100, // Length of the edges
        springConstant: 0.08, // Strength of the spring forces
        avoidOverlap: 1, // Avoid node overlap
      },
      maxVelocity: 146, // Maximum node velocity
      timestep: 0.35, // Simulation timestep
      stabilization: {
        enabled: true, // Enable stabilization of the graph after initialization
        iterations: 200, // Number of stabilization iterations
        updateInterval: 10, // Update stabilization state every 10 milliseconds
        onlyDynamicEdges: false, // Include static edges in stabilization
        fit: true, // Fit the graph after stabilization
      },
    },
  };

  return (
    <div>
      <h2>Neo4j Visualization</h2>
      <Graph key={graphKey} graph={graphData} options={options} style={{ height: '500px' }} />
    </div>
  );
};

export default Neo4jVisualization;
