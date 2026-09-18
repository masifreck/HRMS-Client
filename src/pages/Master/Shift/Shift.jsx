// src/pages/Masters/Shift/Shift.jsx

import { useMemo, useState } from "react";
import {
  BsClockFill,
  BsCheckCircleFill,
  BsXCircleFill,
  BsPeopleFill,
  BsPlusLg,
  BsSearch,
  BsPencilSquare,
  BsTrash,
  BsEye,
  BsDownload,
  BsArrowLeft,
  BsArrowRight,
  BsXLg,
  BsToggleOn,
  BsToggleOff,
} from "react-icons/bs";

import {
  shiftData,
  shiftStatusOptions,
} from "./ShiftData";

import "./Shift.css";

const ITEMS_PER_PAGE = 6;

const emptyForm = {
  code: "",
  name: "",
  description: "",
  startTime: "09:00",
  endTime: "18:00",
  breakStart: "13:00",
  breakEnd: "14:00",
  workingHours: "8",
  gracePeriod: "15",
  status: "Active",
};

const formatDate = (date) => {
  if (!date) return "-";

  const value = new Date(date);

  return value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (time) => {
  if (!time) return "-";

  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minutes} ${suffix}`;
};

function Shift() {
  const [shifts, setShifts] = useState(shiftData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingShift, setEditingShift] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  /* =====================================================
     STATISTICS
     ===================================================== */

  const totalShifts = shifts.length;

  const activeShifts = shifts.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveShifts = shifts.filter(
    (item) => item.status === "Inactive"
  ).length;

  const assignedEmployees = shifts.reduce(
    (total, item) => total + Number(item.employeeCount || 0),
    0
  );

  /* =====================================================
     FILTER
     ===================================================== */

  const filteredShifts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return shifts.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [shifts, search, statusFilter]);

  /* =====================================================
     PAGINATION
     ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredShifts.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedShifts = filteredShifts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const startItem =
    filteredShifts.length === 0
      ? 0
      : (safePage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    safePage * ITEMS_PER_PAGE,
    filteredShifts.length
  );

  /* =====================================================
     FORM
     ===================================================== */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Shift code is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Shift name is required";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (!formData.breakStart) {
      newErrors.breakStart = "Break start time is required";
    }

    if (!formData.breakEnd) {
      newErrors.breakEnd = "Break end time is required";
    }

    if (!formData.workingHours) {
      newErrors.workingHours = "Working hours are required";
    }

    if (
      formData.workingHours &&
      (Number(formData.workingHours) <= 0 ||
        Number(formData.workingHours) > 24)
    ) {
      newErrors.workingHours =
        "Working hours must be between 0 and 24";
    }

    if (
      formData.gracePeriod === "" ||
      Number(formData.gracePeriod) < 0
    ) {
      newErrors.gracePeriod =
        "Grace period cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =====================================================
     OPEN ADD
     ===================================================== */

  const openAddModal = () => {
    setEditingShift(null);
    setFormData(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  /* =====================================================
     OPEN EDIT
     ===================================================== */

  const openEditModal = (item) => {
    setEditingShift(item);

    setFormData({
      code: item.code || "",
      name: item.name || "",
      description: item.description || "",
      startTime: item.startTime || "09:00",
      endTime: item.endTime || "18:00",
      breakStart: item.breakStart || "13:00",
      breakEnd: item.breakEnd || "14:00",
      workingHours: String(item.workingHours ?? "8"),
      gracePeriod: String(item.gracePeriod ?? "15"),
      status: item.status || "Active",
    });

    setErrors({});
    setShowModal(true);
  };

  /* =====================================================
     SAVE
     ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      workingHours: Number(formData.workingHours),
      gracePeriod: Number(formData.gracePeriod),
    };

    if (editingShift) {
      setShifts((previous) =>
        previous.map((item) =>
          item.id === editingShift.id
            ? {
                ...item,
                ...payload,
              }
            : item
        )
      );
    } else {
      const newShift = {
        id: Date.now(),
        ...payload,
        employeeCount: 0,
        createdOn: new Date()
          .toISOString()
          .split("T")[0],
      };

      setShifts((previous) => [newShift, ...previous]);
      setCurrentPage(1);
    }

    setShowModal(false);
    setEditingShift(null);
    setFormData(emptyForm);
    setErrors({});
  };

  /* =====================================================
     DETAILS
     ===================================================== */

  const openDetails = (item) => {
    setSelectedShift(item);
    setShowDetails(true);
  };

  /* =====================================================
     TOGGLE STATUS
     ===================================================== */

  const toggleStatus = (item) => {
    const nextStatus =
      item.status === "Active"
        ? "Inactive"
        : "Active";

    setShifts((previous) =>
      previous.map((shift) =>
        shift.id === item.id
          ? {
              ...shift,
              status: nextStatus,
            }
          : shift
      )
    );
  };

  /* =====================================================
     DELETE
     ===================================================== */

  const handleDelete = (item) => {
    if (item.employeeCount > 0) {
      window.alert(
        "This shift cannot be deleted because employees are currently assigned to it."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    setShifts((previous) =>
      previous.filter((shift) => shift.id !== item.id)
    );
  };

  /* =====================================================
     EXPORT CSV
     ===================================================== */

  const exportCSV = () => {
    if (!filteredShifts.length) {
      window.alert("No shift records available to export.");
      return;
    }

    const headers = [
      "Code",
      "Shift Name",
      "Description",
      "Start Time",
      "End Time",
      "Break Start",
      "Break End",
      "Working Hours",
      "Grace Period",
      "Employees",
      "Status",
      "Created On",
    ];

    const rows = filteredShifts.map((item) => [
      item.code,
      item.name,
      item.description,
      item.startTime,
      item.endTime,
      item.breakStart,
      item.breakEnd,
      item.workingHours,
      item.gracePeriod,
      item.employeeCount,
      item.status,
      item.createdOn,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "shift-master.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     RESET PAGE WHEN FILTER CHANGES
     ===================================================== */

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="shift-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="shift-header">

        <div className="shift-header-left">

          <div className="shift-header-icon">
            <BsClockFill />
          </div>

          <div>
            <h1>Shift Master</h1>

            <p>
              Create and manage employee working shifts
            </p>
          </div>

        </div>

        <button
          type="button"
          className="shift-add-btn"
          onClick={openAddModal}
        >
          <BsPlusLg />
          Add Shift
        </button>

      </div>

      {/* =================================================
          STATISTICS
          ================================================= */}

      <div className="shift-stats">

        <div className="shift-stat-card">

          <div className="shift-stat-icon">
            <BsClockFill />
          </div>

          <div className="shift-stat-content">
            <span className="shift-stat-label">
              Total Shifts
            </span>

            <strong className="shift-stat-value">
              {totalShifts}
            </strong>
          </div>

        </div>

        <div className="shift-stat-card">

          <div className="shift-stat-icon">
            <BsCheckCircleFill />
          </div>

          <div className="shift-stat-content">
            <span className="shift-stat-label">
              Active
            </span>

            <strong className="shift-stat-value">
              {activeShifts}
            </strong>
          </div>

        </div>

        <div className="shift-stat-card">

          <div className="shift-stat-icon">
            <BsXCircleFill />
          </div>

          <div className="shift-stat-content">
            <span className="shift-stat-label">
              Inactive
            </span>

            <strong className="shift-stat-value">
              {inactiveShifts}
            </strong>
          </div>

        </div>

        <div className="shift-stat-card">

          <div className="shift-stat-icon">
            <BsPeopleFill />
          </div>

          <div className="shift-stat-content">
            <span className="shift-stat-label">
              Assigned Employees
            </span>

            <strong className="shift-stat-value">
              {assignedEmployees}
            </strong>
          </div>

        </div>

      </div>

      {/* =================================================
          TOOLBAR
          ================================================= */}

      <div className="shift-toolbar">

        <div className="shift-toolbar-left">

          <div className="shift-search">

            <BsSearch />

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search shifts..."
            />

          </div>

          <select
            className="shift-filter"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            {shiftStatusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

        </div>

        <div className="shift-toolbar-right">

          <button
            type="button"
            className="shift-export-btn"
            onClick={exportCSV}
          >
            <BsDownload />
            Export
          </button>

        </div>

      </div>

      {/* =================================================
          TABLE
          ================================================= */}

      <div className="shift-table-card">

        <div className="shift-table-wrapper">

          <table className="shift-table">

            <thead>
              <tr>
                <th>Shift</th>
                <th>Timing</th>
                <th>Break</th>
                <th>Working Hours</th>
                <th>Grace</th>
                <th>Employees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginatedShifts.length > 0 ? (
                paginatedShifts.map((item) => (

                  <tr key={item.id}>

                    <td>

                      <div className="shift-info">

                        <div className="shift-info-icon">
                          <BsClockFill />
                        </div>

                        <div className="shift-info-content">

                          <p className="shift-name">
                            {item.name}
                          </p>

                          <p className="shift-code">
                            {item.code}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td>

                      <div className="shift-timing">

                        <strong>
                          {formatTime(item.startTime)}
                        </strong>

                        <span>to</span>

                        <strong>
                          {formatTime(item.endTime)}
                        </strong>

                      </div>

                    </td>

                    <td>

                      <div className="shift-break">

                        <span>
                          {formatTime(item.breakStart)}
                        </span>

                        <span className="shift-break-separator">
                          -
                        </span>

                        <span>
                          {formatTime(item.breakEnd)}
                        </span>

                      </div>

                    </td>

                    <td>
                      <span className="shift-hours">
                        {item.workingHours} hrs
                      </span>
                    </td>

                    <td>
                      <span className="shift-grace">
                        {item.gracePeriod} min
                      </span>
                    </td>

                    <td>

                      <span className="shift-employee-count">

                        <BsPeopleFill />

                        {item.employeeCount}

                      </span>

                    </td>

                    <td>

                      <span
                        className={`shift-status ${
                          item.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >

                        {item.status === "Active" ? (
                          <BsCheckCircleFill />
                        ) : (
                          <BsXCircleFill />
                        )}

                        {item.status}

                      </span>

                    </td>

                    <td>

                      <div className="shift-actions">

                        <button
                          type="button"
                          className="shift-action-btn view"
                          title="View Details"
                          onClick={() => openDetails(item)}
                        >
                          <BsEye />
                        </button>

                        <button
                          type="button"
                          className="shift-action-btn edit"
                          title="Edit Shift"
                          onClick={() => openEditModal(item)}
                        >
                          <BsPencilSquare />
                        </button>

                        <button
                          type="button"
                          className="shift-action-btn toggle"
                          title={
                            item.status === "Active"
                              ? "Deactivate"
                              : "Activate"
                          }
                          onClick={() => toggleStatus(item)}
                        >
                          {item.status === "Active" ? (
                            <BsToggleOn />
                          ) : (
                            <BsToggleOff />
                          )}
                        </button>

                        <button
                          type="button"
                          className="shift-action-btn delete"
                          title="Delete Shift"
                          onClick={() => handleDelete(item)}
                        >
                          <BsTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="shift-empty-cell"
                  >

                    <div className="shift-empty">

                      <div className="shift-empty-icon">
                        <BsClockFill />
                      </div>

                      <h3>
                        No shifts found
                      </h3>

                      <p>
                        Try changing your search or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PAGINATION
            ================================================= */}

        {filteredShifts.length > 0 && (

          <div className="shift-pagination">

            <div className="shift-pagination-info">
              Showing {startItem} to {endItem} of{" "}
              {filteredShifts.length} shifts
            </div>

            <div className="shift-pagination-controls">

              <button
                type="button"
                className="shift-page-btn"
                disabled={safePage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
              >
                <BsArrowLeft />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  type="button"
                  key={page}
                  className={`shift-page-btn ${
                    safePage === page
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>

              ))}

              <button
                type="button"
                className="shift-page-btn"
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
              >
                <BsArrowRight />
              </button>

            </div>

          </div>

        )}

      </div>

      {/* =================================================
          ADD / EDIT MODAL
          ================================================= */}

      {showModal && (

        <div
          className="shift-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >

          <div className="shift-modal">

            <div className="shift-modal-header">

              <div className="shift-modal-title">

                <div className="shift-modal-title-icon">
                  <BsClockFill />
                </div>

                <div>
                  <h2>
                    {editingShift
                      ? "Edit Shift"
                      : "Add New Shift"}
                  </h2>

                  <p>
                    Configure employee working hours
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="shift-modal-close"
                onClick={() => setShowModal(false)}
              >
                <BsXLg />
              </button>

            </div>

            <form
              className="shift-form"
              onSubmit={handleSubmit}
            >

              <div className="shift-modal-body">

                <div className="shift-form-grid">

                  {/* CODE */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Shift Code
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.code ? "error" : ""
                      }`}
                      placeholder="e.g. GEN"
                      maxLength={20}
                    />

                    {errors.code && (
                      <span className="shift-form-error">
                        {errors.code}
                      </span>
                    )}

                  </div>

                  {/* NAME */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Shift Name
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.name ? "error" : ""
                      }`}
                      placeholder="e.g. General Shift"
                    />

                    {errors.name && (
                      <span className="shift-form-error">
                        {errors.name}
                      </span>
                    )}

                  </div>

                  {/* DESCRIPTION */}

                  <div className="shift-form-group full">

                    <label className="shift-form-label">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="shift-form-textarea"
                      placeholder="Enter shift description..."
                      maxLength={250}
                    />

                  </div>

                  {/* START TIME */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Start Time
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.startTime ? "error" : ""
                      }`}
                    />

                    {errors.startTime && (
                      <span className="shift-form-error">
                        {errors.startTime}
                      </span>
                    )}

                  </div>

                  {/* END TIME */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      End Time
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.endTime ? "error" : ""
                      }`}
                    />

                    {errors.endTime && (
                      <span className="shift-form-error">
                        {errors.endTime}
                      </span>
                    )}

                  </div>

                  {/* BREAK START */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Break Start
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="time"
                      name="breakStart"
                      value={formData.breakStart}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.breakStart ? "error" : ""
                      }`}
                    />

                    {errors.breakStart && (
                      <span className="shift-form-error">
                        {errors.breakStart}
                      </span>
                    )}

                  </div>

                  {/* BREAK END */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Break End
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="time"
                      name="breakEnd"
                      value={formData.breakEnd}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.breakEnd ? "error" : ""
                      }`}
                    />

                    {errors.breakEnd && (
                      <span className="shift-form-error">
                        {errors.breakEnd}
                      </span>
                    )}

                  </div>

                  {/* WORKING HOURS */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Working Hours
                      <span className="shift-required">
                        *
                      </span>
                    </label>

                    <input
                      type="number"
                      name="workingHours"
                      value={formData.workingHours}
                      onChange={handleInputChange}
                      className={`shift-form-input ${
                        errors.workingHours
                          ? "error"
                          : ""
                      }`}
                      placeholder="8"
                      min="0.5"
                      max="24"
                      step="0.5"
                    />

                    {errors.workingHours && (
                      <span className="shift-form-error">
                        {errors.workingHours}
                      </span>
                    )}

                  </div>

                  {/* GRACE */}

                  <div className="shift-form-group">

                    <label className="shift-form-label">
                      Grace Period
                    </label>

                    <div className="shift-input-with-suffix">

                      <input
                        type="number"
                        name="gracePeriod"
                        value={formData.gracePeriod}
                        onChange={handleInputChange}
                        className={`shift-form-input ${
                          errors.gracePeriod
                            ? "error"
                            : ""
                        }`}
                        min="0"
                        max="120"
                      />

                      <span>min</span>

                    </div>

                    {errors.gracePeriod && (
                      <span className="shift-form-error">
                        {errors.gracePeriod}
                      </span>
                    )}

                  </div>

                </div>

                {/* STATUS */}

                <div className="shift-toggle-row">

                  <div className="shift-toggle-info">

                    <p className="shift-toggle-title">
                      Shift Status
                    </p>

                    <p className="shift-toggle-description">
                      Inactive shifts cannot be assigned
                      to new employees.
                    </p>

                  </div>

                  <label className="shift-toggle">

                    <input
                      type="checkbox"
                      checked={
                        formData.status === "Active"
                      }
                      onChange={(event) =>
                        setFormData((previous) => ({
                          ...previous,
                          status: event.target.checked
                            ? "Active"
                            : "Inactive",
                        }))
                      }
                    />

                    <span className="shift-toggle-slider" />

                  </label>

                </div>

              </div>

              <div className="shift-modal-footer">

                <button
                  type="button"
                  className="shift-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="shift-save-btn"
                >
                  {editingShift
                    ? "Update Shift"
                    : "Create Shift"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =================================================
          DETAILS MODAL
          ================================================= */}

      {showDetails && selectedShift && (

        <div
          className="shift-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowDetails(false);
            }
          }}
        >

          <div className="shift-modal shift-details-modal">

            <div className="shift-modal-header">

              <div className="shift-modal-title">

                <div className="shift-modal-title-icon">
                  <BsClockFill />
                </div>

                <div>
                  <h2>
                    {selectedShift.name}
                  </h2>

                  <p>
                    Shift configuration details
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="shift-modal-close"
                onClick={() => setShowDetails(false)}
              >
                <BsXLg />
              </button>

            </div>

            <div className="shift-modal-body">

              <div className="shift-detail-summary">

                <div className="shift-detail-summary-icon">
                  <BsClockFill />
                </div>

                <div>

                  <h3>
                    {selectedShift.name}
                  </h3>

                  <span>
                    {selectedShift.code}
                  </span>

                </div>

                <span
                  className={`shift-status ${
                    selectedShift.status === "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {selectedShift.status}
                </span>

              </div>

              <div className="shift-detail-grid">

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Start Time
                  </span>

                  <strong className="shift-detail-value">
                    {formatTime(
                      selectedShift.startTime
                    )}
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    End Time
                  </span>

                  <strong className="shift-detail-value">
                    {formatTime(
                      selectedShift.endTime
                    )}
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Break Start
                  </span>

                  <strong className="shift-detail-value">
                    {formatTime(
                      selectedShift.breakStart
                    )}
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Break End
                  </span>

                  <strong className="shift-detail-value">
                    {formatTime(
                      selectedShift.breakEnd
                    )}
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Working Hours
                  </span>

                  <strong className="shift-detail-value">
                    {selectedShift.workingHours} hours
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Grace Period
                  </span>

                  <strong className="shift-detail-value">
                    {selectedShift.gracePeriod} minutes
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Assigned Employees
                  </span>

                  <strong className="shift-detail-value">
                    {selectedShift.employeeCount}
                  </strong>

                </div>

                <div className="shift-detail-item">

                  <span className="shift-detail-label">
                    Created On
                  </span>

                  <strong className="shift-detail-value">
                    {formatDate(
                      selectedShift.createdOn
                    )}
                  </strong>

                </div>

                <div className="shift-detail-item full">

                  <span className="shift-detail-label">
                    Description
                  </span>

                  <strong className="shift-detail-value">
                    {selectedShift.description ||
                      "No description available"}
                  </strong>

                </div>

              </div>

            </div>

            <div className="shift-modal-footer">

              <button
                type="button"
                className="shift-cancel-btn"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="shift-save-btn"
                onClick={() => {
                  setShowDetails(false);
                  openEditModal(selectedShift);
                }}
              >
                <BsPencilSquare />
                Edit Shift
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Shift;