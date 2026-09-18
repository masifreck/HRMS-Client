import { useMemo, useState } from "react";
import {
  BsBuilding,
  BsPeople,
  BsCheckCircleFill,
  BsXCircleFill,
  BsPlusLg,
  BsSearch,
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash3,
  BsEye,
  BsDownload,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt,
  BsPerson,
  BsXLg,
} from "react-icons/bs";

import {
  branchData,
  branchStatusOptions,
  stateOptions,
} from "./BranchData";

import "./Branch.css";

const emptyForm = {
  code: "",
  name: "",
  location: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  email: "",
  manager: "",
  employeeCount: 0,
  status: "Active",
};

function Branch() {
  const [branches, setBranches] = useState(branchData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingBranch, setEditingBranch] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [openAction, setOpenAction] = useState(null);

  const itemsPerPage = 6;

  // =========================
  // STATISTICS
  // =========================

  const totalBranches = branches.length;

  const activeBranches = branches.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveBranches = branches.filter(
    (item) => item.status === "Inactive"
  ).length;

  const totalEmployees = branches.reduce(
    (total, item) => total + Number(item.employeeCount || 0),
    0
  );

  // =========================
  // FILTER
  // =========================

  const filteredBranches = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return branches.filter((branch) => {
      const matchesSearch =
        !searchValue ||
        branch.name.toLowerCase().includes(searchValue) ||
        branch.code.toLowerCase().includes(searchValue) ||
        branch.location.toLowerCase().includes(searchValue) ||
        branch.manager.toLowerCase().includes(searchValue);

      const matchesStatus =
        !statusFilter ||
        branch.status === statusFilter;

      const matchesState =
        !stateFilter ||
        branch.state === stateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesState
      );
    });
  }, [
    branches,
    search,
    statusFilter,
    stateFilter,
  ]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    filteredBranches.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedBranches = filteredBranches.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (page) => {
    setCurrentPage(page);
    setOpenAction(null);
  };

  // =========================
  // FORM
  // =========================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD
  // =========================

  const handleAdd = () => {
    setEditingBranch(null);

    setForm({
      ...emptyForm,
      code: `BR${String(branches.length + 1).padStart(3, "0")}`,
    });

    setShowModal(true);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (branch) => {
    setEditingBranch(branch);

    setForm({
      code: branch.code || "",
      name: branch.name || "",
      location: branch.location || "",
      address: branch.address || "",
      city: branch.city || "",
      state: branch.state || "",
      pincode: branch.pincode || "",
      phone: branch.phone || "",
      email: branch.email || "",
      manager: branch.manager || "",
      employeeCount: branch.employeeCount || 0,
      status: branch.status || "Active",
    });

    setShowModal(true);
    setOpenAction(null);
  };

  // =========================
  // SAVE
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.code || !form.name || !form.city) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingBranch) {
      setBranches((prev) =>
        prev.map((item) =>
          item.id === editingBranch.id
            ? {
                ...item,
                ...form,
                employeeCount: Number(
                  form.employeeCount || 0
                ),
              }
            : item
        )
      );
    } else {
      const newBranch = {
        id: Date.now(),
        ...form,
        employeeCount: Number(
          form.employeeCount || 0
        ),
        createdOn: new Date()
          .toISOString()
          .split("T")[0],
      };

      setBranches((prev) => [
        ...prev,
        newBranch,
      ]);
    }

    setShowModal(false);
    setForm(emptyForm);
    setEditingBranch(null);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (branch) => {
    setOpenAction(null);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${branch.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setBranches((prev) =>
      prev.filter((item) => item.id !== branch.id)
    );
  };

  // =========================
  // STATUS
  // =========================

  const toggleStatus = (branch) => {
    setOpenAction(null);

    const newStatus =
      branch.status === "Active"
        ? "Inactive"
        : "Active";

    setBranches((prev) =>
      prev.map((item) =>
        item.id === branch.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  // =========================
  // VIEW
  // =========================

  const handleView = (branch) => {
    setSelectedBranch(branch);
    setShowDetails(true);
    setOpenAction(null);
  };

  // =========================
  // EXPORT
  // =========================

  const handleExport = () => {
    const headers = [
      "Branch Code",
      "Branch Name",
      "Location",
      "City",
      "State",
      "Manager",
      "Employees",
      "Status",
    ];

    const rows = filteredBranches.map(
      (branch) => [
        branch.code,
        branch.name,
        branch.location,
        branch.city,
        branch.state,
        branch.manager,
        branch.employeeCount,
        branch.status,
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
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
    link.download = "branch-list.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================
  // RESET FILTERS
  // =========================

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setStateFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="branch-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="branch-header">

        <div>
          <div className="branch-title-row">
            <div className="branch-title-icon">
              <BsBuilding />
            </div>

            <div>
              <h1>Branch Management</h1>

              <p>
                Manage company branches and
                their locations
              </p>
            </div>
          </div>
        </div>

        <div className="branch-header-actions">

          <button
            className="branch-export-btn"
            onClick={handleExport}
          >
            <BsDownload />
            Export
          </button>

          <button
            className="branch-add-btn"
            onClick={handleAdd}
          >
            <BsPlusLg />
            Add Branch
          </button>

        </div>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="branch-stats">

        <div className="branch-stat-card">

          <div className="branch-stat-icon total">
            <BsBuilding />
          </div>

          <div>
            <span>Total Branches</span>
            <strong>{totalBranches}</strong>
          </div>

        </div>

        <div className="branch-stat-card">

          <div className="branch-stat-icon active">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Active Branches</span>
            <strong>{activeBranches}</strong>
          </div>

        </div>

        <div className="branch-stat-card">

          <div className="branch-stat-icon inactive">
            <BsXCircleFill />
          </div>

          <div>
            <span>Inactive Branches</span>
            <strong>{inactiveBranches}</strong>
          </div>

        </div>

        <div className="branch-stat-card">

          <div className="branch-stat-icon employees">
            <BsPeople />
          </div>

          <div>
            <span>Total Employees</span>
            <strong>
              {totalEmployees}
            </strong>
          </div>

        </div>

      </div>

      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="branch-toolbar">

        <div className="branch-search">

          <BsSearch />

          <input
            type="text"
            placeholder="Search branch, code, location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

        <select
          value={stateFilter}
          onChange={(e) => {
            setStateFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {stateOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {branchStatusOptions.map(
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

        {(search ||
          stateFilter ||
          statusFilter) && (
          <button
            className="branch-reset-btn"
            onClick={resetFilters}
          >
            Reset
          </button>
        )}

      </div>

      {/* =========================
          TABLE CARD
      ========================= */}

      <div className="branch-table-card">

        <div className="branch-table-header">

          <div>
            <h2>Branches</h2>

            <p>
              Showing{" "}
              <strong>
                {filteredBranches.length}
              </strong>{" "}
              branches
            </p>
          </div>

          <span className="branch-count-badge">
            {filteredBranches.length} Results
          </span>

        </div>

        <div className="branch-table-wrapper">

          <table className="branch-table">

            <thead>
              <tr>
                <th>Branch</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Employees</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {paginatedBranches.length > 0 ? (
                paginatedBranches.map(
                  (branch) => (
                    <tr key={branch.id}>

                      {/* BRANCH */}
                      <td>

                        <div className="branch-info">

                          <div className="branch-avatar">
                            <BsBuilding />
                          </div>

                          <div>
                            <strong>
                              {branch.name}
                            </strong>

                            <span>
                              {branch.code}
                            </span>
                          </div>

                        </div>

                      </td>

                      {/* LOCATION */}
                      <td>

                        <div className="branch-location">

                          <BsGeoAlt />

                          <div>
                            <strong>
                              {branch.location}
                            </strong>

                            <span>
                              {branch.state}
                            </span>
                          </div>

                        </div>

                      </td>

                      {/* MANAGER */}
                      <td>

                        <div className="branch-manager">

                          <div className="manager-avatar">
                            {branch.manager
                              .charAt(0)}
                          </div>

                          <span>
                            {branch.manager}
                          </span>

                        </div>

                      </td>

                      {/* EMPLOYEES */}
                      <td>

                        <div className="employee-count">

                          <BsPeople />

                          <strong>
                            {branch.employeeCount}
                          </strong>

                        </div>

                      </td>

                      {/* CONTACT */}
                      <td>

                        <div className="branch-contact">

                          <span>
                            <BsTelephone />
                            {branch.phone}
                          </span>

                          <span>
                            <BsEnvelope />
                            {branch.email}
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}
                      <td>

                        <span
                          className={`branch-status ${
                            branch.status ===
                            "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot" />

                          {branch.status}
                        </span>

                      </td>

                      {/* ACTION */}
                      <td>

                        <div className="branch-action-wrapper">

                          <button
                            className="branch-action-btn"
                            onClick={() =>
                              setOpenAction(
                                openAction ===
                                  branch.id
                                  ? null
                                  : branch.id
                              )
                            }
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {openAction ===
                            branch.id && (
                            <div className="branch-action-menu">

                              <button
                                onClick={() =>
                                  handleView(
                                    branch
                                  )
                                }
                              >
                                <BsEye />
                                View Details
                              </button>

                              <button
                                onClick={() =>
                                  handleEdit(
                                    branch
                                  )
                                }
                              >
                                <BsPencilSquare />
                                Edit Branch
                              </button>

                              <button
                                onClick={() =>
                                  toggleStatus(
                                    branch
                                  )
                                }
                              >
                                {branch.status ===
                                "Active" ? (
                                  <>
                                    <BsXCircleFill />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <BsCheckCircleFill />
                                    Activate
                                  </>
                                )}
                              </button>

                              <button
                                className="danger"
                                onClick={() =>
                                  handleDelete(
                                    branch
                                  )
                                }
                              >
                                <BsTrash3 />
                                Delete
                              </button>

                            </div>
                          )}

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="branch-empty"
                  >
                    <BsBuilding />

                    <h3>
                      No branches found
                    </h3>

                    <p>
                      Try changing your search
                      or filters.
                    </p>

                    <button
                      onClick={resetFilters}
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        {totalPages > 1 && (
          <div className="branch-pagination">

            <span>
              Showing{" "}
              {startIndex + 1}–
              {Math.min(
                startIndex + itemsPerPage,
                filteredBranches.length
              )}{" "}
              of {filteredBranches.length}
            </span>

            <div className="pagination-buttons">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  changePage(
                    currentPage - 1
                  )
                }
              >
                Previous
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
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
                  changePage(
                    currentPage + 1
                  )
                }
              >
                Next
              </button>

            </div>

          </div>
        )}

      </div>

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showModal && (
        <div
          className="branch-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="branch-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="branch-modal-header">

              <div>
                <h2>
                  {editingBranch
                    ? "Edit Branch"
                    : "Add New Branch"}
                </h2>

                <p>
                  Enter branch information
                  below.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <BsXLg />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
            >

              <div className="branch-form-section">

                <h3>
                  Basic Information
                </h3>

                <div className="branch-form-grid">

                  <div className="branch-form-group">

                    <label>
                      Branch Code
                      <span>*</span>
                    </label>

                    <input
                      name="code"
                      value={form.code}
                      onChange={
                        handleInputChange
                      }
                      placeholder="BR001"
                      required
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      Branch Name
                      <span>*</span>
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={
                        handleInputChange
                      }
                      placeholder="Head Office"
                      required
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      Location
                    </label>

                    <input
                      name="location"
                      value={
                        form.location
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="New Delhi"
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      City
                      <span>*</span>
                    </label>

                    <input
                      name="city"
                      value={form.city}
                      onChange={
                        handleInputChange
                      }
                      placeholder="New Delhi"
                      required
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      State
                    </label>

                    <select
                      name="state"
                      value={form.state}
                      onChange={
                        handleInputChange
                      }
                    >
                      <option value="">
                        Select State
                      </option>

                      {stateOptions
                        .filter(
                          (item) =>
                            item.value
                        )
                        .map(
                          (item) => (
                            <option
                              key={
                                item.value
                              }
                              value={
                                item.value
                              }
                            >
                              {
                                item.label
                              }
                            </option>
                          )
                        )}
                    </select>

                  </div>

                  <div className="branch-form-group">

                    <label>
                      Pincode
                    </label>

                    <input
                      name="pincode"
                      value={
                        form.pincode
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="110020"
                      maxLength="6"
                    />

                  </div>

                </div>

              </div>

              <div className="branch-form-section">

                <h3>
                  Contact Information
                </h3>

                <div className="branch-form-grid">

                  <div className="branch-form-group">

                    <label>
                      Phone Number
                    </label>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={
                        handleInputChange
                      }
                      placeholder="+91 98765 43210"
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={
                        handleInputChange
                      }
                      placeholder="branch@company.com"
                    />

                  </div>

                  <div className="branch-form-group full">

                    <label>
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={
                        form.address
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter complete branch address"
                      rows="3"
                    />

                  </div>

                </div>

              </div>

              <div className="branch-form-section">

                <h3>
                  Branch Administration
                </h3>

                <div className="branch-form-grid">

                  <div className="branch-form-group">

                    <label>
                      Branch Manager
                    </label>

                    <input
                      name="manager"
                      value={
                        form.manager
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Manager name"
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      Employee Count
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="employeeCount"
                      value={
                        form.employeeCount
                      }
                      onChange={
                        handleInputChange
                      }
                    />

                  </div>

                  <div className="branch-form-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={
                        form.status
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

              </div>

              <div className="branch-modal-footer">

                <button
                  type="button"
                  className="branch-cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="branch-save-btn"
                >
                  {editingBranch
                    ? "Update Branch"
                    : "Create Branch"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =========================
          DETAILS MODAL
      ========================= */}

      {showDetails &&
        selectedBranch && (
          <div
            className="branch-modal-overlay"
            onClick={() =>
              setShowDetails(false)
            }
          >

            <div
              className="branch-details-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="branch-modal-header">

                <div>
                  <h2>
                    Branch Details
                  </h2>

                  <p>
                    Complete branch information
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowDetails(false)
                  }
                >
                  <BsXLg />
                </button>

              </div>

              <div className="branch-details-top">

                <div className="branch-details-icon">
                  <BsBuilding />
                </div>

                <div>
                  <h2>
                    {selectedBranch.name}
                  </h2>

                  <span>
                    {selectedBranch.code}
                  </span>
                </div>

                <span
                  className={`branch-status ${
                    selectedBranch.status ===
                    "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <span className="status-dot" />
                  {selectedBranch.status}
                </span>

              </div>

              <div className="branch-details-grid">

                <div className="branch-detail-item">
                  <span>
                    <BsGeoAlt />
                    Location
                  </span>

                  <strong>
                    {selectedBranch.location}
                  </strong>
                </div>

                <div className="branch-detail-item">
                  <span>
                    <BsPerson />
                    Branch Manager
                  </span>

                  <strong>
                    {selectedBranch.manager}
                  </strong>
                </div>

                <div className="branch-detail-item">
                  <span>
                    <BsPeople />
                    Employees
                  </span>

                  <strong>
                    {selectedBranch.employeeCount}
                  </strong>
                </div>

                <div className="branch-detail-item">
                  <span>
                    <BsTelephone />
                    Phone
                  </span>

                  <strong>
                    {selectedBranch.phone}
                  </strong>
                </div>

                <div className="branch-detail-item">
                  <span>
                    <BsEnvelope />
                    Email
                  </span>

                  <strong>
                    {selectedBranch.email}
                  </strong>
                </div>

                <div className="branch-detail-item">
                  <span>
                    <BsGeoAlt />
                    City / State
                  </span>

                  <strong>
                    {selectedBranch.city},{" "}
                    {selectedBranch.state}
                  </strong>
                </div>

                <div className="branch-detail-item full">
                  <span>
                    Address
                  </span>

                  <strong>
                    {selectedBranch.address}
                  </strong>
                </div>

              </div>

              <div className="branch-details-footer">

                <button
                  className="branch-cancel-btn"
                  onClick={() =>
                    setShowDetails(false)
                  }
                >
                  Close
                </button>

                <button
                  className="branch-save-btn"
                  onClick={() => {
                    setShowDetails(false);
                    handleEdit(
                      selectedBranch
                    );
                  }}
                >
                  <BsPencilSquare />
                  Edit Branch
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default Branch;