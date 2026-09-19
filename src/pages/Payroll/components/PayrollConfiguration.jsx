import React, { useMemo, useState } from "react";
import {
  BsCalculator,
  BsCheckCircleFill,
  BsCurrencyRupee,
  BsDashCircleFill,
  BsGearFill,
  BsGraphUp,
  BsPencilSquare,
  BsPeopleFill,
  BsPlusLg,
  BsShieldCheck,
  BsTrash,
  BsXLg,
  
} from "react-icons/bs";

import "./PayrollConfiguration.css";

const initialComponents = [
  {
    id: 1,
    code: "BASIC",
    name: "Basic Salary",
    type: "Earning",
    calculation: "Fixed",
    value: 32000,
    percentage: 0,
    taxable: true,
    payslip: true,
    mandatory: true,
    status: "Active",
    description: "Basic monthly salary of the employee.",
  },
  {
    id: 2,
    code: "HRA",
    name: "House Rent Allowance",
    type: "Earning",
    calculation: "Percentage",
    value: 0,
    percentage: 37.5,
    taxable: true,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "House rent allowance calculated as a percentage of basic salary.",
  },
  {
    id: 3,
    code: "SPECIAL",
    name: "Special Allowance",
    type: "Earning",
    calculation: "Fixed",
    value: 6000,
    percentage: 0,
    taxable: true,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "Additional salary allowance assigned to the employee.",
  },
  {
    id: 4,
    code: "CONVEYANCE",
    name: "Conveyance Allowance",
    type: "Earning",
    calculation: "Fixed",
    value: 3000,
    percentage: 0,
    taxable: false,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "Transportation allowance provided to employees.",
  },
  {
    id: 5,
    code: "MEDICAL",
    name: "Medical Allowance",
    type: "Earning",
    calculation: "Fixed",
    value: 2000,
    percentage: 0,
    taxable: false,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "Medical allowance component.",
  },
  {
    id: 6,
    code: "PF",
    name: "Provident Fund",
    type: "Deduction",
    calculation: "Percentage",
    value: 0,
    percentage: 12,
    taxable: false,
    payslip: true,
    mandatory: true,
    status: "Active",
    description: "Employee provident fund contribution.",
  },
  {
    id: 7,
    code: "ESI",
    name: "Employee State Insurance",
    type: "Deduction",
    calculation: "Percentage",
    value: 0,
    percentage: 0.75,
    taxable: false,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "Employee ESI contribution.",
  },
  {
    id: 8,
    code: "PT",
    name: "Professional Tax",
    type: "Deduction",
    calculation: "Fixed",
    value: 200,
    percentage: 0,
    taxable: false,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "Professional tax deduction.",
  },
  {
    id: 9,
    code: "TDS",
    name: "Income Tax / TDS",
    type: "Deduction",
    calculation: "Percentage",
    value: 0,
    percentage: 2.18,
    taxable: true,
    payslip: true,
    mandatory: false,
    status: "Active",
    description: "Tax deducted at source based on applicable payroll tax rules.",
  },
  {
    id: 10,
    code: "LOP",
    name: "Loss of Pay",
    type: "Deduction",
    calculation: "Per Day",
    value: 0,
    percentage: 0,
    taxable: false,
    payslip: true,
    mandatory: true,
    status: "Active",
    description: "Salary deduction for loss of pay days.",
  },
  {
    id: 11,
    code: "LOAN",
    name: "Loan Deduction",
    type: "Deduction",
    calculation: "Fixed",
    value: 0,
    percentage: 0,
    taxable: false,
    payslip: true,
    mandatory: false,
    status: "Inactive",
    description: "Monthly employee loan recovery.",
  },
  {
    id: 12,
    code: "BONUS",
    name: "Performance Bonus",
    type: "Earning",
    calculation: "Fixed",
    value: 0,
    percentage: 0,
    taxable: true,
    payslip: true,
    mandatory: false,
    status: "Inactive",
    description: "Performance-based bonus component.",
  },
];

