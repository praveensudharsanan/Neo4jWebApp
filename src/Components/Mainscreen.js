import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import Add from './Add';
import Neo4jVisualization from './Visualization';

const Mainscreen = () => {
  const [queryResult, setQueryResult] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const handleAddClick = () => {
    setShowAddPopup(true);
  };

  const handleUpdateClick = () => {
    // Handle update functionality here
    console.log('Update button clicked');
  };

  const handleDeleteClick = () => {
    // Handle delete functionality here
    console.log('Delete button clicked');
  };

  const handleQueryClick = () => {
    // Handle query functionality here
    console.log('Query button clicked');
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  return (
    <div className="container">
      <h2 className="title">Main Screen</h2>
      <div className="buttons-container">
        <button className="button" onClick={handleAddClick}>
          <i className="fas fa-plus"></i> Add
        </button>
        <button className="button" onClick={handleUpdateClick}>
          <i className="fas fa-edit"></i> Update
        </button>
        <button className="button" onClick={handleDeleteClick}>
          <i className="fas fa-trash"></i> Delete
        </button>
        <button className="button" onClick={handleQueryClick}>
          <i className="fas fa-search"></i> Query
        </button>
      </div>
      <div className="result-container">
        <h3 className="result-title">Query Result:</h3>
        {queryResult ? (
          <pre className="query-result">
            {JSON.stringify(queryResult, null, 2)}
          </pre>
        ) : (
          <p className="no-result-message">No query result yet.</p>
        )}
      </div>
      {showAddPopup && (
        <div className="popup-background">
          <div className="add-popup">
            <Add onClose={handleCloseAddPopup} />
          </div>
        </div>
      )}
      <Neo4jVisualization/>
    </div>
  );
};

export default Mainscreen;
