import React from "react";
import {
  BsXLg,
  BsPrinter,
  BsDownload,
  BsPersonCircle,
  BsCalendar3,
  BsClockHistory,
  BsCashStack,
  BsDashCircle,
  BsCheckCircleFill,
  BsHourglassSplit,
} from "react-icons/bs";

import "./PayrollDetails.css";

const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const PayrollDetails = ({ employee, onClose }) => {
  if (!employee) return null;

  const earnings = [
    {
      label: "Basic Salary",
      value: employee.basic,
    },
    {
      label: "HRA",
      value: employee.hra,
    },
    {
      label: "Special Allowance",
      value: employee.specialAllowance,
    },
    {
      label: "Conveyance",
      value: employee.conveyance,
    },
    {
      label: "Medical Allowance",
      value: employee.medicalAllowance,
    },
    {
      label: "Other Earnings",
      value: employee.otherEarnings,
    },
  ];

  const deductions = [
    {
      label: "Provident Fund (PF)",
      value: employee.pf,
    },
    {
      label: "ESI",
      value: employee.esi,
    },
    {
      label: "Professional Tax",
      value: employee.professionalTax,
    },
    {
      label: "TDS",
      value: employee.tds,
    },
    {
      label: "Loan Deduction",
      value: employee.loanDeduction,
    },
    {
      label: "Other Deductions",
      value: employee.otherDeductions,
    },
  ];

  const attendancePercentage =
    employee.workingDays > 0
      ? Math.round((employee.present / employee.workingDays) * 100)
      : 0;

  return (
    <div className="payroll-details-overlay">
      <div className="payroll-details-modal">

        {/* Header */}
        <div className="payroll-details-header">
          <div>
            <p className="payroll-details-eyebrow">
              PAYROLL DETAILS
            </p>

            <h2>
              Salary Statement
            </h2>

            <p className="payroll-details-period">
              {employee.month}
            </p>
          </div>

          <button
            className="payroll-details-close"
            onClick={onClose}
            aria-label="Close"
          >
            <BsXLg />
          </button>
        </div>

        {/* Employee Profile */}
        <div className="payroll-details-profile">

          <div className="payroll-details-profile-left">
            <div className="payroll-details-avatar">
              {employee.initials ||
                employee.employeeName
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
            </div>

            <div>
              <h3>{employee.employeeName}</h3>

              <p>
                {employee.employeeId}
              </p>

              <span>
                {employee.designation}
              </span>
            </div>
          </div>

          <div
            className={`payroll-details-status ${
              employee.status === "Processed"
                ? "processed"
                : "pending"
            }`}
          >
            {employee.status === "Processed" ? (
              <BsCheckCircleFill />
            ) : (
              <BsHourglassSplit />
            )}

            {employee.status}
          </div>

        </div>

        {/* Employee Information */}
        <div className="payroll-details-info-grid">

          <div className="payroll-details-info-card">
            <span>Department</span>
            <strong>{employee.department}</strong>
          </div>

          <div className="payroll-details-info-card">
            <span>Payroll Month</span>
            <strong>{employee.month}</strong>
          </div>

          <div className="payroll-details-info-card">
            <span>Financial Year</span>
            <strong>FY 2026-27</strong>
          </div>

          <div className="payroll-details-info-card">
            <span>Payroll Status</span>
            <strong>{employee.status}</strong>
          </div>

        </div>

        {/* Attendance */}
        <section className="payroll-details-section">

          <div className="payroll-details-section-title">
            <div>
              <BsClockHistory />
              <h3>Attendance Summary</h3>
            </div>
          </div>

          <div className="payroll-attendance-grid">

            <div className="payroll-attendance-card">
              <span>Working Days</span>
              <strong>{employee.workingDays}</strong>
            </div>

            <div className="payroll-attendance-card present">
              <span>Present</span>
              <strong>{employee.present}</strong>
            </div>

            <div className="payroll-attendance-card leave">
              <span>Leave</span>
              <strong>{employee.leave}</strong>
            </div>

            <div className="payroll-attendance-card lop">
              <span>LOP Days</span>
              <strong>{employee.lop}</strong>
            </div>

            <div className="payroll-attendance-progress">

              <div className="payroll-attendance-progress-header">
                <span>Attendance</span>
                <strong>{attendancePercentage}%</strong>
              </div>

              <div className="payroll-attendance-progress-track">
                <div
                  className="payroll-attendance-progress-fill"
                  style={{
                    width: `${attendancePercentage}%`,
                  }}
                />
              </div>

            </div>

          </div>

        </section>

        {/* Salary Breakdown */}
        <div className="payroll-details-breakdown">

          {/* Earnings */}
          <section className="payroll-details-section payroll-earnings">

            <div className="payroll-details-section-title">
              <div>
                <BsCashStack />
                <h3>Earnings</h3>
              </div>

              <span>
                {formatCurrency(employee.gross)}
              </span>
            </div>

            <div className="payroll-details-list">

              {earnings.map((item) => (
                <div
                  className="payroll-details-row"
                  key={item.label}
                >
                  <span>{item.label}</span>

                  <strong>
                    {formatCurrency(item.value)}
                  </strong>
                </div>
              ))}

              <div className="payroll-details-total-row">
                <span>Gross Salary</span>

                <strong>
                  {formatCurrency(employee.gross)}
                </strong>
              </div>

            </div>

          </section>

          {/* Deductions */}
          <section className="payroll-details-section payroll-deductions">

            <div className="payroll-details-section-title">
              <div>
                <BsDashCircle />
                <h3>Deductions</h3>
              </div>

              <span>
                {formatCurrency(employee.totalDeductions)}
              </span>
            </div>

            <div className="payroll-details-list">

              {deductions.map((item) => (
                <div
                  className="payroll-details-row"
                  key={item.label}
                >
                  <span>{item.label}</span>

                  <strong>
                    {formatCurrency(item.value)}
                  </strong>
                </div>
              ))}

              <div className="payroll-details-total-row">
                <span>Total Deductions</span>

                <strong>
                  {formatCurrency(employee.totalDeductions)}
                </strong>
              </div>

            </div>

          </section>

        </div>

        {/* Net Salary */}
        <div className="payroll-details-net">

          <div className="payroll-details-net-icon">
            <BsPersonCircle />
          </div>

          <div className="payroll-details-net-info">
            <span>Net Salary Payable</span>
            <small>
              Gross salary minus total deductions
            </small>
          </div>

          <strong>
            {formatCurrency(employee.net)}
          </strong>

        </div>

        {/* Footer */}
        <div className="payroll-details-footer">

          <div className="payroll-details-footer-note">
            <BsCalendar3 />
            <span>
              Payroll period: {employee.month}
            </span>
          </div>

          <div className="payroll-details-actions">

            <button
              className="payroll-details-secondary-btn"
              onClick={() =>
                alert("Print Salary Slip will be connected later.")
              }
            >
              <BsPrinter />
              Print
            </button>

            <button
              className="payroll-details-secondary-btn"
              onClick={() =>
                alert("Download Salary Slip will be connected later.")
              }
            >
              <BsDownload />
              Download
            </button>

            <button
              className="payroll-details-primary-btn"
              onClick={onClose}
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PayrollDetails;