import React, { useMemo, useState } from "react";
import {
  BsArrowDown,
  BsArrowUp,
  BsCalendarCheck,
  BsClockHistory,
  BsPeopleFill,
  BsThreeDotsVertical,
} from "react-icons/bs";

import {
  leaveBalanceData,
  balanceLeaveTypes,
  balanceDepartments,
} from "./LeaveBalanceData";

import "./LeaveBalance.css";

const LeaveBalance = () => {
  const [search, setSearch] = useState("");
  const [leaveType, setLeaveType] =
    useState("All Leave Types");
  const [department, setDepartment] =
    useState("All Departments");

  const getBalance = (employee, type) => {
    const balance = employee.balances[type];

    if (!balance) {
      return {
        allocated: 0,
        used: 0,
        pending: 0,
        remaining: 0,
      };
    }

    return {
      ...balance,
      remaining:
        balance.allocated -
        balance.used -
        balance.pending,
    };
  };

  const filteredEmployees = useMemo(() => {
    return leaveBalanceData.filter((employee) => {
      const searchMatch =
        employee.employeeName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.employeeId
          .toLowerCase()
          .includes(search.toLowerCase());

      const departmentMatch =
        department === "All Departments" ||
        employee.department === department;

      return searchMatch && departmentMatch;
    });
  }, [search, department]);

  const statistics = useMemo(() => {
    let allocated = 0;
    let used = 0;
    let pending = 0;
    let remaining = 0;

    filteredEmployees.forEach((employee) => {
      const types =
        leaveType === "All Leave Types"
          ? Object.keys(employee.balances)
          : [leaveType];

      types.forEach((type) => {
        const balance = getBalance(employee, type);

        allocated += balance.allocated;
        used += balance.used;
        pending += balance.pending;
        remaining += balance.remaining;
      });
    });

    const utilization =
      allocated > 0
        ? Math.round((used / allocated) * 100)
        : 0;

    return {
      employees: filteredEmployees.length,
      allocated,
      used,
      pending,
      remaining,
      utilization,
    };
  }, [filteredEmployees, leaveType]);

  const getUtilization = (balance) => {
    if (!balance.allocated) {
      return 0;
    }

    return Math.round(
      (balance.used / balance.allocated) * 100
    );
  };

  return (
    <div className="leave-balance-section">

      {/* Header */}
      <div className="leave-balance-header">

        <div>
          <h2>Leave Balance</h2>
          <p>
            Monitor employee leave allocation and usage
          </p>
        </div>

        <button
          type="button"
          className="balance-more-button"
        >
          <BsThreeDotsVertical />
        </button>

      </div>

      {/* Statistics */}
      <div className="balance-stat-grid">

        <div className="balance-stat-card">

          <div className="balance-stat-icon employees">
            <BsPeopleFill />
          </div>

          <div>
            <span>Employees</span>
            <strong>
              {statistics.employees}
            </strong>
          </div>

        </div>

        <div className="balance-stat-card">

          <div className="balance-stat-icon allocated">
            <BsCalendarCheck />
          </div>

          <div>
            <span>Allocated</span>
            <strong>
              {statistics.allocated}
            </strong>
          </div>

        </div>

        <div className="balance-stat-card">

          <div className="balance-stat-icon used">
            <BsArrowUp />
          </div>

          <div>
            <span>Used</span>
            <strong>
              {statistics.used}
            </strong>
          </div>

        </div>

        <div className="balance-stat-card">

          <div className="balance-stat-icon remaining">
            <BsArrowDown />
          </div>

          <div>
            <span>Remaining</span>
            <strong>
              {statistics.remaining}
            </strong>
          </div>

        </div>

        <div className="balance-stat-card">

          <div className="balance-stat-icon pending">
            <BsClockHistory />
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {statistics.pending}
            </strong>
          </div>

        </div>

      </div>

      {/* Filters */}
      <div className="balance-toolbar">

        <div className="balance-search">

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        >
          {balanceDepartments.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>

        <select
          value={leaveType}
          onChange={(e) =>
            setLeaveType(e.target.value)
          }
        >
          {balanceLeaveTypes.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>

      </div>

      {/* Table */}
      <div className="leave-balance-table-wrapper">

        <table className="leave-balance-table">

          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Allocated</th>
              <th>Used</th>
              <th>Pending</th>
              <th>Remaining</th>
              <th>Utilization</th>
            </tr>
          </thead>

          <tbody>

            {filteredEmployees.map(
              (employee) => {

                const types =
                  leaveType ===
                  "All Leave Types"
                    ? Object.keys(
                        employee.balances
                      )
                    : [leaveType];

                return types.map(
                  (type) => {

                    const balance =
                      getBalance(
                        employee,
                        type
                      );

                    const utilization =
                      getUtilization(
                        balance
                      );

                    return (
                      <tr
                        key={`${employee.id}-${type}`}
                      >

                        <td>

                          <div className="balance-employee">

                            <div className="balance-avatar">
                              {employee.initials}
                            </div>

                            <div>
                              <strong>
                                {employee.employeeName}
                              </strong>

                              <span>
                                {employee.employeeId}
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>
                          <span className="leave-type-badge">
                            {type}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {balance.allocated}
                          </strong>
                        </td>

                        <td>
                          <span className="used-value">
                            {balance.used}
                          </span>
                        </td>

                        <td>
                          <span className="pending-value">
                            {balance.pending}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`remaining-value ${
                              balance.remaining <= 2
                                ? "low"
                                : ""
                            }`}
                          >
                            {balance.remaining}
                          </span>
                        </td>

                        <td>

                          <div className="utilization-wrapper">

                            <div className="utilization-bar">

                              <div
                                className="utilization-fill"
                                style={{
                                  width: `${Math.min(
                                    utilization,
                                    100
                                  )}%`,
                                }}
                              />

                            </div>

                            <span>
                              {utilization}%
                            </span>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                );
              }
            )}

          </tbody>

        </table>

        {filteredEmployees.length === 0 && (
          <div className="balance-empty">
            <BsPeopleFill />
            <strong>
              No employees found
            </strong>
            <span>
              Try changing your search or filters.
            </span>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="balance-footer">

        <span>
          Showing{" "}
          <strong>
            {filteredEmployees.length}
          </strong>{" "}
          employees
        </span>

        <span>
          Leave utilization:{" "}
          <strong>
            {statistics.utilization}%
          </strong>
        </span>

      </div>

    </div>
  );
};

export default LeaveBalance;