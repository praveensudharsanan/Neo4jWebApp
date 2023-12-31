import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import Add from './AddPopup';
import Delete from './delete';
import Neo4jVisualization from './Visualization';
import { useContext } from 'react';
import AuthContext from '../Context/Authcontext';
import { Navigate, useNavigate } from 'react-router-dom';



const Mainscreen = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();


  const [queryResult, setQueryResult] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleAddClick = () => {
    setShowAddPopup(true);
    
  };


  const handleUpdateClick = () => {
    // Handle update functionality here
    console.log('Update button clicked');
  };

  const handleDeleteClick = () => {
    // Handle delete functionality here
    setShowDeletePopup(true);
    console.log('Delete button clicked');
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false); // Close the delete popup
  };

  const handleQueryClick = () => {
    // Handle query functionality here
    console.log('Query button clicked');
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleLogoutClick = () => {
    // Handle logout functionality here
    console.log('Logout button clicked');
    auth.logout();
      navigate("/");


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
        <button className="btn btn-danger"onClick={handleLogoutClick}>Logout</button>

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
      {showDeletePopup && (
        <div className="popup-background">
          <div className="add-popup">
            <Delete onClose={handleCloseDeletePopup} />
          </div>           
        </div>
      )}
      <Neo4jVisualization/>
    </div>
  );
};

export default Mainscreen;
