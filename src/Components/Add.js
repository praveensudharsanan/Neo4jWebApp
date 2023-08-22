import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

const Add = ({ onClose }) => {
  const [custom, setCustom] = useState(false);
  const [file, setFile] = useState(false);
  const [label, setLabel] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [relation, setRelation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your add logic here with the form data
    console.log('Form submitted:', {
      custom,
      file,
      label,
      name,
      date,
      relation
    });
    // Reset the form fields
    setCustom(false);
    setFile(false);
    setLabel('');
    setName('');
    setDate('');
    setRelation('');
    // Close the pop-up
    onClose();
  };

  const handleCancel = () => {
    // Reset the form fields
    setCustom(false);
    setFile(false);
    setLabel('');
    setName('');
    setDate('');
    setRelation('');
    // Close the pop-up
    onClose();
  };

  return (
    <div className="add-container">
      <h2>Add Node</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="custom">Custom:</label>
            <input
              type="checkbox"
              id="custom"
              checked={custom}
              onChange={(e) => setCustom(e.target.checked)}
            />
          </div>
          {/* <div className="col">
            <label htmlFor="file">From File:</label>
            <input
              type="checkbox"
              id="file"
              checked={file}
              onChange={(e) => setFile(e.target.checked)}
            />
          </div> */}
        </div>
        {/*<div className="form-group">
          <label htmlFor="label">Label:</label>
          <select
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option value="">Select Label</option>
            <option value="Label 1">Label 1</option>
            <option value="Label 2">Label 2</option>
            <option value="Label 3">Label 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Label Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>*/}
        <div className="form-group">
          <label htmlFor="name">Label Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        {/* <div className="form-group">
          <label htmlFor="relation">Relations:</label>
          <select
            id="relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
          >
            <option value="">Select Relation</option>
            <option value="Relation 1">Relation 1</option>
            <option value="Relation 2">Relation 2</option>
            <option value="Relation 3">Relation 3</option>
          </select>
        </div> */}
        <div className="button-group">
          <button type="submit" className="add-button">Add</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
