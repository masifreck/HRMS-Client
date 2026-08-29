import { useState } from "react";

import Stepper from "../../components/Stepper/Stepper";

import GeneralForm from "./forms/GeneralForm";
import AddressForm from "./forms/AddressForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import FamilyForm from "./forms/FamilyForm";
import DocumentsForm from "./forms/DocumentsForm";
import SalaryForm from "./forms/SalaryForm";

import "./AddEmployee.css";

const steps = [
  "General",
  "Address",
  "Education",
  "Experience",
  "Family",
  "Documents",
  "Salary",
];

const AddEmployee = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const renderPage = () => {
    switch (currentStep) {
      case 0:
        return <GeneralForm />;

      case 1:
        return <AddressForm />;

      case 2:
        return <EducationForm />;

      case 3:
        return <ExperienceForm />;

      case 4:
        return <FamilyForm />;

      case 5:
        return <DocumentsForm />;

      case 6:
        return <SalaryForm />;

      default:
        return <GeneralForm />;
    }
  };

  return (
    <div className="employee-page">

      <div className="page-header">

        <div>

          <h2>Add New Employee</h2>

          <p>Create employee profile</p>

        </div>

      </div>

      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      <div className="form-container">
        {renderPage()}
      </div>

      <div className="navigation-buttons">

        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Previous
        </button>

        {currentStep !== steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </button>
        ) : (
          <button>
            Save Employee
          </button>
        )}

      </div>

    </div>
  );
};

export default AddEmployee;