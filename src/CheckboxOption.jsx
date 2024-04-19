import React from 'react';

const CheckboxOption = ({ name, checked, onChange, label, disabled }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="rounded-full border-2 border-blue-400 text-blue-600 focus:ring-indigo-500 h-4 w-4 mr-2"
        disabled={disabled}
      />
      <p className="font-semibold text-white">{label}</p>
    </div>
  );
};

export default CheckboxOption;
