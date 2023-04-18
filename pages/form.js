import React, { useState } from "react";
import styles from "../styles/Home.module.css"
import { RiDeleteBin5Line } from "react-icons/ri"

const FormField = ({ field, onChange, onDelete,style,level }) => {
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
        <div style={{margin:"0px"}}>
          {fields.map((nestedField, index) => (
            <FormField
              key={index}
              field={nestedField}
              onChange={(fieldName, fieldValue) =>
                handleNestedFieldChange(index, fieldName, fieldValue)
              }
              onDelete={() => handleDeleteNestedField(index)}
              style={{marginLeft: `${level * 12}px`, display:"flex", alignItems:"center", justifyContent:"space-between"}}
              level={level+1}
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
    const updatedFields = [...(field.fields || [])];
    updatedFields.push({ name: "", type: "" });
    onChange("fields", updatedFields);
  };

  const handleDeleteNestedField = (index) => {
    const updatedFields = [...field.fields];
    updatedFields.splice(index, 1);
    onChange("fields", updatedFields);
  };

  return (
    <div>
      <div style={style}>
      <div>
        <input type="text" name="name" value={name} placeholder="Field Name" onChange={handleFieldChange} className={styles.fieldName} />
        <select name="type" value={type} onChange={handleFieldChange} className={styles.select}>
          <option value="">Select Type</option>
          <option value="String">String</option>
          <option value="Number">Number</option>
          <option value="Boolean">Boolean</option>
          <option value="Object">Object</option>
        </select>
      </div>
      <div>
      {field.type === "Object" && (
        <button onClick={handleAddNestedField}>+</button>
      )}
      <button onClick={handleDelete}>
        <RiDeleteBin5Line />
      </button>
      </div>
      </div>
      {renderFields()}
      
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

  const handleAddField = () => {
    const updatedFormData = [...formData];
    updatedFormData.push({ name: "", type: "", fields: [] });
    setFormData(updatedFormData);
  };

  const handleSave = () => {
    console.log(formData);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.subDiv}>
        <div className={styles.headingDiv}>
          <h1>Field Name and Type</h1>
          <button onClick={handleAddField}>+</button>
        </div>
      
      {formData.map((field, index) => (
        <>
        <span>{index+1}</span>
        <div style={{display:"inline-flex", alignItems:"center"}}>
        <FormField
          key={index}
          field={field}
          onChange={(fieldName, fieldValue) =>
            handleFieldChange(index, fieldName, fieldValue)
          }
          onDelete={() => handleDeleteField(index)}
          style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"42.5rem"}}
          level={1}
      />
      </div>
      </>
      ))}
      {/* Add more standalone FormField components as needed */}
      <button onClick={handleSave} className={styles.btn}>
        Save
      </button>
      </div>
    </div>
  );
};

export default App;
