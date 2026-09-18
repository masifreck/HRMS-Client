import { useMemo, useState } from "react";
import {
  BsBank,
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
  bankData,
  bankStatusOptions,
  bankCityOptions,
} from "./BankData";

import "./Bank.css";

const ITEMS_PER_PAGE = 6;

const emptyForm = {
  code: "",
  name: "",
  branchName: "",
  branchCode: "",
  ifscCode: "",
  address: "",
  city: "",
  state: "",
  contactNumber: "",
  email: "",
  status: "Active",
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Bank = () => {
  const [banks, setBanks] = useState(bankData);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingBank, setEditingBank] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredBanks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return banks.filter((bank) => {
      const matchesSearch =
        !query ||
        bank.code.toLowerCase().includes(query) ||
        bank.name.toLowerCase().includes(query) ||
        bank.branchName.toLowerCase().includes(query) ||
        bank.ifscCode.toLowerCase().includes(query) ||
        bank.city.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        bank.status === statusFilter;

      const matchesCity =
        cityFilter === "All" ||
        bank.city === cityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCity
      );
    });
  }, [banks, search, statusFilter, cityFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBanks.length / ITEMS_PER_PAGE)
  );

  const paginatedBanks = filteredBanks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalBanks = banks.length;

  const activeBanks = banks.filter(
    (bank) => bank.status === "Active"
  ).length;

  const inactiveBanks = banks.filter(
    (bank) => bank.status === "Inactive"
  ).length;

  const assignedEmployees = banks.reduce(
    (total, bank) => total + bank.employeeCount,
    0
  );

  const resetPagination = () => {
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearch(value);
    resetPagination();
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    resetPagination();
  };

  const handleCityFilter = (value) => {
    setCityFilter(value);
    resetPagination();
  };

  const openAddModal = () => {
    setEditingBank(null);
    setFormData(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (bank) => {
    setEditingBank(bank);

    setFormData({
      code: bank.code || "",
      name: bank.name || "",
      branchName: bank.branchName || "",
      branchCode: bank.branchCode || "",
      ifscCode: bank.ifscCode || "",
      address: bank.address || "",
      city: bank.city || "",
      state: bank.state || "",
      contactNumber: bank.contactNumber || "",
      email: bank.email || "",
      status: bank.status || "Active",
    });

    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBank(null);
    setFormData(emptyForm);
    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Bank code is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Bank name is required";
    }

    if (!formData.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
    }

    if (!formData.branchCode.trim()) {
      newErrors.branchCode = "Branch code is required";
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingBank) {
      setBanks((prev) =>
        prev.map((bank) =>
          bank.id === editingBank.id
            ? {
                ...bank,
                ...formData,
              }
            : bank
        )
      );
    } else {
      const newBank = {
        id: Date.now(),
        ...formData,
        employeeCount: 0,
        createdOn: new Date()
          .toISOString()
          .split("T")[0],
      };

      setBanks((prev) => [newBank, ...prev]);
      setCurrentPage(1);
    }

    closeModal();
  };

  const handleView = (bank) => {
    setSelectedBank(bank);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedBank(null);
  };

  const handleToggleStatus = (bank) => {
    const newStatus =
      bank.status === "Active"
        ? "Inactive"
        : "Active";

    setBanks((prev) =>
      prev.map((item) =>
        item.id === bank.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  const handleDelete = (bank) => {
    if (bank.employeeCount > 0) {
      window.alert(
        `Cannot delete ${bank.name}. ${bank.employeeCount} employee(s) are currently assigned to this bank.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${bank.name}?`
    );

    if (!confirmed) return;

    setBanks((prev) =>
      prev.filter((item) => item.id !== bank.id)
    );

    if (
      paginatedBanks.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Code",
      "Bank Name",
      "Branch Name",
      "Branch Code",
      "IFSC Code",
      "City",
      "State",
      "Contact Number",
      "Email",
      "Employees",
      "Status",
      "Created On",
    ];

    const rows = filteredBanks.map((bank) => [
      bank.code,
      bank.name,
      bank.branchName,
      bank.branchCode,
      bank.ifscCode,
      bank.city,
      bank.state,
      bank.contactNumber,
      bank.email,
      bank.employeeCount,
      bank.status,
      bank.createdOn,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "bank-master.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(1, prev - 1)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(totalPages, prev + 1)
    );
  };

  return (
    <div className="bank-page">

      {/* HEADER */}

      <div className="bank-header">
        <div>
          <div className="bank-title-row">
            <div className="bank-title-icon">
              <BsBank />
            </div>

            <div>
              <h1>Bank Master</h1>
              <p>
                Manage company bank accounts and branch
                information
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="bank-add-btn"
          onClick={openAddModal}
        >
          <BsPlusLg />
          <span>Add Bank</span>
        </button>
      </div>

      {/* STATISTICS */}

      <div className="bank-stats">

        <div className="bank-stat-card">
          <div className="bank-stat-icon total">
            <BsBank />
          </div>

          <div>
            <span>Total Banks</span>
            <strong>{totalBanks}</strong>
          </div>
        </div>

        <div className="bank-stat-card">
          <div className="bank-stat-icon active">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeBanks}</strong>
          </div>
        </div>

        <div className="bank-stat-card">
          <div className="bank-stat-icon inactive">
            <BsXCircleFill />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{inactiveBanks}</strong>
          </div>
        </div>

        <div className="bank-stat-card">
          <div className="bank-stat-icon employees">
            <BsPeopleFill />
          </div>

          <div>
            <span>Assigned Employees</span>
            <strong>{assignedEmployees}</strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="bank-toolbar">

        <div className="bank-search">
          <BsSearch />

          <input
            type="text"
            placeholder="Search bank, branch, IFSC..."
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />
        </div>

        <select
          value={cityFilter}
          onChange={(e) =>
            handleCityFilter(e.target.value)
          }
          className="bank-filter"
        >
          {bankCityOptions.map((option) => (
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
          onChange={(e) =>
            handleStatusFilter(e.target.value)
          }
          className="bank-filter"
        >
          {bankStatusOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="bank-export-btn"
          onClick={exportCSV}
        >
          <BsDownload />
          <span>Export</span>
        </button>

      </div>

      {/* TABLE */}

      <div className="bank-table-card">

        <div className="bank-table-wrapper">

          <table className="bank-table">

            <thead>
              <tr>
                <th>Bank</th>
                <th>Branch</th>
                <th>IFSC Code</th>
                <th>Location</th>
                <th>Employees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginatedBanks.length > 0 ? (
                paginatedBanks.map((bank) => (

                  <tr key={bank.id}>

                    <td>
                      <div className="bank-name-cell">

                        <div className="bank-avatar">
                          <BsBank />
                        </div>

                        <div>
                          <strong>
                            {bank.name}
                          </strong>

                          <span>
                            {bank.code}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div className="bank-branch-cell">
                        <strong>
                          {bank.branchName}
                        </strong>

                        <span>
                          {bank.branchCode}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="bank-ifsc">
                        {bank.ifscCode}
                      </span>
                    </td>

                    <td>
                      <div className="bank-location-cell">
                        <strong>
                          {bank.city}
                        </strong>

                        <span>
                          {bank.state}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="bank-employee-count">
                        {bank.employeeCount}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`bank-status ${
                          bank.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        <span className="bank-status-dot" />
                        {bank.status}
                      </span>
                    </td>

                    <td>

                      <div className="bank-actions">

                        <button
                          type="button"
                          className="bank-action view"
                          title="View"
                          onClick={() =>
                            handleView(bank)
                          }
                        >
                          <BsEye />
                        </button>

                        <button
                          type="button"
                          className="bank-action edit"
                          title="Edit"
                          onClick={() =>
                            openEditModal(bank)
                          }
                        >
                          <BsPencilSquare />
                        </button>

                        <button
                          type="button"
                          className="bank-action toggle"
                          title={
                            bank.status === "Active"
                              ? "Deactivate"
                              : "Activate"
                          }
                          onClick={() =>
                            handleToggleStatus(bank)
                          }
                        >
                          {bank.status === "Active" ? (
                            <BsToggleOn />
                          ) : (
                            <BsToggleOff />
                          )}
                        </button>

                        <button
                          type="button"
                          className="bank-action delete"
                          title="Delete"
                          onClick={() =>
                            handleDelete(bank)
                          }
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
                    colSpan="7"
                    className="bank-empty-cell"
                  >
                    <div className="bank-empty-state">

                      <div className="bank-empty-icon">
                        <BsBank />
                      </div>

                      <h3>No banks found</h3>

                      <p>
                        Try changing your search or
                        filter criteria.
                      </p>

                    </div>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        {filteredBanks.length > 0 && (
          <div className="bank-pagination">

            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) *
                  ITEMS_PER_PAGE +
                  1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  currentPage *
                    ITEMS_PER_PAGE,
                  filteredBanks.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredBanks.length}
              </strong>{" "}
              banks
            </span>

            <div className="bank-pagination-buttons">

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
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
                  className={
                    currentPage === page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  currentPage === totalPages
                }
                onClick={goToNextPage}
              >
                <BsArrowRight />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <div
          className="bank-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeModal();
            }
          }}
        >

          <div className="bank-modal">

            <div className="bank-modal-header">

              <div>
                <h2>
                  {editingBank
                    ? "Edit Bank"
                    : "Add New Bank"}
                </h2>

                <p>
                  {editingBank
                    ? "Update bank and branch information"
                    : "Add a new bank and branch"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
              >
                <BsXLg />
              </button>

            </div>

            <form
              className="bank-form"
              onSubmit={handleSubmit}
            >

              <div className="bank-form-section">
                <h3>Bank Information</h3>

                <div className="bank-form-grid">

                  <div className="bank-form-group">
                    <label>
                      Bank Code
                      <span>*</span>
                    </label>

                    <input
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g. HDFC001"
                      className={
                        errors.code
                          ? "error"
                          : ""
                      }
                    />

                    {errors.code && (
                      <small>
                        {errors.code}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group">
                    <label>
                      Bank Name
                      <span>*</span>
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter bank name"
                      className={
                        errors.name
                          ? "error"
                          : ""
                      }
                    />

                    {errors.name && (
                      <small>
                        {errors.name}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group">
                    <label>
                      Branch Name
                      <span>*</span>
                    </label>

                    <input
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                      placeholder="Enter branch name"
                      className={
                        errors.branchName
                          ? "error"
                          : ""
                      }
                    />

                    {errors.branchName && (
                      <small>
                        {errors.branchName}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group">
                    <label>
                      Branch Code
                      <span>*</span>
                    </label>

                    <input
                      name="branchCode"
                      value={formData.branchCode}
                      onChange={handleChange}
                      placeholder="Enter branch code"
                      className={
                        errors.branchCode
                          ? "error"
                          : ""
                      }
                    />

                    {errors.branchCode && (
                      <small>
                        {errors.branchCode}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group">
                    <label>
                      IFSC Code
                      <span>*</span>
                    </label>

                    <input
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="Enter IFSC code"
                      className={
                        errors.ifscCode
                          ? "error"
                          : ""
                      }
                    />

                    {errors.ifscCode && (
                      <small>
                        {errors.ifscCode}
                      </small>
                    )}
                  </div>

                </div>
              </div>

              <div className="bank-form-section">
                <h3>Location</h3>

                <div className="bank-form-grid">

                  <div className="bank-form-group">
                    <label>
                      City
                      <span>*</span>
                    </label>

                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={
                        errors.city
                          ? "error"
                          : ""
                      }
                    >
                      <option value="">
                        Select city
                      </option>

                      {bankCityOptions
                        .filter(
                          (item) =>
                            item.value !== "All"
                        )
                        .map((item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        ))}
                    </select>

                    {errors.city && (
                      <small>
                        {errors.city}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group">
                    <label>
                      State
                      <span>*</span>
                    </label>

                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      className={
                        errors.state
                          ? "error"
                          : ""
                      }
                    />

                    {errors.state && (
                      <small>
                        {errors.state}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group full">
                    <label>Address</label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter branch address"
                      rows="3"
                    />
                  </div>

                </div>
              </div>

              <div className="bank-form-section">
                <h3>Contact Information</h3>

                <div className="bank-form-grid">

                  <div className="bank-form-group">
                    <label>
                      Contact Number
                    </label>

                    <input
                      name="contactNumber"
                      value={
                        formData.contactNumber
                      }
                      onChange={handleChange}
                      placeholder="Enter contact number"
                      maxLength="15"
                    />
                  </div>

                  <div className="bank-form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className={
                        errors.email
                          ? "error"
                          : ""
                      }
                    />

                    {errors.email && (
                      <small>
                        {errors.email}
                      </small>
                    )}
                  </div>

                  <div className="bank-form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
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

              <div className="bank-modal-footer">

                <button
                  type="button"
                  className="bank-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bank-save-btn"
                >
                  {editingBank
                    ? "Update Bank"
                    : "Save Bank"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* DETAILS MODAL */}

      {showDetails && selectedBank && (
        <div
          className="bank-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeDetails();
            }
          }}
        >

          <div className="bank-details-modal">

            <div className="bank-modal-header">

              <div className="bank-details-title">

                <div className="bank-details-icon">
                  <BsBank />
                </div>

                <div>
                  <h2>
                    {selectedBank.name}
                  </h2>

                  <p>
                    {selectedBank.code}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={closeDetails}
              >
                <BsXLg />
              </button>

            </div>

            <div className="bank-details-content">

              <div className="bank-details-status-row">

                <span
                  className={`bank-status ${
                    selectedBank.status ===
                    "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <span className="bank-status-dot" />
                  {selectedBank.status}
                </span>

                <span className="bank-details-created">
                  Created on{" "}
                  {formatDate(
                    selectedBank.createdOn
                  )}
                </span>

              </div>

              <div className="bank-details-grid">

                <div className="bank-detail-item">
                  <span>Branch Name</span>
                  <strong>
                    {selectedBank.branchName}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>Branch Code</span>
                  <strong>
                    {selectedBank.branchCode}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>IFSC Code</span>
                  <strong>
                    {selectedBank.ifscCode}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>Employees</span>
                  <strong>
                    {selectedBank.employeeCount}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>City</span>
                  <strong>
                    {selectedBank.city}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>State</span>
                  <strong>
                    {selectedBank.state}
                  </strong>
                </div>

                <div className="bank-detail-item full">
                  <span>Address</span>
                  <strong>
                    {selectedBank.address || "-"}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>Contact Number</span>
                  <strong>
                    {selectedBank.contactNumber ||
                      "-"}
                  </strong>
                </div>

                <div className="bank-detail-item">
                  <span>Email</span>
                  <strong>
                    {selectedBank.email || "-"}
                  </strong>
                </div>

              </div>

            </div>

            <div className="bank-details-footer">

              <button
                type="button"
                className="bank-cancel-btn"
                onClick={closeDetails}
              >
                Close
              </button>

              <button
                type="button"
                className="bank-save-btn"
                onClick={() => {
                  closeDetails();
                  openEditModal(selectedBank);
                }}
              >
                <BsPencilSquare />
                Edit Bank
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Bank;