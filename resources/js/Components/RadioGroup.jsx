import React from "react";

const RadioGroup = ({
  label = "",
  handlerChange = (id) => {},
  items = [],
  selected = null,
  disabled = false,
}) => {
  return (
    <div className="w-full relative">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <div className="flex flex-col space-y-2">
        {items.map((option) => (
          <label
            key={option.id}
            onClick={() => !disabled && handlerChange(option.id)}
            className={`flex items-center space-x-3 cursor-pointer p-2 border rounded-lg transition ${
              selected === option.id
                ? "bg-blue-100 border-blue-500"
                : "border-gray-300 hover:bg-gray-50"
            } ${disabled ? "opacity-80 cursor-not-allowed" : ""}`}
          >
            <input
              type="radio"
              name="options"
              value={option.id}
              checked={selected === option.id}
              onChange={() => !disabled && handlerChange(option.id)}
              className="form-radio text-blue-600"
              // disabled={disabled}
            />
            <span className="text-sm font-medium text-gray-700">
              {option.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
