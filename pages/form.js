import React, { useState } from "react";

const FormField = ({ field, onChange, onDelete }) => {
  const { name, type, fields } = field;

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleDelete = () => {
    onDelete(name);
  };

  const renderFields = () => {
    if (type === "Object" && fields && fields.length > 0) {
      return (
        <div className="nested-fields">
          {fields.map((nestedField, index) => (
            <FormField
              key={index}
              field={nestedField}
              onChange={(fieldName, fieldValue) =>
                handleNestedFieldChange(index, fieldName, fieldValue)
              }
              onDelete={(fieldName) => handleDeleteNestedField(index)}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  const handleNestedFieldChange = (index, fieldName, fieldValue) => {
    const updatedFields = [...field.fields];
    updatedFields[index][fieldName] = fieldValue;
    onChange("fields", updatedFields);
  };

  const handleAddNestedField = () => {
    const updatedFields = [...(field.fields || [])]; // Use an empty array if field.fields is not defined
    updatedFields.push({ name: "", type: "" });
    onChange("fields", updatedFields);
  };

  const handleDeleteNestedField = (index) => {
    const updatedFields = [...field.fields];
    updatedFields.splice(index, 1);
    onChange("fields", updatedFields);
  };

  return (
    <div className="form-field">
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Field Name"
        onChange={handleFieldChange}
      />
      <select name="type" value={type} onChange={handleFieldChange}>
        <option value="">Select Type</option>
        <option value="String">String</option>
        <option value="Number">Number</option>
        <option value="Boolean">Boolean</option>
        <option value="Object">Object</option>
      </select>
      {renderFields()}
      <button onClick={handleAddNestedField} className="add-nested-field">
        +
      </button>
      <button onClick={handleDelete} className="delete-field">
        -
      </button>
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState([
    { name: "", type: "", fields: [] },
  ]);

  const handleFieldChange = (index, fieldName, fieldValue) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = fieldValue;
    setFormData(updatedFormData);
  };

  const handleDeleteField = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleSave = () => {
    console.log(formData);
  };

  return (
    <div>
      <h1>Form Builder</h1>
      {formData.map((field, index) => (
        <FormField
          key={index}
          field={field}
          onChange={(fieldName, fieldValue) =>
            handleFieldChange(index, fieldName, fieldValue)
          }
          onDelete={() => handleDeleteField(index)}
        />
      ))}
      <button onClick={handleSave} className="save-button">
        Save
      </button>
    </div>
  );
};

export default App;
