import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import Mainscreen from './Mainscreen';
import Neo4jVisualization from './Visualization';
const App = () => {
  return (
    <div>
      <h1>
        <FontAwesomeIcon icon={faUniversity} />
        &nbsp;University of Liverpool
      </h1>
      <Mainscreen />
    <Neo4jVisualization/>
    </div>
    
  );
};

export default App;
