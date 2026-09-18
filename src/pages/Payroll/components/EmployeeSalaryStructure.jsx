import React, { useMemo, useState } from "react";
import {
  BsCalculator,
  BsCheckCircleFill,
  BsChevronDown,
  BsCurrencyRupee,
  BsGraphDownArrow,
  BsGraphUpArrow,
  BsPencilSquare,
  BsPeopleFill,
  BsPlusLg,
  BsTrash,
  BsXCircleFill,
} from "react-icons/bs";

import { payrollData } from "./PayrollData";
import "./EmployeeSalaryStructure.css";

const initialSalaryComponents = [
  {
    id: 1,
    code: "BASIC",
    name: "Basic Salary",
    type: "Earning",
    calculation: "Fixed",
    value: 32000,
    taxable: true,
  },
  {
    id: 2,
    code: "HRA",
    name: "House Rent Allowance",
    type: "Earning",
    calculation: "Percentage",
    value: 37.5,
    taxable: true,
    base: "Basic Salary",
  },
  {
    id: 3,
    code: "SPECIAL",
    name: "Special Allowance",
    type: "Earning",
    calculation: "Fixed",
    value: 6000,
    taxable: true,
  },
  {
    id: 4,
    code: "CONVEYANCE",
    name: "Conveyance Allowance",
    type: "Earning",
    calculation: "Fixed",
    value: 3000,
    taxable: false,
  },
  {
    id: 5,
    code: "MEDICAL",
    name: "Medical Allowance",
    type: "Earning",
    calculation: "Fixed",
    value: 2000,
    taxable: false,
  },
  {
    id: 6,
    code: "PF",
    name: "Provident Fund",
    type: "Deduction",
    calculation: "Percentage",
    value: 12,
    taxable: false,
    base: "Basic Salary",
  },
  {
    id: 7,
    code: "ESI",
    name: "Employee State Insurance",
    type: "Deduction",
    calculation: "Percentage",
    value: 0.75,
    taxable: false,
    base: "Gross Salary",
  },
  {
    id: 8,
    code: "PT",
    name: "Professional Tax",
    type: "Deduction",
    calculation: "Fixed",
    value: 200,
    taxable: false,
  },
  {
    id: 9,
    code: "TDS",
    name: "Income Tax / TDS",
    type: "Deduction",
    calculation: "Percentage",
    value: 2.18,
    taxable: true,
    base: "Gross Salary",
  },
];

const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};

const calculateComponentAmount = (component, values) => {
  if (component.calculation === "Fixed") {
    return Number(component.value || 0);
  }

  if (component.calculation === "Percentage") {
    let baseValue = 0;

    if (component.base === "Basic Salary") {
      baseValue = Number(values.basicSalary || 0);
    }

    if (component.base === "Gross Salary") {
      baseValue = Number(values.grossSalary || 0);
    }

    return (baseValue * Number(component.value || 0)) / 100;
  }

  return 0;
};

