import React from "react";
import {
  BsPersonFill,
  BsPeopleFill,
  BsMortarboardFill,
  BsBriefcaseFill,
  BsFileEarmarkTextFill,
  BsCashStack,
  BsCheck2Circle,
} from "react-icons/bs";

import "./EmployeeStepIndicator.css";

const steps = [
  {
    id: 1,
    title: "Personal",
    description: "Basic information",
    icon: BsPersonFill,
  },
  {
    id: 2,
    title: "Family",
    description: "Family details",
    icon: BsPeopleFill,
  },
  {
    id: 3,
    title: "Education",
    description: "Academic details",
    icon: BsMortarboardFill,
  },
  {
    id: 4,
    title: "Experience",
    description: "Work history",
    icon: BsBriefcaseFill,
  },
  {
    id: 5,
    title: "Documents",
    description: "Employee documents",
    icon: BsFileEarmarkTextFill,
  },
  {
    id: 6,
    title: "Salary",
    description: "Compensation",
    icon: BsCashStack,
  },
  {
    id: 7,
    title: "Review",
    description: "Review & submit",
    icon: BsCheck2Circle,
  },
];

function EmployeeStepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="employee-step-indicator">
      <div className="employee-step-track"></div>

      {steps.map((step) => {
        const Icon = step.icon;

        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <button
            key={step.id}
            type="button"
            className={`employee-step ${
              isActive ? "active" : ""
            } ${isCompleted ? "completed" : ""}`}
            onClick={() => {
              if (isCompleted) {
                onStepClick(step.id);
              }
            }}
            disabled={!isCompleted && !isActive}
          >
            <div className="employee-step-circle">
              {isCompleted ? (
                <span className="step-check">✓</span>
              ) : (
                <Icon />
              )}
            </div>

            <div className="employee-step-content">
              <span className="employee-step-number">
                Step {step.id}
              </span>

              <strong>{step.title}</strong>

              <small>{step.description}</small>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default EmployeeStepIndicator;