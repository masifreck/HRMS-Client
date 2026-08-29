import "./Stepper.css";

const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? "active" : ""} ${
            index < currentStep ? "completed" : ""
          }`}
          onClick={() => onStepClick(index)}
        >
          <div className="circle">
            {index < currentStep ? "✓" : index + 1}
          </div>

          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;