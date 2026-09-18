import React, { useMemo, useState } from "react";
import {
  BsBuilding,
  BsCheckCircleFill,
  BsXCircleFill,
  BsPeopleFill,
  BsPlusLg,
  BsSearch,
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
  BsEye,
  BsDownload,
  BsArrowLeft,
  BsArrowRight,
  BsXLg,
} from "react-icons/bs";

import {
  departmentData,
  departmentStatusOptions,
  departmentLocationOptions,
} from "./DepartmentData";

import "./Department.css";

const Department = () => {
  const [departments, setDepartments] = useState(departmentData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingDepartment, setEditingDepartment] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    departmentHead: "",
    headEmployeeId: "",
    location: "",
    status: "Active",
  });

  const itemsPerPage = 6;

  // ============================
  // FILTER
  // ============================

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        department.name.toLowerCase().includes(searchValue) ||
        department.code.toLowerCase().includes(searchValue) ||
        department.departmentHead.toLowerCase().includes(searchValue) ||
        department.location.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        department.status === statusFilter;

      const matchesLocation =
        locationFilter === "All" ||
        department.location === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [
    departments,
    search,
    statusFilter,
    locationFilter,
  ]);

  // ============================
  // PAGINATION
  // ============================

  const totalPages = Math.ceil(
    filteredDepartments.length / itemsPerPage
  );

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ============================
  // STATS
  // ============================

  const totalEmployees = departments.reduce(
    (total, department) => total + department.employeeCount,
    0
  );

  const activeDepartments = departments.filter(
    (department) => department.status === "Active"
  ).length;

  const inactiveDepartments = departments.filter(
    (department) => department.status === "Inactive"
  ).length;

  // ============================
  // MODAL
  // ============================

  const openAddModal = () => {
    setEditingDepartment(null);

    setFormData({
      code: `DEP-${String(departments.length + 1).padStart(3, "0")}`,
      name: "",
      description: "",
      departmentHead: "",
      headEmployeeId: "",
      location: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (department) => {
    setEditingDepartment(department);

    setFormData({
      code: department.code,
      name: department.name,
      description: department.description,
      departmentHead: department.departmentHead,
      headEmployeeId: department.headEmployeeId,
      location: department.location,
      status: department.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
  };

  // ============================
  // FORM
  // ============================

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ============================
  // SAVE
  // ============================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter department name.");
      return;
    }

    if (editingDepartment) {
      setDepartments((previous) =>
        previous.map((department) =>
          department.id === editingDepartment.id
            ? {
                ...department,
                ...formData,
              }
            : department
        )
      );

      alert("Department updated successfully.");
    } else {
      const newDepartment = {
        id: Date.now(),
        ...formData,
        employeeCount: 0,
        createdOn: new Date()
          .toISOString()
          .split("T")[0],
      };

      setDepartments((previous) => [
        ...previous,
        newDepartment,
      ]);

      alert("Department added successfully.");
    }

    closeModal();
  };

  // ============================
  // DELETE
  // ============================

  const handleDelete = (id) => {
    const department = departments.find(
      (item) => item.id === id
    );

    if (!department) return;

    if (department.employeeCount > 0) {
      alert(
        "This department has employees assigned to it. Please reassign employees before deleting."
      );
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${department.name}"?`
    );

    if (!confirmDelete) return;

    setDepartments((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // ============================
  // STATUS
  // ============================

  const toggleStatus = (id) => {
    setDepartments((previous) =>
      previous.map((department) =>
        department.id === id
          ? {
              ...department,
              status:
                department.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : department
      )
    );
  };

  // ============================
  // DETAILS
  // ============================

  const openDetails = (department) => {
    setSelectedDepartment(department);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedDepartment(null);
    setShowDetails(false);
  };

  // ============================
  // EXPORT
  // ============================

  const handleExport = () => {
    const headers = [
      "Code",
      "Department Name",
      "Department Head",
      "Location",
      "Employees",
      "Status",
      "Created On",
    ];

    const rows = filteredDepartments.map((department) => [
      department.code,
      department.name,
      department.departmentHead,
      department.location,
      department.employeeCount,
      department.status,
      department.createdOn,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "departments.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  // ============================
  // PAGE CHANGE
  // ============================

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="department-page">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="department-header">

        <div>
          <div className="department-breadcrumb">
            Masters / Department
          </div>

          <h1>Department Management</h1>

          <p>
            Manage organizational departments and their
            employee assignments.
          </p>
        </div>

        <button
          className="department-primary-btn"
          onClick={openAddModal}
        >
          <BsPlusLg />
          Add Department
        </button>

      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div className="department-stats">

        <div className="department-stat-card">

          <div className="department-stat-icon blue">
            <BsBuilding />
          </div>

          <div>
            <span>Total Departments</span>
            <strong>{departments.length}</strong>
          </div>

        </div>

        <div className="department-stat-card">

          <div className="department-stat-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Active Departments</span>
            <strong>{activeDepartments}</strong>
          </div>

        </div>

        <div className="department-stat-card">

          <div className="department-stat-icon red">
            <BsXCircleFill />
          </div>

          <div>
            <span>Inactive Departments</span>
            <strong>{inactiveDepartments}</strong>
          </div>

        </div>

        <div className="department-stat-card">

          <div className="department-stat-icon purple">
            <BsPeopleFill />
          </div>

          <div>
            <span>Total Employees</span>
            <strong>{totalEmployees}</strong>
          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* TABLE CARD */}
      {/* ================================= */}

      <div className="department-table-card">

        {/* TOOLBAR */}

        <div className="department-toolbar">

          <div className="department-search">

            <BsSearch />

            <input
              type="text"
              placeholder="Search department, code or head..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
            />

            {search && (
              <button
                className="department-clear-search"
                onClick={() => setSearch("")}
              >
                <BsXLg />
              </button>
            )}

          </div>

          <div className="department-filters">

            <select
              value={locationFilter}
              onChange={(event) => {
                setLocationFilter(event.target.value);
                setCurrentPage(1);
              }}
            >
              {departmentLocationOptions.map(
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

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
            >
              {departmentStatusOptions.map(
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

            <button
              className="department-export-btn"
              onClick={handleExport}
            >
              <BsDownload />
              Export
            </button>

          </div>

        </div>

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div className="department-table-wrapper">

          <table className="department-table">

            <thead>
              <tr>
                <th>Department</th>
                <th>Department Head</th>
                <th>Location</th>
                <th>Employees</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {paginatedDepartments.length > 0 ? (
                paginatedDepartments.map(
                  (department) => (
                    <tr key={department.id}>

                      {/* DEPARTMENT */}

                      <td>

                        <div className="department-name-cell">

                          <div className="department-avatar">
                            {department.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {department.name}
                            </strong>

                            <span>
                              {department.code}
                            </span>
                          </div>

                        </div>

                      </td>

                      {/* HEAD */}

                      <td>

                        <div className="department-head-cell">

                          <div className="head-avatar">
                            {department.departmentHead
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <strong>
                              {department.departmentHead}
                            </strong>

                            <span>
                              {department.headEmployeeId}
                            </span>
                          </div>

                        </div>

                      </td>

                      {/* LOCATION */}

                      <td>
                        <span className="location-text">
                          {department.location}
                        </span>
                      </td>

                      {/* EMPLOYEES */}

                      <td>

                        <div className="employee-count">

                          <BsPeopleFill />

                          <span>
                            {department.employeeCount}
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td>

                        <button
                          className={`department-status ${
                            department.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                          onClick={() =>
                            toggleStatus(department.id)
                          }
                        >
                          <span />

                          {department.status}
                        </button>

                      </td>

                      {/* DATE */}

                      <td>
                        {new Date(
                          department.createdOn
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="department-actions">

                          <button
                            title="View"
                            onClick={() =>
                              openDetails(department)
                            }
                          >
                            <BsEye />
                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              openEditModal(department)
                            }
                          >
                            <BsPencilSquare />
                          </button>

                          <button
                            title="Delete"
                            className="delete"
                            onClick={() =>
                              handleDelete(department.id)
                            }
                          >
                            <BsTrash />
                          </button>

                          <button
                            title="More"
                            className="more"
                          >
                            <BsThreeDotsVertical />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="7"
                    className="department-empty"
                  >
                    <BsBuilding />

                    <h3>
                      No departments found
                    </h3>

                    <p>
                      Try changing your search or
                      filter criteria.
                    </p>

                    <button
                      onClick={() => {
                        setSearch("");
                        setStatusFilter("All");
                        setLocationFilter("All");
                      }}
                    >
                      Clear Filters
                    </button>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ================================= */}
        {/* PAGINATION */}
        {/* ================================= */}

        {filteredDepartments.length > 0 && (
          <div className="department-pagination">

            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) *
                  itemsPerPage +
                  1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredDepartments.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredDepartments.length}
              </strong>{" "}
              departments
            </span>

            <div className="pagination-buttons">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  changePage(currentPage - 1)
                }
              >
                <BsArrowLeft />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    changePage(page)
                  }
                >
                  {page}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  changePage(currentPage + 1)
                }
              >
                <BsArrowRight />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* ================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ================================= */}

      {showModal && (
        <div
          className="department-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="department-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="department-modal-header">

              <div>
                <h2>
                  {editingDepartment
                    ? "Edit Department"
                    : "Add Department"}
                </h2>

                <p>
                  {editingDepartment
                    ? "Update department information."
                    : "Create a new organizational department."}
                </p>
              </div>

              <button onClick={closeModal}>
                <BsXLg />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="department-form-grid">

                <div className="department-form-group">

                  <label>
                    Department Code
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />

                </div>

                <div className="department-form-group">

                  <label>
                    Department Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter department name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                </div>

                <div className="department-form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    placeholder="Enter department description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                  />

                </div>

                <div className="department-form-group">

                  <label>
                    Department Head
                  </label>

                  <input
                    type="text"
                    name="departmentHead"
                    placeholder="Enter department head"
                    value={formData.departmentHead}
                    onChange={handleInputChange}
                  />

                </div>

                <div className="department-form-group">

                  <label>
                    Employee ID
                  </label>

                  <input
                    type="text"
                    name="headEmployeeId"
                    placeholder="e.g. EMP-1024"
                    value={formData.headEmployeeId}
                    onChange={handleInputChange}
                  />

                </div>

                <div className="department-form-group">

                  <label>
                    Location
                  </label>

                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  >
                    <option value="">
                      Select Location
                    </option>

                    {departmentLocationOptions
                      .filter(
                        (option) =>
                          option.value !== "All"
                      )
                      .map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                  </select>

                </div>

                <div className="department-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
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

              <div className="department-modal-footer">

                <button
                  type="button"
                  className="department-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="department-save-btn"
                >
                  {editingDepartment
                    ? "Update Department"
                    : "Create Department"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ================================= */}
      {/* DETAILS MODAL */}
      {/* ================================= */}

      {showDetails && selectedDepartment && (
        <div
          className="department-modal-overlay"
          onClick={closeDetails}
        >

          <div
            className="department-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="department-modal-header">

              <div>
                <h2>
                  Department Details
                </h2>

                <p>
                  Complete department information
                </p>
              </div>

              <button onClick={closeDetails}>
                <BsXLg />
              </button>

            </div>

            <div className="department-details-content">

              <div className="department-details-profile">

                <div className="department-large-avatar">
                  {selectedDepartment.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3>
                    {selectedDepartment.name}
                  </h3>

                  <span>
                    {selectedDepartment.code}
                  </span>
                </div>

                <div
                  className={`department-detail-status ${
                    selectedDepartment.status ===
                    "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {selectedDepartment.status}
                </div>

              </div>

              <div className="department-detail-description">

                <label>Description</label>

                <p>
                  {selectedDepartment.description ||
                    "No description available."}
                </p>

              </div>

              <div className="department-detail-grid">

                <div>
                  <span>Department Head</span>
                  <strong>
                    {selectedDepartment.departmentHead ||
                      "Not Assigned"}
                  </strong>
                </div>

                <div>
                  <span>Employee ID</span>
                  <strong>
                    {selectedDepartment.headEmployeeId ||
                      "Not Assigned"}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {selectedDepartment.location ||
                      "Not Assigned"}
                  </strong>
                </div>

                <div>
                  <span>Total Employees</span>
                  <strong>
                    {selectedDepartment.employeeCount}
                  </strong>
                </div>

                <div>
                  <span>Created On</span>
                  <strong>
                    {new Date(
                      selectedDepartment.createdOn
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </div>

              </div>

            </div>

            <div className="department-modal-footer">

              <button
                className="department-cancel-btn"
                onClick={closeDetails}
              >
                Close
              </button>

              <button
                className="department-save-btn"
                onClick={() => {
                  closeDetails();
                  openEditModal(
                    selectedDepartment
                  );
                }}
              >
                <BsPencilSquare />
                Edit Department
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Department;