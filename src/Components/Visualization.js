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

        const nodes = [];
        const edges = [];

        data.forEach((item) => {
          const nodeId = item.identity?.low.toString();
          const labels = item.labels;
          const properties = item.properties;

          const node = {
            id: nodeId,
            label: labels.join(', '),
            title: JSON.stringify(properties),
          };

          nodes.push(node);

          if (labels.includes('Student') && properties.studentID) {
            const edge = {
              from: nodeId,
              to: properties.studentID,
              label: 'Enrolled',
            };

            edges.push(edge);
          }
        });

        setGraphData({ nodes, edges });
        setGraphKey(uuidv4());
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  console.log('Graph Data:', graphData);

  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      shape: 'circle',
      font: {
        size: 16,
      },
    },
    edges: {
      color: '#000000',
      width: 1,
      arrows: {
        to: { enabled: true, scaleFactor: 0.5 },
      },
    },
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        gravitationalConstant: -300,
        centralGravity: 0.02,
        springLength: 100,
        springConstant: 0.08,
        avoidOverlap: 1,
      },
      maxVelocity: 146,
      timestep: 0.35,
      stabilization: {
        enabled: true,
        iterations: 200,
        updateInterval: 10,
        onlyDynamicEdges: false,
        fit: true,
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
