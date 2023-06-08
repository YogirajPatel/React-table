import React, { useState } from "react";

const EditableCell = ({ value: initialValue, row, column }) => {
  const [value, setValue] = useState(initialValue);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsEdited(true);
  };

  const handleBlur = () => {
    const updatedRow = { ...row.original, [column.id]: value };

    console.log("Updated row:", updatedRow);
    if (isEdited) {
      alert("View Console to see Updated Data");
    }
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{
        background: "transparent",
        border: "1px solid",
        color: "white",
        textAlign: "center",
        fontWeight: "200",
        fontFamily: "sans-serif",
        fontSize: "16px",
        borderRadius: "5px",
        padding: "5px",
      }}
    />
  );
};

export default EditableCell;
