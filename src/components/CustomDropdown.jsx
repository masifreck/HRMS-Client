import "./CustomDropdown.css";

const CustomDropdown = ({
  label,
  options = [],
  value,
  onChange,
  name,
  required = false,
  error = "",
  disabled = false,
}) => {
  return (
    <div className="dropdown-group">
      {label && (
        <label className="dropdown-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <select
        className={`custom-dropdown ${error ? "dropdown-error" : ""}`}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">Select {label}</option>

        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="dropdown-error-text">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomDropdown;