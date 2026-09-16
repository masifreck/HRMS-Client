import React, { useMemo, useState } from "react";
import {
  BsPlusLg,
  BsSearch,
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
  BsToggleOn,
  BsToggleOff,
  BsCheckCircleFill,
  BsXCircleFill,
  BsCalendar2Check,
  BsArrowRepeat,
  BsCashCoin,
  BsPaperclip,
  BsShieldCheck,
} from "react-icons/bs";

import {
  leaveTypeData,
  applicableOptions,
  statusOptions,
} from "./LeaveTypeData";

import "./LeaveType.css";

const LeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState(leaveTypeData);

  const [search, setSearch] = useState("");
  const [applicableTo, setApplicableTo] = useState("All Employees");
  const [status, setStatus] = useState("All Status");

  const [showForm, setShowForm] = useState(false);
  const [editingLeaveType, setEditingLeaveType] = useState(null);

  const [openMenu, setOpenMenu] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    allocation: "",
    carryForward: false,
    maxCarryForward: "",
    encashable: false,
    requiresApproval: true,
    halfDayAllowed: true,
    attachmentRequired: false,
    applicableTo: "All Employees",
  });

  const filteredLeaveTypes = useMemo(() => {
    return leaveTypes.filter((item) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        item.name.toLowerCase().includes(searchValue) ||
        item.code.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue);

      const matchesApplicable =
        applicableTo === "All Employees" ||
        item.applicableTo === applicableTo;

      const matchesStatus =
        status === "All Status" || item.status === status;

      return matchesSearch && matchesApplicable && matchesStatus;
    });
  }, [leaveTypes, search, applicableTo, status]);

  const activeCount = leaveTypes.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = leaveTypes.filter(
    (item) => item.status === "Inactive"
  ).length;

  const carryForwardCount = leaveTypes.filter(
    (item) => item.carryForward
  ).length;

  const approvalCount = leaveTypes.filter(
    (item) => item.requiresApproval
  ).length;

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      allocation: "",
      carryForward: false,
      maxCarryForward: "",
      encashable: false,
      requiresApproval: true,
      halfDayAllowed: true,
      attachmentRequired: false,
      applicableTo: "All Employees",
    });

    setEditingLeaveType(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingLeaveType(item.id);

    setFormData({
      code: item.code,
      name: item.name,
      description: item.description,
      allocation: item.allocation,
      carryForward: item.carryForward,
      maxCarryForward: item.maxCarryForward,
      encashable: item.encashable,
      requiresApproval: item.requiresApproval,
      halfDayAllowed: item.halfDayAllowed,
      attachmentRequired: item.attachmentRequired,
      applicableTo: item.applicableTo,
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  const handleDelete = (id) => {
    const item = leaveTypes.find((leaveType) => leaveType.id === id);

    if (!item) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    setLeaveTypes((prev) =>
      prev.filter((leaveType) => leaveType.id !== id)
    );

    setOpenMenu(null);
  };

  const handleToggleStatus = (id) => {
    setLeaveTypes((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );

    setOpenMenu(null);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.code.trim() || !formData.name.trim()) {
      alert("Leave Code and Leave Name are required.");
      return;
    }

    if (editingLeaveType) {
      setLeaveTypes((prev) =>
        prev.map((item) =>
          item.id === editingLeaveType
            ? {
                ...item,
                code: formData.code.toUpperCase(),
                name: formData.name,
                description: formData.description,
                allocation: Number(formData.allocation) || 0,
                carryForward: formData.carryForward,
                maxCarryForward:
                  Number(formData.maxCarryForward) || 0,
                encashable: formData.encashable,
                requiresApproval: formData.requiresApproval,
                halfDayAllowed: formData.halfDayAllowed,
                attachmentRequired: formData.attachmentRequired,
                applicableTo: formData.applicableTo,
              }
            : item
        )
      );
    } else {
      const newLeaveType = {
        id: Date.now(),
        code: formData.code.toUpperCase(),
        name: formData.name,
        description: formData.description,
        allocation: Number(formData.allocation) || 0,
        carryForward: formData.carryForward,
        maxCarryForward:
          Number(formData.maxCarryForward) || 0,
        encashable: formData.encashable,
        requiresApproval: formData.requiresApproval,
        halfDayAllowed: formData.halfDayAllowed,
        attachmentRequired: formData.attachmentRequired,
        applicableTo: formData.applicableTo,
        status: "Active",
      };

      setLeaveTypes((prev) => [...prev, newLeaveType]);
    }

    setShowForm(false);
    resetForm();
  };

  return (
    <div className="leave-type-page">

      {/* PAGE HEADER */}
      <div className="leave-type-header">
        <div>
          <div className="leave-type-breadcrumb">
            <span>Masters</span>
            <span>/</span>
            <strong>Leave Type</strong>
          </div>

          <h1>Leave Type Management</h1>

          <p>
            Configure leave policies, balances, approvals and eligibility.
          </p>
        </div>

        <button
          className="leave-type-primary-btn"
          onClick={handleOpenAdd}
        >
          <BsPlusLg />
          Add Leave Type
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="leave-type-stats">

        <div className="leave-type-stat-card">
          <div className="leave-type-stat-icon blue">
            <BsCalendar2Check />
          </div>

          <div>
            <span>Total Leave Types</span>
            <strong>{leaveTypes.length}</strong>
          </div>
        </div>

        <div className="leave-type-stat-card">
          <div className="leave-type-stat-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="leave-type-stat-card">
          <div className="leave-type-stat-icon orange">
            <BsArrowRepeat />
          </div>

          <div>
            <span>Carry Forward</span>
            <strong>{carryForwardCount}</strong>
          </div>
        </div>

        <div className="leave-type-stat-card">
          <div className="leave-type-stat-icon purple">
            <BsShieldCheck />
          </div>

          <div>
            <span>Approval Required</span>
            <strong>{approvalCount}</strong>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="leave-type-toolbar">

        <div className="leave-type-search">
          <BsSearch />

          <input
            type="text"
            placeholder="Search leave type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={applicableTo}
          onChange={(e) => setApplicableTo(e.target.value)}
        >
          {applicableOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="leave-type-result-count">
          {filteredLeaveTypes.length} Results
        </div>
      </div>

      {/* TABLE */}
      <div className="leave-type-card">

        <div className="leave-type-card-header">
          <div>
            <h2>Leave Types</h2>
            <p>Manage organization leave policies.</p>
          </div>

          <span className="leave-type-active-info">
            {inactiveCount} inactive
          </span>
        </div>

        <div className="leave-type-table-wrapper">
          <table className="leave-type-table">

            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Allocation</th>
                <th>Carry Forward</th>
                <th>Encashable</th>
                <th>Approval</th>
                <th>Eligibility</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredLeaveTypes.length > 0 ? (
                filteredLeaveTypes.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <div className="leave-type-name-cell">

                        <div className="leave-type-code">
                          {item.code}
                        </div>

                        <div>
                          <strong>{item.name}</strong>

                          <span>
                            {item.description}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div className="allocation-value">
                        <strong>{item.allocation}</strong>
                        <span>days / year</span>
                      </div>
                    </td>

                    <td>
                      {item.carryForward ? (
                        <div className="feature-enabled">
                          <BsCheckCircleFill />
                          <span>
                            Yes
                            {item.maxCarryForward > 0 &&
                              ` (${item.maxCarryForward})`}
                          </span>
                        </div>
                      ) : (
                        <div className="feature-disabled">
                          <BsXCircleFill />
                          <span>No</span>
                        </div>
                      )}
                    </td>

                    <td>
                      {item.encashable ? (
                        <span className="yes-badge">Yes</span>
                      ) : (
                        <span className="no-badge">No</span>
                      )}
                    </td>

                    <td>
                      {item.requiresApproval ? (
                        <span className="yes-badge">Required</span>
                      ) : (
                        <span className="no-badge">Not Required</span>
                      )}
                    </td>

                    <td>
                      <span className="eligibility-badge">
                        {item.applicableTo}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
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

                    <td className="leave-type-action-cell">

                      <button
                        className="leave-type-menu-btn"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.id ? null : item.id
                          )
                        }
                      >
                        <BsThreeDotsVertical />
                      </button>

                      {openMenu === item.id && (
                        <div className="leave-type-action-menu">

                          <button
                            onClick={() => handleEdit(item)}
                          >
                            <BsPencilSquare />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleToggleStatus(item.id)
                            }
                          >
                            {item.status === "Active" ? (
                              <>
                                <BsToggleOff />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <BsToggleOn />
                                Activate
                              </>
                            )}
                          </button>

                          <button
                            className="danger"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                          >
                            <BsTrash />
                            Delete
                          </button>

                        </div>
                      )}

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="leave-type-empty">
                      <BsSearch />
                      <h3>No leave types found</h3>
                      <p>
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* POLICY INFORMATION */}
      <div className="leave-policy-info">

        <div className="leave-policy-info-icon">
          <BsShieldCheck />
        </div>

        <div>
          <h3>Leave Policy Configuration</h3>

          <p>
            Leave types define how employee leave is allocated,
            carried forward, approved and encashed. These settings
            will be used by the Leave, Attendance and Payroll modules.
          </p>
        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div
          className="leave-type-modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="leave-type-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="leave-type-modal-header">

              <div>
                <h2>
                  {editingLeaveType
                    ? "Edit Leave Type"
                    : "Add Leave Type"}
                </h2>

                <p>
                  Configure leave policy settings.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="leave-type-close-btn"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="leave-type-form-grid">

                <div className="form-field">
                  <label>
                    Leave Code <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g. CL"
                    maxLength={10}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>
                    Leave Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Casual Leave"
                    required
                  />
                </div>

                <div className="form-field full">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter leave type description..."
                    rows="3"
                    maxLength={250}
                  />
                </div>

                <div className="form-field">
                  <label>Annual Allocation</label>

                  <div className="input-with-suffix">
                    <input
                      type="number"
                      name="allocation"
                      value={formData.allocation}
                      onChange={handleInputChange}
                      placeholder="12"
                      min="0"
                    />

                    <span>Days</span>
                  </div>
                </div>

                <div className="form-field">
                  <label>Applicable To</label>

                  <select
                    name="applicableTo"
                    value={formData.applicableTo}
                    onChange={handleInputChange}
                  >
                    {applicableOptions
                      .filter(
                        (option) => option !== "All Employees"
                      )
                      .concat(["All Employees"])
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>

              </div>

              <div className="policy-settings">

                <h3>Policy Settings</h3>

                <div className="policy-option">

                  <div>
                    <strong>Carry Forward</strong>
                    <span>
                      Allow unused leave to move to the next year.
                    </span>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="carryForward"
                      checked={formData.carryForward}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>

                </div>

                {formData.carryForward && (
                  <div className="carry-forward-field">

                    <label>
                      Maximum Carry Forward Days
                    </label>

                    <input
                      type="number"
                      name="maxCarryForward"
                      value={formData.maxCarryForward}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="30"
                    />

                  </div>
                )}

                <div className="policy-option">

                  <div>
                    <strong>Leave Encashment</strong>
                    <span>
                      Allow unused leave to be converted into payment.
                    </span>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="encashable"
                      checked={formData.encashable}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>

                </div>

                <div className="policy-option">

                  <div>
                    <strong>Approval Required</strong>
                    <span>
                      Employee leave requests require manager approval.
                    </span>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="requiresApproval"
                      checked={formData.requiresApproval}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>

                </div>

                <div className="policy-option">

                  <div>
                    <strong>Half Day Allowed</strong>
                    <span>
                      Employees can apply for half-day leave.
                    </span>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="halfDayAllowed"
                      checked={formData.halfDayAllowed}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>

                </div>

                <div className="policy-option">

                  <div>
                    <strong>Attachment Required</strong>
                    <span>
                      Require supporting documents with applications.
                    </span>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      name="attachmentRequired"
                      checked={formData.attachmentRequired}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                  </label>

                </div>

              </div>

              <div className="leave-type-modal-footer">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingLeaveType
                    ? "Update Leave Type"
                    : "Create Leave Type"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default LeaveType;