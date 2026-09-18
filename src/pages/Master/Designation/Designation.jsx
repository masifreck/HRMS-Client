import React, { useMemo, useState } from "react";

import {
  BsBriefcaseFill,
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
  BsThreeDotsVertical,
} from "react-icons/bs";

import {
  designationData,
  designationStatusOptions,
  designationDepartmentOptions,
  designationLevelOptions,
} from "./DesignationData";

import "./Designation.css";

const Designation = () => {
  const [designations, setDesignations] =
    useState(designationData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingDesignation, setEditingDesignation] =
    useState(null);

  const [selectedDesignation, setSelectedDesignation] =
    useState(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    department: "",
    level: "",
    description: "",
    status: "Active",
  });

  const itemsPerPage = 6;

  /* ==========================================
     FILTER DATA
  ========================================== */

  const filteredDesignations = useMemo(() => {
    return designations.filter((designation) => {
      const searchValue = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchValue ||
        designation.name
          .toLowerCase()
          .includes(searchValue) ||
        designation.code
          .toLowerCase()
          .includes(searchValue) ||
        designation.department
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        designation.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        designation.department === departmentFilter;

      const matchesLevel =
        levelFilter === "All" ||
        designation.level === levelFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesLevel
      );
    });
  }, [
    designations,
    search,
    statusFilter,
    departmentFilter,
    levelFilter,
  ]);

  /* ==========================================
     PAGINATION
  ========================================== */

  const totalPages = Math.ceil(
    filteredDesignations.length / itemsPerPage
  );

  const paginatedDesignations =
    filteredDesignations.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  /* ==========================================
     STATISTICS
  ========================================== */

  const activeDesignations =
    designations.filter(
      (item) => item.status === "Active"
    ).length;

  const inactiveDesignations =
    designations.filter(
      (item) => item.status === "Inactive"
    ).length;

  const totalEmployees = designations.reduce(
    (total, item) =>
      total + item.employeeCount,
    0
  );

  /* ==========================================
     ADD MODAL
  ========================================== */

  const openAddModal = () => {
    setEditingDesignation(null);

    setFormData({
      code: `DES-${String(
        designations.length + 1
      ).padStart(3, "0")}`,
      name: "",
      department: "",
      level: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  /* ==========================================
     EDIT MODAL
  ========================================== */

  const openEditModal = (designation) => {
    setEditingDesignation(designation);

    setFormData({
      code: designation.code,
      name: designation.name,
      department: designation.department,
      level: designation.level,
      description: designation.description,
      status: designation.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDesignation(null);
  };

  /* ==========================================
     FORM CHANGE
  ========================================== */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ==========================================
     SAVE DESIGNATION
  ========================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter designation name.");
      return;
    }

    if (!formData.department) {
      alert("Please select department.");
      return;
    }

    if (!formData.level) {
      alert("Please select designation level.");
      return;
    }

    if (editingDesignation) {
      setDesignations((previous) =>
        previous.map((designation) =>
          designation.id ===
          editingDesignation.id
            ? {
                ...designation,
                ...formData,
              }
            : designation
        )
      );

      alert(
        "Designation updated successfully."
      );
    } else {
      const newDesignation = {
        id: Date.now(),
        ...formData,
        employeeCount: 0,
        createdOn: new Date()
          .toISOString()
          .split("T")[0],
      };

      setDesignations((previous) => [
        ...previous,
        newDesignation,
      ]);

      alert(
        "Designation added successfully."
      );
    }

    closeModal();
  };

  /* ==========================================
     DELETE
  ========================================== */

  const handleDelete = (id) => {
    const designation = designations.find(
      (item) => item.id === id
    );

    if (!designation) return;

    if (designation.employeeCount > 0) {
      alert(
        "This designation has employees assigned to it. Please reassign employees before deleting."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${designation.name}"?`
    );

    if (!confirmed) return;

    setDesignations((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  /* ==========================================
     STATUS
  ========================================== */

  const toggleStatus = (id) => {
    setDesignations((previous) =>
      previous.map((designation) =>
        designation.id === id
          ? {
              ...designation,
              status:
                designation.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : designation
      )
    );
  };

  /* ==========================================
     DETAILS
  ========================================== */

  const openDetails = (designation) => {
    setSelectedDesignation(designation);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setSelectedDesignation(null);
    setShowDetails(false);
  };

  /* ==========================================
     EXPORT
  ========================================== */

  const handleExport = () => {
    const headers = [
      "Code",
      "Designation",
      "Department",
      "Level",
      "Employees",
      "Status",
      "Created On",
    ];

    const rows = filteredDesignations.map(
      (designation) => [
        designation.code,
        designation.name,
        designation.department,
        designation.level,
        designation.employeeCount,
        designation.status,
        designation.createdOn,
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "designations.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  /* ==========================================
     PAGINATION
  ========================================== */

  const changePage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <div className="designation-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="designation-header">

        <div>
          <div className="designation-breadcrumb">
            Masters / Designation
          </div>

          <h1>
            Designation Management
          </h1>

          <p>
            Manage employee designations,
            job levels and organizational roles.
          </p>
        </div>

        <button
          className="designation-primary-btn"
          onClick={openAddModal}
        >
          <BsPlusLg />
          Add Designation
        </button>

      </div>

      {/* ======================================
          STATS
      ====================================== */}

      <div className="designation-stats">

        <div className="designation-stat-card">

          <div className="designation-stat-icon blue">
            <BsBriefcaseFill />
          </div>

          <div>
            <span>
              Total Designations
            </span>

            <strong>
              {designations.length}
            </strong>
          </div>

        </div>

        <div className="designation-stat-card">

          <div className="designation-stat-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>
              Active Designations
            </span>

            <strong>
              {activeDesignations}
            </strong>
          </div>

        </div>

        <div className="designation-stat-card">

          <div className="designation-stat-icon red">
            <BsXCircleFill />
          </div>

          <div>
            <span>
              Inactive Designations
            </span>

            <strong>
              {inactiveDesignations}
            </strong>
          </div>

        </div>

        <div className="designation-stat-card">

          <div className="designation-stat-icon purple">
            <BsPeopleFill />
          </div>

          <div>
            <span>
              Assigned Employees
            </span>

            <strong>
              {totalEmployees}
            </strong>
          </div>

        </div>

      </div>

      {/* ======================================
          TABLE CARD
      ====================================== */}

      <div className="designation-table-card">

        {/* TOOLBAR */}

        <div className="designation-toolbar">

          <div className="designation-search">

            <BsSearch />

            <input
              type="text"
              placeholder="Search designation or department..."
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value
                );

                setCurrentPage(1);
              }}
            />

            {search && (
              <button
                className="designation-clear-search"
                onClick={() =>
                  setSearch("")
                }
              >
                <BsXLg />
              </button>
            )}

          </div>

          <div className="designation-filters">

            <select
              value={departmentFilter}
              onChange={(event) => {
                setDepartmentFilter(
                  event.target.value
                );

                setCurrentPage(1);
              }}
            >
              {designationDepartmentOptions.map(
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
              value={levelFilter}
              onChange={(event) => {
                setLevelFilter(
                  event.target.value
                );

                setCurrentPage(1);
              }}
            >
              {designationLevelOptions.map(
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
                setStatusFilter(
                  event.target.value
                );

                setCurrentPage(1);
              }}
            >
              {designationStatusOptions.map(
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
              className="designation-export-btn"
              onClick={handleExport}
            >
              <BsDownload />
              Export
            </button>

          </div>

        </div>

        {/* ======================================
            TABLE
        ====================================== */}

        <div className="designation-table-wrapper">

          <table className="designation-table">

            <thead>

              <tr>
                <th>Designation</th>
                <th>Department</th>
                <th>Level</th>
                <th>Employees</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {paginatedDesignations.length > 0 ? (
                paginatedDesignations.map(
                  (designation) => (
                    <tr
                      key={designation.id}
                    >

                      {/* DESIGNATION */}

                      <td>

                        <div className="designation-name-cell">

                          <div className="designation-avatar">
                            {designation.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {designation.name}
                            </strong>

                            <span>
                              {designation.code}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* DEPARTMENT */}

                      <td>
                        <span className="designation-department">
                          {designation.department}
                        </span>
                      </td>

                      {/* LEVEL */}

                      <td>

                        <span
                          className={`designation-level level-${designation.level
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {designation.level}
                        </span>

                      </td>

                      {/* EMPLOYEES */}

                      <td>

                        <div className="designation-employee-count">

                          <BsPeopleFill />

                          <span>
                            {designation.employeeCount}
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td>

                        <button
                          className={`designation-status ${
                            designation.status ===
                            "Active"
                              ? "active"
                              : "inactive"
                          }`}
                          onClick={() =>
                            toggleStatus(
                              designation.id
                            )
                          }
                        >
                          <span />

                          {designation.status}
                        </button>

                      </td>

                      {/* DATE */}

                      <td>
                        {new Date(
                          designation.createdOn
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* ACTION */}

                      <td>

                        <div className="designation-actions">

                          <button
                            title="View"
                            onClick={() =>
                              openDetails(
                                designation
                              )
                            }
                          >
                            <BsEye />
                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              openEditModal(
                                designation
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
                                designation.id
                              )
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
                    className="designation-empty"
                  >

                    <BsBriefcaseFill />

                    <h3>
                      No designations found
                    </h3>

                    <p>
                      Try changing your search
                      or filter criteria.
                    </p>

                    <button
                      onClick={() => {
                        setSearch("");
                        setStatusFilter(
                          "All"
                        );
                        setDepartmentFilter(
                          "All"
                        );
                        setLevelFilter(
                          "All"
                        );
                        setCurrentPage(1);
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

        {/* ======================================
            PAGINATION
        ====================================== */}

        {filteredDesignations.length > 0 && (
          <div className="designation-pagination">

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
                  currentPage *
                    itemsPerPage,
                  filteredDesignations.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredDesignations.length}
              </strong>{" "}
              designations
            </span>

            <div className="designation-pagination-buttons">

              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  changePage(
                    currentPage - 1
                  )
                }
              >
                <BsArrowLeft />
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
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
                  changePage(
                    currentPage + 1
                  )
                }
              >
                <BsArrowRight />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* ======================================
          ADD / EDIT MODAL
      ====================================== */}

      {showModal && (
        <div
          className="designation-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="designation-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="designation-modal-header">

              <div>

                <h2>
                  {editingDesignation
                    ? "Edit Designation"
                    : "Add Designation"}
                </h2>

                <p>
                  {editingDesignation
                    ? "Update designation information."
                    : "Create a new employee designation."}
                </p>

              </div>

              <button
                onClick={closeModal}
              >
                <BsXLg />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
            >

              <div className="designation-form-grid">

                <div className="designation-form-group">

                  <label>
                    Designation Code
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>

                <div className="designation-form-group">

                  <label>
                    Designation Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter designation name"
                    value={formData.name}
                    onChange={
                      handleInputChange
                    }
                    required
                  />

                </div>

                <div className="designation-form-group">

                  <label>
                    Department
                    <span>*</span>
                  </label>

                  <select
                    name="department"
                    value={
                      formData.department
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  >

                    <option value="">
                      Select Department
                    </option>

                    {designationDepartmentOptions
                      .filter(
                        (option) =>
                          option.value !==
                          "All"
                      )
                      .map((option) => (
                        <option
                          key={option.value}
                          value={
                            option.value
                          }
                        >
                          {option.label}
                        </option>
                      ))}

                  </select>

                </div>

                <div className="designation-form-group">

                  <label>
                    Job Level
                    <span>*</span>
                  </label>

                  <select
                    name="level"
                    value={
                      formData.level
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                  >

                    <option value="">
                      Select Level
                    </option>

                    {designationLevelOptions
                      .filter(
                        (option) =>
                          option.value !==
                          "All"
                      )
                      .map((option) => (
                        <option
                          key={option.value}
                          value={
                            option.value
                          }
                        >
                          {option.label}
                        </option>
                      ))}

                  </select>

                </div>

                <div className="designation-form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Enter designation description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

                <div className="designation-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      formData.status
                    }
                    onChange={
                      handleInputChange
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

              <div className="designation-modal-footer">

                <button
                  type="button"
                  className="designation-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="designation-save-btn"
                >
                  {editingDesignation
                    ? "Update Designation"
                    : "Create Designation"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ======================================
          DETAILS MODAL
      ====================================== */}

      {showDetails &&
        selectedDesignation && (
          <div
            className="designation-modal-overlay"
            onClick={closeDetails}
          >

            <div
              className="designation-details-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="designation-modal-header">

                <div>

                  <h2>
                    Designation Details
                  </h2>

                  <p>
                    Complete designation
                    information
                  </p>

                </div>

                <button
                  onClick={closeDetails}
                >
                  <BsXLg />
                </button>

              </div>

              <div className="designation-details-content">

                <div className="designation-details-profile">

                  <div className="designation-large-avatar">
                    {selectedDesignation.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h3>
                      {
                        selectedDesignation.name
                      }
                    </h3>

                    <span>
                      {
                        selectedDesignation.code
                      }
                    </span>

                  </div>

                  <div
                    className={`designation-detail-status ${
                      selectedDesignation.status ===
                      "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {
                      selectedDesignation.status
                    }
                  </div>

                </div>

                <div className="designation-detail-description">

                  <label>
                    Description
                  </label>

                  <p>
                    {
                      selectedDesignation.description ||
                      "No description available."
                    }
                  </p>

                </div>

                <div className="designation-detail-grid">

                  <div>
                    <span>
                      Department
                    </span>

                    <strong>
                      {
                        selectedDesignation.department
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Job Level
                    </span>

                    <strong>
                      {
                        selectedDesignation.level
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Assigned Employees
                    </span>

                    <strong>
                      {
                        selectedDesignation.employeeCount
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Status
                    </span>

                    <strong>
                      {
                        selectedDesignation.status
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Created On
                    </span>

                    <strong>
                      {new Date(
                        selectedDesignation.createdOn
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

              <div className="designation-modal-footer">

                <button
                  className="designation-cancel-btn"
                  onClick={closeDetails}
                >
                  Close
                </button>

                <button
                  className="designation-save-btn"
                  onClick={() => {
                    closeDetails();

                    openEditModal(
                      selectedDesignation
                    );
                  }}
                >
                  <BsPencilSquare />
                  Edit Designation
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
};

export default Designation;