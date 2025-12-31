// src/components/Card.jsx
import React from "react";

const Card = ({ title, icon, children }) => {
  return (
    <div className="border rounded p-4 text-center hover:shadow-lg transition">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default Card;
