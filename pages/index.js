import React, { useState } from "react";
import style from "../styles/Home.module.css"
import { RiDeleteBin5Line } from "react-icons/ri"

const App = () => {
  // State to store the dynamically rendered data
  const [data, setData] = useState([]);

  // Function to update the field name
  const handleFieldNameChange = (index, newName) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].fieldName = newName;
      return updatedData;
    });
  };

  // Function to update the field type
  const handleFieldTypeChange = (index, newType) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].fieldType = newType;
      return updatedData;
    });
  };

  // Function to add a new field
  const handleAddField = () => {
    setData(prevData => [
      ...prevData,
      {
        fieldName: "",
        fieldType: ""
      }
    ]);
  };

  // Function to delete a field
  const handleDeleteField = index => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.subDiv}>
        <div className={style.headingDiv}>
          <p>Field Name and Type</p>
          <button onClick={handleAddField}>+</button>
        </div>
    <div>
      {data.map((field, index) => (
        <div style={{display:"flex", alignItems:"center"}}>
        <span>{index+1}</span>
        <div key={index} style={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"53rem"}}>
          <div>
            <input
              type="text"
              placeholder="addName"
              value={field.fieldName}
              onChange={e => handleFieldNameChange(index, e.target.value)}
              className={style.fieldName}
            />
            <select 
              className={style.select}
              value={field.fieldType}
              onChange={e => handleFieldTypeChange(index, e.target.value)}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
            </select>
          </div>
          <div>
          <button onClick={() => handleDeleteField(index)}><RiDeleteBin5Line /></button>
          {field.fieldType === "object" && (
            <>
            <button onClick={event=>{console.log(event)}}>+</button>
            <div>
              {/* Render nested fields dynamically here */}
            </div>
            </>
          )}
          </div>
        </div>
        </div>

      ))}
      <button onClick={() => console.log(data)} className={style.btn}>Save</button>
    </div>
    </div>
    </div>
  );
};

export default App;
