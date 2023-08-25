import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-vis';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Neo4jVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [graphKey, setGraphKey] = useState(uuidv4());
  const [selectedNodeProperties, setSelectedNodeProperties] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get('http://localhost:8080/test_api/neo4j_get/');
        const data = response.data.result;

        const nodes = [];
        const edges = [];

        data.forEach((item) => {
          const nodeData = item.node;
          if (nodeData) {
            const nodeId = nodeData.identity[0]?.low.toString();
            const labels = nodeData.labels[0];
            const properties = nodeData.properties;

            const node = {
              id: nodeId,
              label: properties.Name || labels,
              title: properties.Name || labels,
              properties: properties,
            };

            nodes.push(node);
          }

          const relationshipData = item.relationship;
          if (relationshipData) {
            const relationship = relationshipData;
            const edge = {
              id: relationship.identity[0]?.low.toString(),
              from: relationship.start[0]?.low.toString(),
              to: relationship.end[0]?.low.toString(),
              label: relationship.type,
              properties: relationship.properties,
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

  const options = {
    layout: {
      hierarchical: false, // Adjust this based on your data
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
      smooth: {
        type: 'dynamic', // Adjust this for edge smoothness
      },
    },
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based', // Experiment with different solvers
      // Other physics settings
    },
  };

  const events = {
    select: function (event) {
      const { nodes } = event;
      if (nodes.length > 0) {
        const selectedNode = graphData.nodes.find((node) => node.id === nodes[0]);
        if (selectedNode) {
          setSelectedNodeProperties(selectedNode.properties);
        }
      } else {
        setSelectedNodeProperties(null); // Deselect when clicking on empty space
      }
    },
  };

  return (
    <div>
      <h2>Neo4j Visualization</h2>
      <Graph
        key={graphKey}
        graph={graphData}
        options={options}
        events={events}
        style={{ height: '500px' }}
      />
      {selectedNodeProperties && (
        <div className="selected-node-properties" style={{ border: '1px solid red', background: 'white' }}>
          <h3>Selected Node Properties:</h3>
          <pre>{JSON.stringify(selectedNodeProperties, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Neo4jVisualization;
