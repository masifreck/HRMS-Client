import "./CustomTextInput.css";

const CustomTextInput = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  id,
  required = false,
  disabled = false,
  error = "",
  maxLength,
  autoComplete = "off",
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id || name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <input
        id={id || name}
        name={name}
        type={type}
        className={`custom-input ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default CustomTextInput;