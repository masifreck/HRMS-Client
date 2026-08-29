import "./CustomButton.css";

const CustomButton = ({
  text,
  type = "button",
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon = null,
}) => {
  return (
    <button
      type={type}
      className={`custom-btn ${variant} ${size}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="btn-loader"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default CustomButton;