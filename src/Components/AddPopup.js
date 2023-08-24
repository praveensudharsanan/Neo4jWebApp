import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '../App.css';


const AddPopup = ({ onClose }) => {
  const [custom, setCustom] = useState(false);
  const [label, setLabel] = useState('');
  const [propertyFields, setPropertyFields] = useState([{ key: '', value: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your add logic here with the form data and properties
    console.log('Form submitted:', {
      custom,
      label,
      properties: propertyFields,
    });
    // Reset the form fields
    setCustom(false);
    setLabel('');
    setPropertyFields([{ key: '', value: '' }]);
    // Close the pop-up
    onClose();
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