const EmployeeSalaryStructure = () => {
  const [employees] = useState(payrollData);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    payrollData[0]?.employeeId || ""
  );

  const [search, setSearch] = useState("");

  const [components, setComponents] = useState(
    initialSalaryComponents.map((item) => ({ ...item }))
  );

  const [effectiveDate, setEffectiveDate] = useState("2026-09-01");

  const [isEditing, setIsEditing] = useState(false);

  const selectedEmployee = useMemo(() => {
    return employees.find(
      (employee) => employee.employeeId === selectedEmployeeId
    );
  }, [employees, selectedEmployeeId]);

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return employees;
    }

    return employees.filter(
      (employee) =>
        employee.employeeName.toLowerCase().includes(keyword) ||
        employee.employeeId.toLowerCase().includes(keyword) ||
        employee.department.toLowerCase().includes(keyword)
    );
  }, [employees, search]);

  const earnings = useMemo(() => {
    return components.filter((item) => item.type === "Earning");
  }, [components]);

  const deductions = useMemo(() => {
    return components.filter((item) => item.type === "Deduction");
  }, [components]);

  const basicSalary = useMemo(() => {
    const basic = components.find((item) => item.code === "BASIC");

    return basic ? Number(basic.value || 0) : 0;
  }, [components]);

  const calculateSalary = useMemo(() => {
    let earningTotal = 0;

    const earningValues = {};

    earnings.forEach((component) => {
      let amount = 0;

      if (component.calculation === "Fixed") {
        amount = Number(component.value || 0);
      } else if (
        component.calculation === "Percentage" &&
        component.base === "Basic Salary"
      ) {
        amount =
          (basicSalary * Number(component.value || 0)) / 100;
      }

      earningValues[component.id] = amount;
      earningTotal += amount;
    });

    let deductionTotal = 0;

    deductions.forEach((component) => {
      let amount = 0;

      if (component.calculation === "Fixed") {
        amount = Number(component.value || 0);
      } else if (
        component.calculation === "Percentage" &&
        component.base === "Basic Salary"
      ) {
        amount =
          (basicSalary * Number(component.value || 0)) / 100;
      } else if (
        component.calculation === "Percentage" &&
        component.base === "Gross Salary"
      ) {
        amount =
          (earningTotal * Number(component.value || 0)) / 100;
      }

      deductionTotal += amount;
    });

    const netSalary = earningTotal - deductionTotal;

    return {
      grossSalary: earningTotal,
      totalDeductions: deductionTotal,
      netSalary,
      annualGross: earningTotal * 12,
      annualNet: netSalary * 12,
      earningValues,
    };
  }, [components, earnings, deductions, basicSalary]);

  const updateComponentValue = (id, value) => {
    setComponents((previous) =>
      previous.map((component) =>
        component.id === id
          ? {
              ...component,
              value: value === "" ? "" : Number(value),
            }
          : component
      )
    );
  };

  const removeComponent = (id) => {
    setComponents((previous) =>
      previous.filter((component) => component.id !== id)
    );
  };

  const addCustomComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      code: `CUSTOM_${Date.now()}`,
      name: type === "Earning" ? "New Earning" : "New Deduction",
      type,
      calculation: "Fixed",
      value: 0,
      taxable: true,
    };

    setComponents((previous) => [...previous, newComponent]);
    setIsEditing(true);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  const handleSave = () => {
    const payload = {
      employeeId: selectedEmployee?.employeeId,
      employeeName: selectedEmployee?.employeeName,
      effectiveDate,
      components,
      grossSalary: calculateSalary.grossSalary,
      totalDeductions: calculateSalary.totalDeductions,
      netSalary: calculateSalary.netSalary,
      annualGross: calculateSalary.annualGross,
      annualNet: calculateSalary.annualNet,
    };

    console.log("Salary Structure:", payload);

    alert("Salary structure saved successfully.");
    setIsEditing(false);
  };

  const handleReset = () => {
    setComponents(
      initialSalaryComponents.map((item) => ({ ...item }))
    );
    setEffectiveDate("2026-09-01");
    setIsEditing(false);
  };

  return (
    <section className="salary-structure">

      {/* HEADER */}
      <div className="salary-structure-header">

        <div>
          <div className="salary-structure-title-row">
            <div className="salary-structure-title-icon">
              <BsCalculator />
            </div>

            <div>
              <h2>Employee Salary Structure</h2>
              <p>
                Configure individual employee salary components and
                calculate monthly payroll.
              </p>
            </div>
          </div>
        </div>

        <div className="salary-structure-header-actions">
          <button
            className={`salary-action-btn ${
              isEditing ? "secondary" : "primary"
            }`}
            onClick={() => setIsEditing((previous) => !previous)}
          >
            <BsPencilSquare />
            {isEditing ? "Cancel Editing" : "Edit Structure"}
          </button>
        </div>

      </div>

      {/* EMPLOYEE SELECTOR */}
      <div className="salary-employee-selector">

        <div className="salary-selector-left">

          <div className="salary-selector-icon">
            <BsPeopleFill />
          </div>

          <div className="salary-selector-content">

            <label>Select Employee</label>

            <div className="salary-select-wrapper">

              <select
                value={selectedEmployeeId}
                onChange={handleEmployeeChange}
              >
                {filteredEmployees.map((employee) => (
                  <option
                    key={employee.employeeId}
                    value={employee.employeeId}
                  >
                    {employee.employeeName} — {employee.employeeId}
                  </option>
                ))}
              </select>

              <BsChevronDown />
            </div>

          </div>

        </div>

        <div className="salary-search-wrapper">

          <label>Search Employee</label>

          <input
            type="text"
            placeholder="Search name, ID or department..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

        </div>

      </div>

      {/* EMPLOYEE PROFILE */}
      {selectedEmployee && (
        <div className="salary-employee-card">

          <div className="salary-employee-profile">

            <div className="salary-avatar">
              {selectedEmployee.initials ||
                selectedEmployee.employeeName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
            </div>

            <div className="salary-employee-info">
              <h3>{selectedEmployee.employeeName}</h3>

              <p>
                {selectedEmployee.employeeId}
                <span>•</span>
                {selectedEmployee.designation}
              </p>

              <small>{selectedEmployee.department}</small>
            </div>

          </div>

          <div className="salary-effective-date">

            <label>Effective From</label>

            <input
              type="date"
              value={effectiveDate}
              onChange={(event) =>
                setEffectiveDate(event.target.value)
              }
              disabled={!isEditing}
            />

          </div>

        </div>
      )}

      {/* SALARY SUMMARY */}
      <div className="salary-summary-grid">

        <div className="salary-summary-card">

          <div className="salary-summary-icon earning">
            <BsGraphUpArrow />
          </div>

          <div>
            <span>Gross Monthly</span>
            <strong>
              {formatCurrency(calculateSalary.grossSalary)}
            </strong>
          </div>

        </div>

        <div className="salary-summary-card">

          <div className="salary-summary-icon deduction">
            <BsGraphDownArrow />
          </div>

          <div>
            <span>Total Deductions</span>
            <strong>
              {formatCurrency(calculateSalary.totalDeductions)}
            </strong>
          </div>

        </div>

        <div className="salary-summary-card highlight">

          <div className="salary-summary-icon net">
            <BsCurrencyRupee />
          </div>

          <div>
            <span>Net Monthly Salary</span>
            <strong>
              {formatCurrency(calculateSalary.netSalary)}
            </strong>
          </div>

        </div>

        <div className="salary-summary-card">

          <div className="salary-summary-icon">
            <BsCalculator />
          </div>

          <div>
            <span>Annual Gross</span>
            <strong>
              {formatCurrency(calculateSalary.annualGross)}
            </strong>
          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="salary-structure-grid">

        {/* EARNINGS */}
        <div className="salary-section-card">

          <div className="salary-section-header">

            <div>
              <h3>Earnings</h3>
              <p>Salary components paid to the employee.</p>
            </div>

            {isEditing && (
              <button
                className="salary-add-btn"
                onClick={() => addCustomComponent("Earning")}
              >
                <BsPlusLg />
                Add
              </button>
            )}

          </div>

          <div className="salary-component-list">

            {earnings.map((component) => {

              const amount =
                component.calculation === "Percentage" &&
                component.base === "Basic Salary"
                  ? (basicSalary * Number(component.value || 0)) / 100
                  : Number(component.value || 0);

              return (
                <div
                  className="salary-component-row"
                  key={component.id}
                >

                  <div className="salary-component-info">

                    <div className="salary-component-code">
                      {component.code}
                    </div>

                    <div>
                      <h4>{component.name}</h4>

                      <p>
                        {component.calculation}

                        {component.calculation === "Percentage" &&
                          ` • ${component.value}%`}

                        {component.base &&
                          ` • ${component.base}`}
                      </p>
                    </div>

                  </div>

                  <div className="salary-component-control">

                    {isEditing ? (
                      <div className="salary-value-input">

                        <input
                          type="number"
                          min="0"
                          value={component.value}
                          onChange={(event) =>
                            updateComponentValue(
                              component.id,
                              event.target.value
                            )
                          }
                        />

                        <span>
                          {component.calculation === "Percentage"
                            ? "%"
                            : "₹"}
                        </span>

                      </div>
                    ) : (
                      <strong>
                        {component.calculation === "Percentage"
                          ? `${component.value}%`
                          : formatCurrency(component.value)}
                      </strong>
                    )}

                    <span className="salary-calculated-value">
                      {formatCurrency(amount)}
                    </span>

                    {isEditing && (
                      <button
                        className="salary-delete-btn"
                        onClick={() =>
                          removeComponent(component.id)
                        }
                      >
                        <BsTrash />
                      </button>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

          <div className="salary-section-total">

            <span>Total Earnings</span>

            <strong>
              {formatCurrency(calculateSalary.grossSalary)}
            </strong>

          </div>

        </div>

        {/* DEDUCTIONS */}
        <div className="salary-section-card">

          <div className="salary-section-header">

            <div>
              <h3>Deductions</h3>
              <p>Statutory and other payroll deductions.</p>
            </div>

            {isEditing && (
              <button
                className="salary-add-btn"
                onClick={() => addCustomComponent("Deduction")}
              >
                <BsPlusLg />
                Add
              </button>
            )}

          </div>

          <div className="salary-component-list">

            {deductions.map((component) => {

              let amount = 0;

              if (component.calculation === "Fixed") {
                amount = Number(component.value || 0);
              }

              if (
                component.calculation === "Percentage" &&
                component.base === "Basic Salary"
              ) {
                amount =
                  (basicSalary * Number(component.value || 0)) /
                  100;
              }

              if (
                component.calculation === "Percentage" &&
                component.base === "Gross Salary"
              ) {
                amount =
                  (calculateSalary.grossSalary *
                    Number(component.value || 0)) /
                  100;
              }

              return (
                <div
                  className="salary-component-row"
                  key={component.id}
                >

                  <div className="salary-component-info">

                    <div className="salary-component-code deduction-code">
                      {component.code}
                    </div>

                    <div>
                      <h4>{component.name}</h4>

                      <p>
                        {component.calculation}

                        {component.calculation === "Percentage" &&
                          ` • ${component.value}%`}

                        {component.base &&
                          ` • ${component.base}`}
                      </p>
                    </div>

                  </div>

                  <div className="salary-component-control">

                    {isEditing ? (
                      <div className="salary-value-input">

                        <input
                          type="number"
                          min="0"
                          value={component.value}
                          onChange={(event) =>
                            updateComponentValue(
                              component.id,
                              event.target.value
                            )
                          }
                        />

                        <span>
                          {component.calculation === "Percentage"
                            ? "%"
                            : "₹"}
                        </span>

                      </div>
                    ) : (
                      <strong>
                        {component.calculation === "Percentage"
                          ? `${component.value}%`
                          : formatCurrency(component.value)}
                      </strong>
                    )}

                    <span className="salary-calculated-value deduction-value">
                      {formatCurrency(amount)}
                    </span>

                    {isEditing && (
                      <button
                        className="salary-delete-btn"
                        onClick={() =>
                          removeComponent(component.id)
                        }
                      >
                        <BsTrash />
                      </button>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

          <div className="salary-section-total deduction-total">

            <span>Total Deductions</span>

            <strong>
              {formatCurrency(calculateSalary.totalDeductions)}
            </strong>

          </div>

        </div>

      </div>

      {/* FINAL PREVIEW */}
      <div className="salary-final-card">

        <div className="salary-final-header">

          <div>
            <h3>Salary Preview</h3>
            <p>
              Final monthly salary calculation for{" "}
              {selectedEmployee?.employeeName}.
            </p>
          </div>

          <div className="salary-status-badge">
            <BsCheckCircleFill />
            Structure Ready
          </div>

        </div>

        <div className="salary-final-grid">

          <div>
            <span>Basic Salary</span>
            <strong>{formatCurrency(basicSalary)}</strong>
          </div>

          <div>
            <span>Gross Salary</span>
            <strong>
              {formatCurrency(calculateSalary.grossSalary)}
            </strong>
          </div>

          <div>
            <span>Deductions</span>
            <strong>
              {formatCurrency(calculateSalary.totalDeductions)}
            </strong>
          </div>

          <div className="net">
            <span>Net Payable</span>
            <strong>
              {formatCurrency(calculateSalary.netSalary)}
            </strong>
          </div>

        </div>

      </div>

      {/* ACTIONS */}
      {isEditing && (
        <div className="salary-bottom-actions">

          <button
            className="salary-reset-btn"
            onClick={handleReset}
          >
            <BsXCircleFill />
            Reset
          </button>

          <button
            className="salary-save-btn"
            onClick={handleSave}
          >
            <BsCheckCircleFill />
            Save Salary Structure
          </button>

        </div>
      )}

    </section>
  );
};

export default EmployeeSalaryStructure;