const componentTypeOptions = [
  { value: "", label: "All Types" },
  { value: "Earning", label: "Earnings" },
  { value: "Deduction", label: "Deductions" },
];

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const emptyForm = {
  code: "",
  name: "",
  type: "Earning",
  calculation: "Fixed",
  value: "",
  percentage: "",
  taxable: true,
  payslip: true,
  mandatory: false,
  status: "Active",
  description: "",
};

const PayrollConfiguration = () => {
  const [components, setComponents] = useState(initialComponents);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [activeTab, setActiveTab] = useState("components");

  const [showModal, setShowModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [settings, setSettings] = useState({
    workingDays: "26",
    lopCalculation: "Calendar Days",
    salaryRounding: "Nearest Rupee",
    overtimeEnabled: true,
    autoProcess: false,
    attendanceRequired: true,
    negativeSalaryAllowed: false,
    payslipEnabled: true,
  });

  const filteredComponents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return components.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.code.toLowerCase().includes(searchValue) ||
        item.name.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue);

      const matchesType =
        !selectedType || item.type === selectedType;

      const matchesStatus =
        !selectedStatus || item.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [
    components,
    search,
    selectedType,
    selectedStatus,
  ]);

  const earningCount = components.filter(
    (item) => item.type === "Earning"
  ).length;

  const deductionCount = components.filter(
    (item) => item.type === "Deduction"
  ).length;

  const activeCount = components.filter(
    (item) => item.status === "Active"
  ).length;

  const mandatoryCount = components.filter(
    (item) => item.mandatory
  ).length;

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const openAddModal = () => {
    setEditingComponent(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (component) => {
    setEditingComponent(component);

    setForm({
      code: component.code,
      name: component.name,
      type: component.type,
      calculation: component.calculation,
      value:
        component.value === 0
          ? ""
          : String(component.value),
      percentage:
        component.percentage === 0
          ? ""
          : String(component.percentage),
      taxable: component.taxable,
      payslip: component.payslip,
      mandatory: component.mandatory,
      status: component.status,
      description: component.description,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingComponent(null);
    setForm(emptyForm);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!form.code.trim()) {
      alert("Please enter component code.");
      return;
    }

    if (!form.name.trim()) {
      alert("Please enter component name.");
      return;
    }

    if (
      form.calculation === "Percentage" &&
      !form.percentage
    ) {
      alert("Please enter percentage.");
      return;
    }

    if (
      form.calculation === "Fixed" &&
      !form.value
    ) {
      alert("Please enter fixed amount.");
      return;
    }

    if (editingComponent) {
      setComponents((prev) =>
        prev.map((item) =>
          item.id === editingComponent.id
            ? {
                ...item,
                code: form.code.trim().toUpperCase(),
                name: form.name.trim(),
                type: form.type,
                calculation: form.calculation,
                value:
                  form.calculation === "Fixed"
                    ? Number(form.value)
                    : 0,
                percentage:
                  form.calculation === "Percentage"
                    ? Number(form.percentage)
                    : 0,
                taxable: form.taxable,
                payslip: form.payslip,
                mandatory: form.mandatory,
                status: form.status,
                description: form.description.trim(),
              }
            : item
        )
      );

      alert("Payroll component updated successfully.");
    } else {
      const newComponent = {
        id: Date.now(),
        code: form.code.trim().toUpperCase(),
        name: form.name.trim(),
        type: form.type,
        calculation: form.calculation,
        value:
          form.calculation === "Fixed"
            ? Number(form.value)
            : 0,
        percentage:
          form.calculation === "Percentage"
            ? Number(form.percentage)
            : 0,
        taxable: form.taxable,
        payslip: form.payslip,
        mandatory: form.mandatory,
        status: form.status,
        description: form.description.trim(),
      };

      setComponents((prev) => [
        ...prev,
        newComponent,
      ]);

      alert("Payroll component added successfully.");
    }

    closeModal();
  };

  const toggleStatus = (component) => {
    const nextStatus =
      component.status === "Active"
        ? "Inactive"
        : "Active";

    setComponents((prev) =>
      prev.map((item) =>
        item.id === component.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );
  };

  const handleDelete = (component) => {
    if (component.mandatory) {
      alert(
        "Mandatory payroll components cannot be deleted."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete "${component.name}" payroll component?`
    );

    if (!confirmed) return;

    setComponents((prev) =>
      prev.filter((item) => item.id !== component.id)
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedType("");
    setSelectedStatus("");
  };

  const handleSettingChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSettings = () => {
    console.log("Payroll Settings:", settings);
    alert("Payroll settings saved successfully.");
  };

  return (
    <section className="payroll-config-section">
      {/* HEADER */}

      <div className="payroll-config-header">
        <div>
          <span className="payroll-config-eyebrow">
            PAYROLL ADMINISTRATION
          </span>

          <h2>Payroll Configuration</h2>

          <p>
            Configure salary components, deductions and payroll
            calculation rules.
          </p>
        </div>

        {activeTab === "components" && (
          <button
            className="payroll-config-add-btn"
            onClick={openAddModal}
          >
            <BsPlusLg />
            Add Component
          </button>
        )}
      </div>

      {/* TABS */}

      <div className="payroll-config-tabs">
        <button
          className={
            activeTab === "components"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("components")}
        >
          <BsCalculator />
          Salary Components
        </button>

        <button
          className={
            activeTab === "settings"
              ? "active"
              : ""
          }
          onClick={() => setActiveTab("settings")}
        >
          <BsGearFill />
          Payroll Settings
        </button>
      </div>

      {activeTab === "components" ? (
        <>
          {/* STATS */}

          <div className="payroll-config-stats">
            <div className="payroll-config-stat-card">
              <div className="payroll-config-stat-icon total">
                <BsCurrencyRupee />
              </div>

              <div>
                <span>Total Components</span>
                <strong>{components.length}</strong>
              </div>
            </div>

            <div className="payroll-config-stat-card">
              <div className="payroll-config-stat-icon earning">
                <BsGraphUp />
              </div>

              <div>
                <span>Earning Components</span>
                <strong>{earningCount}</strong>
              </div>
            </div>

            <div className="payroll-config-stat-card">
              <div className="payroll-config-stat-icon deduction">
                <BsDashCircleFill />
              </div>

              <div>
                <span>Deduction Components</span>
                <strong>{deductionCount}</strong>
              </div>
            </div>

            <div className="payroll-config-stat-card">
              <div className="payroll-config-stat-icon active">
                <BsCheckCircleFill />
              </div>

              <div>
                <span>Active Components</span>
                <strong>{activeCount}</strong>
              </div>
            </div>

            <div className="payroll-config-stat-card">
              <div className="payroll-config-stat-icon mandatory">
                <BsShieldCheck />
              </div>

              <div>
                <span>Mandatory</span>
                <strong>{mandatoryCount}</strong>
              </div>
            </div>
          </div>

          {/* FILTERS */}

          <div className="payroll-config-filter-card">
            <div className="payroll-config-filter-heading">
              <div>
                <h3>Salary Components</h3>

                <p>
                  Manage earnings and deduction components
                  used during payroll processing.
                </p>
              </div>

              <button
                className="payroll-config-reset-btn"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>

            <div className="payroll-config-filter-grid">
              <div className="payroll-config-field search">
                <label>Search Component</label>

                <input
                  type="text"
                  placeholder="Search by code, name..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>

              <div className="payroll-config-field">
                <label>Component Type</label>

                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value)
                  }
                >
                  {componentTypeOptions.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="payroll-config-field">
                <label>Status</label>

                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value)
                  }
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* COMPONENT TABLE */}

          <div className="payroll-config-table-card">
            <div className="payroll-config-table-wrapper">
              <table className="payroll-config-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Type</th>
                    <th>Calculation</th>
                    <th>Value</th>
                    <th>Taxable</th>
                    <th>Payslip</th>
                    <th>Mandatory</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComponents.length > 0 ? (
                    filteredComponents.map(
                      (component) => (
                        <tr key={component.id}>
                          <td>
                            <div className="payroll-component-cell">
                              <div className="payroll-component-icon">
                                {component.type ===
                                "Earning" ? (
                                  <BsCurrencyRupee />
                                ) : (
                                  <BsDashCircleFill />
                                )}
                              </div>

                              <div>
                                <strong>
                                  {component.name}
                                </strong>

                                <span>
                                  {component.code}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span
                              className={`payroll-component-type ${
                                component.type ===
                                "Earning"
                                  ? "earning"
                                  : "deduction"
                              }`}
                            >
                              {component.type}
                            </span>
                          </td>

                          <td>
                            <span className="payroll-component-calculation">
                              {component.calculation}
                            </span>
                          </td>

                          <td>
                            <strong className="payroll-component-value">
                              {component.calculation ===
                              "Percentage"
                                ? `${component.percentage}%`
                                : component.calculation ===
                                  "Per Day"
                                ? "Per Day"
                                : formatCurrency(
                                    component.value
                                  )}
                            </strong>
                          </td>

                          <td>
                            <span
                              className={
                                component.taxable
                                  ? "payroll-badge yes"
                                  : "payroll-badge no"
                              }
                            >
                              {component.taxable
                                ? "Yes"
                                : "No"}
                            </span>
                          </td>

                          <td>
                            <span
                              className={
                                component.payslip
                                  ? "payroll-badge yes"
                                  : "payroll-badge no"
                              }
                            >
                              {component.payslip
                                ? "Visible"
                                : "Hidden"}
                            </span>
                          </td>

                          <td>
                            {component.mandatory ? (
                              <BsCheckCircleFill className="mandatory-icon" />
                            ) : (
                              <span className="optional-text">
                                Optional
                              </span>
                            )}
                          </td>

                          <td>
                            <button
                              className={`payroll-component-status ${
                                component.status ===
                                "Active"
                                  ? "active"
                                  : "inactive"
                              }`}
                              onClick={() =>
                                toggleStatus(
                                  component
                                )
                              }
                            >
                              <span />
                              {component.status}
                            </button>
                          </td>

                          <td>
                            <div className="payroll-component-actions">
                              <button
                                title="Edit"
                                onClick={() =>
                                  openEditModal(
                                    component
                                  )
                                }
                              >
                                <BsPencilSquare />
                              </button>

                              <button
                                title="Delete"
                                className="delete"
                                onClick={() =>
                                  handleDelete(
                                    component
                                  )
                                }
                              >
                                <BsTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="payroll-config-empty"
                      >
                        <BsDashCircleFill />

                        <strong>
                          No payroll components found
                        </strong>

                        <span>
                          Try changing your search or
                          filters.
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* SETTINGS */

        <div className="payroll-settings-container">
          <div className="payroll-settings-card">
            <div className="payroll-settings-card-header">
              <div className="payroll-settings-card-icon">
                <BsCalculator />
              </div>

              <div>
                <h3>Salary Calculation</h3>

                <p>
                  Configure how employee salaries are
                  calculated.
                </p>
              </div>
            </div>

            <div className="payroll-settings-grid">
              <div className="payroll-settings-field">
                <label>Standard Working Days</label>

                <input
                  type="number"
                  min="1"
                  max="31"
                  value={settings.workingDays}
                  onChange={(e) =>
                    handleSettingChange(
                      "workingDays",
                      e.target.value
                    )
                  }
                />

                <small>
                  Default working days used for monthly
                  salary calculation.
                </small>
              </div>

              <div className="payroll-settings-field">
                <label>LOP Calculation</label>

                <select
                  value={settings.lopCalculation}
                  onChange={(e) =>
                    handleSettingChange(
                      "lopCalculation",
                      e.target.value
                    )
                  }
                >
                  <option value="Calendar Days">
                    Calendar Days
                  </option>
                  <option value="Working Days">
                    Working Days
                  </option>
                  <option value="Fixed 26 Days">
                    Fixed 26 Days
                  </option>
                </select>

                <small>
                  Determines the daily salary used for LOP.
                </small>
              </div>

              <div className="payroll-settings-field">
                <label>Salary Rounding</label>

                <select
                  value={settings.salaryRounding}
                  onChange={(e) =>
                    handleSettingChange(
                      "salaryRounding",
                      e.target.value
                    )
                  }
                >
                  <option value="Nearest Rupee">
                    Nearest Rupee
                  </option>
                  <option value="Round Down">
                    Round Down
                  </option>
                  <option value="Round Up">
                    Round Up
                  </option>
                  <option value="Two Decimal Places">
                    Two Decimal Places
                  </option>
                </select>

                <small>
                  Controls decimal rounding during salary
                  calculations.
                </small>
              </div>

              <div className="payroll-settings-field">
                <label>Overtime</label>

                <button
                  type="button"
                  className={`payroll-toggle ${
                    settings.overtimeEnabled
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    handleSettingChange(
                      "overtimeEnabled",
                      !settings.overtimeEnabled
                    )
                  }
                >
                  <span />
                  {settings.overtimeEnabled
                    ? "Enabled"
                    : "Disabled"}
                </button>

                <small>
                  Allow overtime calculations in payroll.
                </small>
              </div>
            </div>
          </div>

          <div className="payroll-settings-card">
            <div className="payroll-settings-card-header">
              <div className="payroll-settings-card-icon">
                <BsPeopleFill />
              </div>

              <div>
                <h3>Attendance & Payroll</h3>

                <p>
                  Configure attendance requirements for
                  payroll processing.
                </p>
              </div>
            </div>

            <div className="payroll-settings-options">
              <div className="payroll-setting-row">
                <div>
                  <strong>
                    Attendance Required
                  </strong>

                  <span>
                    Require attendance data before payroll
                    processing.
                  </span>
                </div>

                <button
                  type="button"
                  className={`payroll-toggle ${
                    settings.attendanceRequired
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    handleSettingChange(
                      "attendanceRequired",
                      !settings.attendanceRequired
                    )
                  }
                >
                  <span />
                </button>
              </div>

              <div className="payroll-setting-row">
                <div>
                  <strong>
                    Allow Negative Salary
                  </strong>

                  <span>
                    Allow payroll to generate a negative
                    net salary.
                  </span>
                </div>

                <button
                  type="button"
                  className={`payroll-toggle ${
                    settings.negativeSalaryAllowed
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    handleSettingChange(
                      "negativeSalaryAllowed",
                      !settings.negativeSalaryAllowed
                    )
                  }
                >
                  <span />
                </button>
              </div>

              <div className="payroll-setting-row">
                <div>
                  <strong>
                    Automatic Payroll Processing
                  </strong>

                  <span>
                    Automatically process payroll when all
                    conditions are satisfied.
                  </span>
                </div>

                <button
                  type="button"
                  className={`payroll-toggle ${
                    settings.autoProcess
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    handleSettingChange(
                      "autoProcess",
                      !settings.autoProcess
                    )
                  }
                >
                  <span />
                </button>
              </div>

              <div className="payroll-setting-row">
                <div>
                  <strong>
                    Payslip Generation
                  </strong>

                  <span>
                    Enable employee payslip generation.
                  </span>
                </div>

                <button
                  type="button"
                  className={`payroll-toggle ${
                    settings.payslipEnabled
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    handleSettingChange(
                      "payslipEnabled",
                      !settings.payslipEnabled
                    )
                  }
                >
                  <span />
                </button>
              </div>
            </div>

            <div className="payroll-settings-footer">
              <button
                className="payroll-settings-save"
                onClick={saveSettings}
              >
                <BsCheckCircleFill />
                Save Payroll Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div className="payroll-config-modal-overlay">
          <div className="payroll-config-modal">
            <div className="payroll-config-modal-header">
              <div>
                <span>
                  {editingComponent
                    ? "EDIT COMPONENT"
                    : "NEW COMPONENT"}
                </span>

                <h3>
                  {editingComponent
                    ? "Edit Payroll Component"
                    : "Add Payroll Component"}
                </h3>
              </div>

              <button onClick={closeModal}>
                <BsXLg />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="payroll-config-form"
            >
              <div className="payroll-config-form-grid">
                <div className="payroll-config-form-field">
                  <label>
                    Component Code <b>*</b>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. BASIC"
                    value={form.code}
                    maxLength={20}
                    onChange={(e) =>
                      handleFormChange(
                        "code",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="payroll-config-form-field">
                  <label>
                    Component Name <b>*</b>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Basic Salary"
                    value={form.name}
                    onChange={(e) =>
                      handleFormChange(
                        "name",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="payroll-config-form-field">
                  <label>Component Type</label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      handleFormChange(
                        "type",
                        e.target.value
                      )
                    }
                  >
                    <option value="Earning">
                      Earning
                    </option>

                    <option value="Deduction">
                      Deduction
                    </option>
                  </select>
                </div>

                <div className="payroll-config-form-field">
                  <label>Calculation Type</label>

                  <select
                    value={form.calculation}
                    onChange={(e) =>
                      handleFormChange(
                        "calculation",
                        e.target.value
                      )
                    }
                  >
                    <option value="Fixed">
                      Fixed Amount
                    </option>

                    <option value="Percentage">
                      Percentage
                    </option>

                    <option value="Per Day">
                      Per Day
                    </option>
                  </select>
                </div>

                {form.calculation ===
                  "Fixed" && (
                  <div className="payroll-config-form-field">
                    <label>
                      Fixed Amount <b>*</b>
                    </label>

                    <div className="payroll-input-prefix">
                      <span>₹</span>

                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={form.value}
                        onChange={(e) =>
                          handleFormChange(
                            "value",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )}

                {form.calculation ===
                  "Percentage" && (
                  <div className="payroll-config-form-field">
                    <label>
                      Percentage <b>*</b>
                    </label>

                    <div className="payroll-input-prefix">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="0"
                        value={form.percentage}
                        onChange={(e) =>
                          handleFormChange(
                            "percentage",
                            e.target.value
                          )
                        }
                      />

                      <span>%</span>
                    </div>
                  </div>
                )}

                <div className="payroll-config-form-field">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      handleFormChange(
                        "status",
                        e.target.value
                      )
                    }
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              </div>

              <div className="payroll-config-checkbox-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={form.taxable}
                    onChange={(e) =>
                      handleFormChange(
                        "taxable",
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    <strong>Taxable</strong>
                    <small>
                      Include this component for tax
                      calculation.
                    </small>
                  </span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={form.payslip}
                    onChange={(e) =>
                      handleFormChange(
                        "payslip",
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    <strong>Show on Payslip</strong>
                    <small>
                      Display this component on employee
                      payslips.
                    </small>
                  </span>
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={form.mandatory}
                    onChange={(e) =>
                      handleFormChange(
                        "mandatory",
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    <strong>Mandatory</strong>
                    <small>
                      Prevent accidental deletion of this
                      component.
                    </small>
                  </span>
                </label>
              </div>

              <div className="payroll-config-form-field full">
                <label>Description</label>

                <textarea
                  rows="4"
                  placeholder="Enter component description..."
                  value={form.description}
                  onChange={(e) =>
                    handleFormChange(
                      "description",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="payroll-config-modal-footer">
                <button
                  type="button"
                  className="payroll-config-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="payroll-config-save"
                >
                  <BsCheckCircleFill />

                  {editingComponent
                    ? "Update Component"
                    : "Save Component"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PayrollConfiguration;