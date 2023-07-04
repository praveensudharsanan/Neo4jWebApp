import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import Mainscreen from './Mainscreen';

const App = () => {
  return (
    <div>
      <h1>
        <FontAwesomeIcon icon={faUniversity} />
        &nbsp;University of Liverpool
      </h1>
      <Mainscreen />
    </div>
  );
};

export default App;
