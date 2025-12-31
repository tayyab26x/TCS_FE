import React from "react";

const InputField = ({ value, onChange, placeholder, type = "text" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent text-black w-full px-2 py-2 border-0 outline-none focus:ring-0 focus:border-0 placeholder-black appearance-none"
      style={{ border: "none" }}
    />
  );
};

export default InputField;
