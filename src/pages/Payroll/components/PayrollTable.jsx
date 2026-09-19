import React from "react";
import {
  BsEye,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsCheckCircleFill,
  BsHourglassSplit,
  BsPersonFill,
} from "react-icons/bs";

import "./PayrollTable.css";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
};

const PayrollTable = ({
  data = [],
  onView,
  onEdit,
   onPayslip,
}) => {
  return (
    <div className="payroll-table-card">

      {/* =====================================================
          TABLE
          ===================================================== */}

      {data.length > 0 ? (
        <div className="payroll-table-wrapper">

          <table className="payroll-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Attendance</th>
                <th>Gross Salary</th>
                <th>Earnings</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {data.map((employee) => {

                const totalEarnings =
                  Number(employee.grossSalary || 0);

                const totalDeductions =
                  Number(employee.totalDeductions || 0);

                const netSalary =
                  Number(employee.netSalary || 0);

                const attendancePercentage =
                  employee.workingDays > 0
                    ? (
                        (employee.presentDays /
                          employee.workingDays) *
                        100
                      ).toFixed(0)
                    : 0;

                return (
                  <tr key={employee.id}>

                    {/* =========================================
                        EMPLOYEE
                        ========================================= */}

                    <td>
                      <div className="payroll-employee-cell">

                        <div className="payroll-employee-avatar">
                          {employee.initials || (
                            <BsPersonFill />
                          )}
                        </div>

                        <div className="payroll-employee-info">

                          <h4>
                            {employee.employeeName}
                          </h4>

                          <span>
                            {employee.employeeId}
                          </span>

                          <small>
                            {employee.designation}
                          </small>

                        </div>

                      </div>
                    </td>

                    {/* =========================================
                        DEPARTMENT
                        ========================================= */}

                    <td>
                      <span className="payroll-department">
                        {employee.department}
                      </span>
                    </td>

                    {/* =========================================
                        ATTENDANCE
                        ========================================= */}

                    <td>

                      <div className="payroll-attendance">

                        <div className="payroll-attendance-top">

                          <span>
                            {employee.presentDays}/
                            {employee.workingDays}
                          </span>

                          <strong>
                            {attendancePercentage}%
                          </strong>

                        </div>

                        <div className="payroll-attendance-bar">
                          <div
                            className="payroll-attendance-progress"
                            style={{
                              width: `${attendancePercentage}%`,
                            }}
                          />
                        </div>

                        <div className="payroll-attendance-meta">

                          <span>
                            Leave: {employee.leaveDays}
                          </span>

                          <span
                            className={
                              employee.lopDays > 0
                                ? "lop-warning"
                                : ""
                            }
                          >
                            LOP: {employee.lopDays}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* =========================================
                        GROSS
                        ========================================= */}

                    <td>

                      <span className="payroll-money payroll-gross">
                        {formatCurrency(
                          employee.grossSalary
                        )}
                      </span>

                    </td>

                    {/* =========================================
                        EARNINGS
                        ========================================= */}

                    <td>

                      <div className="payroll-amount-cell">

                        <span className="payroll-amount-main">
                          {formatCurrency(totalEarnings)}
                        </span>

                        <small>
                          Basic{" "}
                          {formatCurrency(
                            employee.basicSalary
                          )}
                        </small>

                      </div>

                    </td>

                    {/* =========================================
                        DEDUCTIONS
                        ========================================= */}

                    <td>

                      <div className="payroll-amount-cell">

                        <span className="payroll-amount-main payroll-deduction">
                          {formatCurrency(
                            totalDeductions
                          )}
                        </span>

                        <small>
                          PF + Tax + Others
                        </small>

                      </div>

                    </td>

                    {/* =========================================
                        NET SALARY
                        ========================================= */}

                    <td>

                      <div className="payroll-net-cell">

                        <span>
                          {formatCurrency(
                            netSalary
                          )}
                        </span>

                        <small>
                          Payable
                        </small>

                      </div>

                    </td>

                    {/* =========================================
                        STATUS
                        ========================================= */}

                    <td>

                      {employee.status === "Processed" ? (
                        <span className="payroll-status payroll-status-processed">
                          <BsCheckCircleFill />
                          Processed
                        </span>
                      ) : (
                        <span className="payroll-status payroll-status-pending">
                          <BsHourglassSplit />
                          Pending
                        </span>
                      )}

                    </td>

                    {/* =========================================
                        ACTION
                        ========================================= */}

                    <td>

                      <div className="payroll-actions">

                        <button
  onClick={() => onPayslip(item)}
  title="View Payslip"
>
                          <BsEye />
                        </button>

                        <button
                          type="button"
                          className="payroll-action-btn"
                          title="Edit Payroll"
                          onClick={() =>
                            onEdit?.(employee)
                          }
                        >
                          <BsPencilSquare />
                        </button>

                        <button
                          type="button"
                          className="payroll-action-btn"
                          title="More"
                          onClick={() =>
                            alert(
                              `More actions for ${employee.employeeName}`
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      ) : (

        /* =====================================================
           EMPTY STATE
           ===================================================== */

        <div className="payroll-table-empty">

          <div className="payroll-table-empty-icon">
            <BsPersonFill />
          </div>

          <h3>
            No Payroll Records Found
          </h3>

          <p>
            No payroll records match your current
            filters.
          </p>

        </div>

      )}

    </div>
  );
};

export default PayrollTable;