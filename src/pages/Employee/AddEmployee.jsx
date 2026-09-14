import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BsArrowLeft,
  BsArrowRight,
  BsCheckLg,
  BsFloppy2,
  BsPersonPlusFill,
  BsX,
} from "react-icons/bs";

import EmployeeStepIndicator from "./components/EmployeeStepIndicator";
import PersonalForm from "./forms/PersonalForm";
import FamilyForm from "./forms/FamilyForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import DocumentsForm from "./forms/DocumentsForm";
import SalaryForm from "./forms/SalaryForm";

import "./AddEmployee.css";

const stepTitles = [
  "Personal Information",
  "Family Information",
  "Education",
  "Experience",
  "Documents",
  "Salary & Compensation",
  "Review & Submit",
];

function AddEmployee() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [employeeData, setEmployeeData] = useState({
    personal: {},
    family: {},
    education: [],
    experience: [],
    documents: [],
    salary: {},
  });

  const updateEmployeeData = (section, data) => {
    setEmployeeData((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        ...data,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((previous) => previous + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSaveDraft = () => {
    console.log("Employee draft:", employeeData);

    alert("Employee draft saved successfully.");
  };

  const handleSubmit = () => {
    console.log("Final employee data:", employeeData);

    alert("Employee created successfully.");

    navigate("/employees");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
     case 1:
  return (
    <PersonalForm
      data={employeeData.personal}
      onChange={(data) =>
        updateEmployeeData("personal", data)
      }
    />
  );

      case 2:
        return (
          <FamilyForm
            data={employeeData.family}
            onChange={(data) =>
              updateEmployeeData("family", data)
            }
          />
        );

      case 3:
        return (
          <EducationForm
            data={employeeData.education}
            onChange={(data) =>
              setEmployeeData((previous) => ({
                ...previous,
                education: data,
              }))
            }
          />
        );

      case 4:
        return (
          <ExperienceForm
            data={employeeData.experience}
            onChange={(data) =>
              setEmployeeData((previous) => ({
                ...previous,
                experience: data,
              }))
            }
          />
        );

      case 5:
        return (
          <DocumentsForm
            data={employeeData.documents}
            onChange={(data) =>
              setEmployeeData((previous) => ({
                ...previous,
                documents: data,
              }))
            }
          />
        );

      case 6:
        return (
          <SalaryForm
            data={employeeData.salary}
            onChange={(data) =>
              updateEmployeeData("salary", data)
            }
          />
        );

      case 7:
        return (
          <div className="employee-review">
            <div className="review-header">
              <div className="review-icon">
                <BsCheckLg />
              </div>

              <div>
                <h3>Review Employee Information</h3>
                <p>
                  Please verify the information before creating
                  the employee.
                </p>
              </div>
            </div>

            <div className="review-section">
              <div className="review-section-title">
                <h4>Personal Information</h4>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                >
                  Edit
                </button>
              </div>

              <div className="review-grid">
                <div>
                  <span>Employee Name</span>
                  <strong>
                    {employeeData.personal?.firstName ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {employeeData.personal?.email ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {employeeData.personal?.phone ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>Employee ID</span>
                  <strong>
                    {employeeData.personal?.employeeId ||
                      "Auto generated"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="review-section">
              <div className="review-section-title">
                <h4>Family Information</h4>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                >
                  Edit
                </button>
              </div>

              <div className="review-grid">
                <div>
                  <span>Father Name</span>
                  <strong>
                    {employeeData.family?.fatherName ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>Mother Name</span>
                  <strong>
                    {employeeData.family?.motherName ||
                      "Not provided"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="review-section">
              <div className="review-section-title">
                <h4>Education</h4>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                >
                  Edit
                </button>
              </div>

              <p className="review-count">
                {employeeData.education?.length || 0} education
                record(s) added.
              </p>
            </div>

            <div className="review-section">
              <div className="review-section-title">
                <h4>Experience</h4>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                >
                  Edit
                </button>
              </div>

              <p className="review-count">
                {employeeData.experience?.length || 0} experience
                record(s) added.
              </p>
            </div>

            <div className="review-section">
              <div className="review-section-title">
                <h4>Documents</h4>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                >
                  Edit
                </button>
              </div>

              <p className="review-count">
                {employeeData.documents?.length || 0} document(s)
                added.
              </p>
            </div>

            <div className="review-section">
              <div className="review-section-title">
                <h4>Salary & Compensation</h4>

                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                >
                  Edit
                </button>
              </div>

              <div className="review-grid">
                <div>
                  <span>Basic Salary</span>
                  <strong>
                    {employeeData.salary?.basicSalary ||
                      "Not provided"}
                  </strong>
                </div>

                <div>
                  <span>CTC</span>
                  <strong>
                    {employeeData.salary?.ctc ||
                      "Not provided"}
                  </strong>
                </div>
              </div>
            </div>

            <div className="review-warning">
              <strong>Before submitting</strong>

              <p>
                Please make sure all employee information and
                uploaded documents are correct. This information
                will be used for HR, attendance and payroll
                processing.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-employee-page">

      {/* Page Header */}

      <div className="add-employee-header">
        <div className="add-employee-heading">

          <button
            type="button"
            className="add-employee-back"
            onClick={() => navigate("/employees")}
          >
            <BsArrowLeft />
          </button>

          <div className="add-employee-heading-icon">
            <BsPersonPlusFill />
          </div>

          <div>
            <h1>Add New Employee</h1>

            <p>
              Create a new employee profile and add their
              organizational information.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="save-draft-button"
          onClick={handleSaveDraft}
        >
          <BsFloppy2 />
          <span>Save as Draft</span>
        </button>
      </div>

      {/* Progress */}

      <div className="add-employee-progress-card">

        <div className="progress-top">

          <div>
            <span className="progress-label">
              Employee Setup
            </span>

            <h2>{stepTitles[currentStep - 1]}</h2>
          </div>

          <div className="progress-count">
            <strong>{currentStep}</strong>
            <span>/ 7</span>
          </div>

        </div>

        <EmployeeStepIndicator
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

      </div>

      {/* Form */}

      <div className="add-employee-form-card">

        <div className="add-employee-form-content">
          {renderCurrentStep()}
        </div>

        {/* Footer */}

        <div className="add-employee-footer">

          <button
            type="button"
            className="cancel-employee-button"
            onClick={() => navigate("/employees")}
          >
            <BsX />
            Cancel
          </button>

          <div className="employee-footer-right">

            {currentStep > 1 && (
              <button
                type="button"
                className="previous-step-button"
                onClick={handlePrevious}
              >
                <BsArrowLeft />
                Previous
              </button>
            )}

            {currentStep < 7 ? (
              <button
                type="button"
                className="next-step-button"
                onClick={handleNext}
              >
                Continue
                <BsArrowRight />
              </button>
            ) : (
              <button
                type="button"
                className="submit-employee-button"
                onClick={handleSubmit}
              >
                <BsCheckLg />
                Create Employee
              </button>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}

export default AddEmployee;