import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import { RiDeleteBin5Line } from "react-icons/ri"
import { Switch } from '@chakra-ui/react';

// { field, index, handleFieldChange, handleNestedFieldChange, handleAddNestedField, handleDeleteField }

// const handleFieldChange = (index, fieldName, fieldType, isRequired, nestedFields) => {
//     const updatedFields = [...fields];
//     updatedFields[index] = { ...updatedFields[index], fieldName, fieldType, isRequired, nestedFields: nestedFields};
//     setFields(updatedFields);
//   };

let fieldValues;

function FieldForm(props) {
  const { fieldName, fieldType, isRequired, nestedFields } = props.field;

  const handleFieldChange = (index, fieldName, fieldType, isRequired, nestedFields) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], fieldName, fieldType, isRequired, nestedFields: nestedFields};
    setFields(updatedFields);
  };

  const handleNestedFieldChange = () => {
    console.log(field)
  };

  const handleAddNestedField = (index) => {
    const updatedFields = [...fields];
    updatedFields[index].nestedFields.push({ fieldName: '', fieldType: '', isRequired: false, nestedFields: [] });
    setFields(updatedFields);
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div className={styles.fieldDiv}>

      <div className={styles.fieldSubDiv1}>
        <input type="text" value={fieldName} className={styles.fieldName} onChange={(e) => props.handleFieldChange(props.index, e.target.value, fieldType, isRequired , nestedFields)} placeholder="Field Name" />
        <select  onChange={(e) => props.handleFieldChange(props.index, fieldName, e.target.value, isRequired, nestedFields)} placeholder="Field Type" className={styles.select}>
        <option value="none" selected disabled hidden>Select an Option</option>
          <option value="String">String</option>
          <option value="Object">Object</option>
          <option value="Boolean">Boolean</option>
          <option value="Number">Number</option>
        </select>
      </div>

      <div className={styles.fieldSubDiv2}>
      <label htmlFor='isRequired'> Required:</label>
      <Switch isChecked={isRequired} onChange={(e) => props.handleFieldChange(props.index, fieldName, fieldType, e.target.checked, nestedFields)} id='isRequired'/>
      
      {fieldType === 'Object' && (
        <div>
          <button type="button" onClick={() => props.handleAddNestedField(props.index)}>+</button>
          {nestedFields.map((nestedField, nestedIndex) => (
            <FieldForm
              key={`${props.index}-${nestedIndex}`}
              field={nestedField}
              index={nestedIndex}
              handleFieldChange={handleNestedFieldChange}
              handleAddNestedField={handleAddNestedField}
              handleDeleteField={handleDeleteField}
            />
          ))}
        </div>
      )}
      <button type="button" onClick={() => props.handleDeleteField(index)}>
        <RiDeleteBin5Line />
      </button>
      </div>
    </div>
  );
}

export default FieldForm;