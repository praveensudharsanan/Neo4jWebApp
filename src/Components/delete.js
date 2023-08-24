import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const NodeDeleteComponent = ({ onClose }) => {
  const [nodeId, setNodeId] = useState('');
  const [err, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleNodeIdChange = (event) => {
    setNodeId(event.target.value);
  };

  const handleDeleteNode = async () => {
    setError(''); // Reset error message
    setSuccessMsg(''); // Reset success message
    try {
      const response = await axios.delete(`http://localhost:8080/test_api/neo4j_delete/${nodeId}`);

      if (response.data) {
        setSuccessMsg(response.data.nodesDeleted);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
      }
    }
  };

  const handleCancel = () => {
    onClose(); // Call the onClose prop to close the delete popup
  };

  return (
    <div className="popup-background">
      <div className="add-popup">
        <h2>Node Delete Component</h2>
        <div>
          <label htmlFor="nodeId">Node ID:</label>
          <input
            type="text"
            id="nodeId"
            value={nodeId}
            onChange={handleNodeIdChange}
          />
        </div>
        <button onClick={handleDeleteNode}>Delete Node</button>
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
        <div>
          {err && <div className="alert alert-danger">{err}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default NodeDeleteComponent;
