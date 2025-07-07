import React from "react";

const Input = ({ label = "", placeholder = "", value = "", onChange = () => {}, disabled=false }) => {
  return (
    <div className="w-full relative">
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <div className="relative">
        <input
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${disabled? "bg-gray-100":"bg-white"}`}
          type="text"
          onChange={disabled? null:onChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;
