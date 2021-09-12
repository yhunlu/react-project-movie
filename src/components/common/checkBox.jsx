import React from "react";

const CheckBox = ({ name, label, option, error, ...rest }) => {
  return (
    <div className="form-check form-switch">
      <input
        {...rest}
        type="checkbox"
        name={name}
        id={name}
        className="form-check-input"
        checked={option}
      />

      <label htmlFor={name} className="form-check-label">
        {label}
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CheckBox;
