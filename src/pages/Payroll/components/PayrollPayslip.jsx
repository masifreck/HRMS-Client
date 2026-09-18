import React from "react";
import {
  BsXLg,
  BsPrinter,
  BsDownload,
  BsBuilding,
  BsPerson,
  BsCalendar3,
} from "react-icons/bs";

import "./PayrollPayslip.css";

const PayrollPayslip = ({ employee, onClose }) => {
  if (!employee) return null;

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

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
      label: "Provident Fund",
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

  return (
    <div className="payroll-payslip-overlay">

      <div className="payroll-payslip-modal">

        {/* =================================
            HEADER
        ================================= */}

        <div className="payroll-payslip-toolbar">

          <div>
            <span>
              SALARY SLIP
            </span>

            <h2>
              {employee.month}
            </h2>
          </div>

          <div className="payroll-payslip-toolbar-actions">

            <button
              onClick={() =>
                window.print()
              }
              title="Print Payslip"
            >
              <BsPrinter />
              Print
            </button>

            <button
              onClick={() =>
                alert(
                  "PDF download will be connected later."
                )
              }
              title="Download Payslip"
            >
              <BsDownload />
              Download
            </button>

            <button
              className="payroll-payslip-close"
              onClick={onClose}
              title="Close"
            >
              <BsXLg />
            </button>

          </div>

        </div>


        {/* =================================
            PAYSLIP DOCUMENT
        ================================= */}

        <div className="payroll-payslip-document">

          {/* COMPANY HEADER */}

          <div className="payroll-payslip-company">

            <div className="payroll-payslip-company-logo">
              RO
            </div>

            <div>
              <h1>
                RegalOpsys
              </h1>

              <p>
                Human Resource Management System
              </p>

              <small>
                Employee Payroll Department
              </small>
            </div>

          </div>


          <div className="payroll-payslip-title">

            <h2>
              SALARY SLIP
            </h2>

            <span>
              {employee.month}
            </span>

          </div>


          {/* =================================
              EMPLOYEE INFORMATION
          ================================= */}

          <div className="payroll-payslip-info">

            <div className="payroll-payslip-info-heading">

              <div>
                <BsPerson />
                <span>
                  Employee Information
                </span>
              </div>

            </div>

            <div className="payroll-payslip-info-grid">

              <div>
                <label>
                  Employee Name
                </label>

                <strong>
                  {employee.employeeName}
                </strong>
              </div>

              <div>
                <label>
                  Employee ID
                </label>

                <strong>
                  {employee.employeeId}
                </strong>
              </div>

              <div>
                <label>
                  Department
                </label>

                <strong>
                  {employee.department}
                </strong>
              </div>

              <div>
                <label>
                  Designation
                </label>

                <strong>
                  {employee.designation}
                </strong>
              </div>

              <div>
                <label>
                  Payroll Month
                </label>

                <strong>
                  {employee.month}
                </strong>
              </div>

              <div>
                <label>
                  Financial Year
                </label>

                <strong>
                  FY 2026-27
                </strong>
              </div>

            </div>

          </div>


          {/* =================================
              ATTENDANCE
          ================================= */}

          <div className="payroll-payslip-attendance">

            <div className="payroll-payslip-attendance-heading">

              <BsCalendar3 />

              <span>
                Attendance Summary
              </span>

            </div>

            <div className="payroll-payslip-attendance-grid">

              <div>
                <span>
                  Working Days
                </span>

                <strong>
                  {employee.workingDays}
                </strong>
              </div>

              <div>
                <span>
                  Present Days
                </span>

                <strong>
                  {employee.present}
                </strong>
              </div>

              <div>
                <span>
                  Leave Days
                </span>

                <strong>
                  {employee.leave}
                </strong>
              </div>

              <div>
                <span>
                  LOP Days
                </span>

                <strong>
                  {employee.lop}
                </strong>
              </div>

            </div>

          </div>


          {/* =================================
              SALARY TABLE
          ================================= */}

          <div className="payroll-payslip-salary-grid">

            {/* EARNINGS */}

            <div className="payroll-payslip-table-wrapper">

              <div className="payroll-payslip-table-heading earnings">

                <span>
                  Earnings
                </span>

                <strong>
                  Amount
                </strong>

              </div>

              <div className="payroll-payslip-table">

                {earnings.map((item) => (
                  <div
                    className="payroll-payslip-table-row"
                    key={item.label}
                  >

                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {formatCurrency(item.value)}
                    </strong>

                  </div>
                ))}

                <div className="payroll-payslip-table-total">

                  <span>
                    Gross Earnings
                  </span>

                  <strong>
                    {formatCurrency(
                      employee.gross
                    )}
                  </strong>

                </div>

              </div>

            </div>


            {/* DEDUCTIONS */}

            <div className="payroll-payslip-table-wrapper">

              <div className="payroll-payslip-table-heading deductions">

                <span>
                  Deductions
                </span>

                <strong>
                  Amount
                </strong>

              </div>

              <div className="payroll-payslip-table">

                {deductions.map((item) => (
                  <div
                    className="payroll-payslip-table-row"
                    key={item.label}
                  >

                    <span>
                      {item.label}
                    </span>

                    <strong>
                      {formatCurrency(item.value)}
                    </strong>

                  </div>
                ))}

                <div className="payroll-payslip-table-total">

                  <span>
                    Total Deductions
                  </span>

                  <strong>
                    {formatCurrency(
                      employee.totalDeductions
                    )}
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* =================================
              NET SALARY
          ================================= */}

          <div className="payroll-payslip-net">

            <div>

              <span>
                NET SALARY PAYABLE
              </span>

              <small>
                Amount credited to employee
              </small>

            </div>

            <strong>
              {formatCurrency(
                employee.net
              )}
            </strong>

          </div>


          {/* =================================
              PAYMENT INFORMATION
          ================================= */}

          <div className="payroll-payslip-payment">

            <div>
              <BsBuilding />

              <div>
                <span>
                  Payment Status
                </span>

                <strong>
                  {employee.status}
                </strong>
              </div>
            </div>

            <div>
              <BsCalendar3 />

              <div>
                <span>
                  Payroll Period
                </span>

                <strong>
                  {employee.month}
                </strong>
              </div>
            </div>

          </div>


          {/* =================================
              FOOTER
          ================================= */}

          <div className="payroll-payslip-footer">

            <p>
              This is a system-generated salary
              statement. No physical signature is
              required.
            </p>

            <span>
              Generated by HRMS
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PayrollPayslip;