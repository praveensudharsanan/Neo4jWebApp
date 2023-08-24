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
          const nodeId = item.identity?.low.toString();
          const labels = item.labels;
          const properties = item.properties;
          
          const node = {
            id: nodeId,
            label: properties.Name || labels.join(', '),
            title: properties.Name || labels.join(', '),
          };
          
          nodes.push(node);
          
          // Process edges if needed and add them to the edges array
          // ...
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

  const events = {
    select: function(event) {
      const { nodes } = event;
      if (nodes.length > 0) {
        const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
        if (selectedNode) {
          console.log('Selected Node:', selectedNode);
          setSelectedNodeProperties(selectedNode.properties);
          
          // Handle displaying node properties or other actions here
        }
      }
    }
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
