import React, { useEffect, useState } from "react";
import {
  BsXLg,
  BsCashStack,
  BsDashCircle,
  BsClockHistory,
  BsCheckCircleFill,
  BsCalculator,
  BsSave,
} from "react-icons/bs";

import "./PayrollProcess.css";

const PayrollProcess = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    basic: 0,
    hra: 0,
    specialAllowance: 0,
    conveyance: 0,
    medicalAllowance: 0,
    otherEarnings: 0,

    pf: 0,
    esi: 0,
    professionalTax: 0,
    tds: 0,
    loanDeduction: 0,
    otherDeductions: 0,

    workingDays: 0,
    present: 0,
    leave: 0,
    lop: 0,
  });

  useEffect(() => {
    if (!employee) return;

    setFormData({
      basic: employee.basic || 0,
      hra: employee.hra || 0,
      specialAllowance: employee.specialAllowance || 0,
      conveyance: employee.conveyance || 0,
      medicalAllowance: employee.medicalAllowance || 0,
      otherEarnings: employee.otherEarnings || 0,

      pf: employee.pf || 0,
      esi: employee.esi || 0,
      professionalTax: employee.professionalTax || 0,
      tds: employee.tds || 0,
      loanDeduction: employee.loanDeduction || 0,
      otherDeductions: employee.otherDeductions || 0,

      workingDays: employee.workingDays || 0,
      present: employee.present || 0,
      leave: employee.leave || 0,
      lop: employee.lop || 0,
    });
  }, [employee]);

  if (!employee) return null;

  const updateField = (field, value) => {
    const numericValue = Number(value);

    setFormData((prev) => ({
      ...prev,
      [field]: Number.isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const gross =
    Number(formData.basic) +
    Number(formData.hra) +
    Number(formData.specialAllowance) +
    Number(formData.conveyance) +
    Number(formData.medicalAllowance) +
    Number(formData.otherEarnings);

  const totalDeductions =
    Number(formData.pf) +
    Number(formData.esi) +
    Number(formData.professionalTax) +
    Number(formData.tds) +
    Number(formData.loanDeduction) +
    Number(formData.otherDeductions);

  const netSalary = gross - totalDeductions;

  const attendancePercentage =
    formData.workingDays > 0
      ? Math.round(
          (Number(formData.present) /
            Number(formData.workingDays)) *
            100
        )
      : 0;

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const handleSave = () => {
    const updatedPayroll = {
      ...employee,

      ...formData,

      gross,
      totalDeductions,
      net: netSalary,
    };

    if (onSave) {
      onSave(updatedPayroll);
    }

    alert("Payroll changes saved successfully.");
  };

  const handleProcess = () => {
    const updatedPayroll = {
      ...employee,

      ...formData,

      gross,
      totalDeductions,
      net: netSalary,

      status: "Processed",
    };

    if (onSave) {
      onSave(updatedPayroll);
    }

    alert(
      `${employee.employeeName}'s payroll has been processed successfully.`
    );
  };

  const earningsFields = [
    {
      key: "basic",
      label: "Basic Salary",
    },
    {
      key: "hra",
      label: "HRA",
    },
    {
      key: "specialAllowance",
      label: "Special Allowance",
    },
    {
      key: "conveyance",
      label: "Conveyance",
    },
    {
      key: "medicalAllowance",
      label: "Medical Allowance",
    },
    {
      key: "otherEarnings",
      label: "Other Earnings",
    },
  ];

  const deductionFields = [
    {
      key: "pf",
      label: "Provident Fund (PF)",
    },
    {
      key: "esi",
      label: "ESI",
    },
    {
      key: "professionalTax",
      label: "Professional Tax",
    },
    {
      key: "tds",
      label: "TDS",
    },
    {
      key: "loanDeduction",
      label: "Loan Deduction",
    },
    {
      key: "otherDeductions",
      label: "Other Deductions",
    },
  ];

  return (
    <div className="payroll-process-overlay">

      <div className="payroll-process-modal">

        {/* HEADER */}
        <div className="payroll-process-header">

          <div>
            <p className="payroll-process-eyebrow">
              PAYROLL PROCESSING
            </p>

            <h2>
              Edit Payroll
            </h2>

            <p>
              {employee.month}
            </p>
          </div>

          <button
            className="payroll-process-close"
            onClick={onClose}
          >
            <BsXLg />
          </button>

        </div>

        {/* EMPLOYEE */}
        <div className="payroll-process-employee">

          <div className="payroll-process-avatar">
            {employee.initials ||
              employee.employeeName
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
          </div>

          <div className="payroll-process-employee-info">

            <h3>
              {employee.employeeName}
            </h3>

            <p>
              {employee.employeeId}
            </p>

            <span>
              {employee.designation}
            </span>

          </div>

          <div
            className={`payroll-process-status ${
              employee.status === "Processed"
                ? "processed"
                : "pending"
            }`}
          >
            {employee.status === "Processed" ? (
              <BsCheckCircleFill />
            ) : (
              <span>Pending</span>
            )}

            {employee.status === "Processed"
              ? "Processed"
              : "Pending"}
          </div>

        </div>

        {/* ATTENDANCE */}
        <section className="payroll-process-section">

          <div className="payroll-process-section-heading">

            <div>
              <BsClockHistory />

              <div>
                <h3>
                  Attendance
                </h3>

                <p>
                  Payroll attendance information
                </p>
              </div>
            </div>

          </div>

          <div className="payroll-process-attendance">

            <div>
              <span>Working Days</span>
              <strong>{formData.workingDays}</strong>
            </div>

            <div>
              <span>Present</span>
              <strong className="present">
                {formData.present}
              </strong>
            </div>

            <div>
              <span>Leave</span>
              <strong className="leave">
                {formData.leave}
              </strong>
            </div>

            <div>
              <span>LOP</span>
              <strong className="lop">
                {formData.lop}
              </strong>
            </div>

          </div>

          <div className="payroll-process-attendance-progress">

            <div>
              <span>
                Attendance Percentage
              </span>

              <strong>
                {attendancePercentage}%
              </strong>
            </div>

            <div className="payroll-process-progress-track">

              <div
                style={{
                  width: `${attendancePercentage}%`,
                }}
              />

            </div>

          </div>

        </section>

        {/* SALARY BREAKDOWN */}
        <div className="payroll-process-grid">

          {/* EARNINGS */}
          <section className="payroll-process-section">

            <div className="payroll-process-section-heading">

              <div>
                <BsCashStack />

                <div>
                  <h3>
                    Earnings
                  </h3>

                  <p>
                    Monthly salary components
                  </p>
                </div>
              </div>

            </div>

            <div className="payroll-process-fields">

              {earningsFields.map((field) => (
                <div
                  className="payroll-process-field"
                  key={field.key}
                >

                  <label>
                    {field.label}
                  </label>

                  <div className="payroll-process-input-wrapper">

                    <span>₹</span>

                    <input
                      type="number"
                      min="0"
                      value={formData[field.key]}
                      onChange={(e) =>
                        updateField(
                          field.key,
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>
              ))}

            </div>

            <div className="payroll-process-total earnings-total">

              <span>
                Gross Salary
              </span>

              <strong>
                {formatCurrency(gross)}
              </strong>

            </div>

          </section>

          {/* DEDUCTIONS */}
          <section className="payroll-process-section">

            <div className="payroll-process-section-heading">

              <div>
                <BsDashCircle />

                <div>
                  <h3>
                    Deductions
                  </h3>

                  <p>
                    Monthly deductions
                  </p>
                </div>
              </div>

            </div>

            <div className="payroll-process-fields">

              {deductionFields.map((field) => (
                <div
                  className="payroll-process-field"
                  key={field.key}
                >

                  <label>
                    {field.label}
                  </label>

                  <div className="payroll-process-input-wrapper">

                    <span>₹</span>

                    <input
                      type="number"
                      min="0"
                      value={formData[field.key]}
                      onChange={(e) =>
                        updateField(
                          field.key,
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>
              ))}

            </div>

            <div className="payroll-process-total deductions-total">

              <span>
                Total Deductions
              </span>

              <strong>
                {formatCurrency(totalDeductions)}
              </strong>

            </div>

          </section>

        </div>

        {/* NET SALARY */}
        <div className="payroll-process-net">

          <div className="payroll-process-net-icon">
            <BsCalculator />
          </div>

          <div className="payroll-process-net-info">

            <span>
              Net Salary
            </span>

            <small>
              Gross Salary − Total Deductions
            </small>

          </div>

          <strong>
            {formatCurrency(netSalary)}
          </strong>

        </div>

        {/* FOOTER */}
        <div className="payroll-process-footer">

          <button
            className="payroll-process-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <div>

            <button
              className="payroll-process-save"
              onClick={handleSave}
            >
              <BsSave />
              Save Changes
            </button>

            <button
              className="payroll-process-process"
              onClick={handleProcess}
            >
              <BsCheckCircleFill />
              Process Payroll
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PayrollProcess;