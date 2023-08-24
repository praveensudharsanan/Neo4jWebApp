import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '../App.css';
import axios from 'axios';


const AddPopup = ({ onClose }) => {
  const [custom, setCustom] = useState(false);
  const [label, setLabel] = useState('');
  const [propertyFields, setPropertyFields] = useState([{ key: '', value: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for sending to the backend
    const dataToSend = {
      label,
      properties: propertyFields.reduce((acc, property) => {
        if (property.key && property.value) {
          acc[property.key] = property.value;
        }
        return acc;
      }, {}),
    };

    try {
      // Send the data to your backend API using Axios
      const response = await axios.post('http://localhost:8080/test_api/create_node', dataToSend);
      console.log('Add response:', response.data);

      // Reset the form fields
      setCustom(false);
      setLabel('');
      setPropertyFields([{ key: '', value: '' }]);
      // Close the pop-up
      onClose();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleCancel = () => {
    // Reset the form fields
    setCustom(false);
    setLabel('');
    setPropertyFields([{ key: '', value: '' }]);
    // Close the pop-up
    onClose();
  };

  const handleAddProperty = () => {
    setPropertyFields([...propertyFields, { key: '', value: '' }]);
  };

  const handlePropertyChange = (index, field, value) => {
    const updatedFields = [...propertyFields];
    updatedFields[index][field] = value;
    setPropertyFields(updatedFields);
  };

  return (
    <div className="popup-background">
      <div className="add-popup">
        <h2>Add Node</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="label">Label:</label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Properties:</label>
            {propertyFields.map((property, index) => (
              <div key={index} className="property-row">
                <input
                  type="text"
                  placeholder="Property Key"
                  value={property.key}
                  onChange={(e) => handlePropertyChange(index, 'key', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Property Value"
                  value={property.value}
                  onChange={(e) => handlePropertyChange(index, 'value', e.target.value)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="add-property-button"
            onClick={handleAddProperty}
          >
            Add Property
          </button>
          <div className="button-group">
            <button type="submit" className="add-button">Add</button>
            <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
