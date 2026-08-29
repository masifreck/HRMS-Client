import "./FormCard.css";

const FormCard = ({ title, children }) => {
  return (
    <div className="form-card">

      {title && (
        <div className="form-card-header">
          <h3>{title}</h3>
        </div>
      )}

      <div className="form-card-body">
        {children}
      </div>

    </div>
  );
};

export default FormCard;