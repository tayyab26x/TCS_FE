import React from "react";

const Card = ({ title, icon, children }) => {
  return (
    <div className="bg-white p-6 text-center rounded-3xl">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      {title && <h3 className="font-semibold mb-4 text-black">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
