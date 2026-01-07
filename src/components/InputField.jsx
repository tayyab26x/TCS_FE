// src/components/InputField.jsx
import React from "react";

const InputField = ({ label, value, onChange, name, placeholder, type = "text", required }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}        // ✅ important
        onChange={onChange}  // ✅ important
        placeholder={placeholder}
        required={required}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default InputField;
