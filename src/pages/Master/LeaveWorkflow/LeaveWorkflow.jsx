import React, { useMemo, useState } from "react";
import {
  BsPlusLg,
  BsSearch,
  BsPencilSquare,
  BsTrash,
  BsThreeDotsVertical,
  BsCheckCircleFill,
  BsXCircleFill,
  BsDiagram3Fill,
  BsPersonCheckFill,
  BsArrowRight,
  BsLightningChargeFill,
} from "react-icons/bs";

import {
  leaveWorkflowData,
  workflowStatusOptions,
  workflowApplicabilityOptions,
  approverOptions,
  approvalLevelOptions,
} from "./LeaveWorkflowData";

import "./LeaveWorkflow.css";

const availableLeaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Unpaid Leave",
  "Maternity Leave",
  "Paternity Leave",
];

const LeaveWorkflow = () => {
  const [workflows, setWorkflows] = useState(
    leaveWorkflowData
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [applicableTo, setApplicableTo] =
    useState("All Employees");

  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    applicableTo: "All Employees",
    leaveTypes: [],
    approvalLevels: 1,
    level1: "Reporting Manager",
    level2: "HR Manager",
    level3: "HR Head",
    autoApproval: false,
    status: "Active",
  });

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((item) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        item.name
          .toLowerCase()
          .includes(searchText) ||
        item.description
          .toLowerCase()
          .includes(searchText) ||
        item.level1
          .toLowerCase()
          .includes(searchText) ||
        item.level2
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        status === "All Status" ||
        item.status === status;

      const matchesApplicability =
        applicableTo === "All Employees" ||
        item.applicableTo === applicableTo;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesApplicability
      );
    });
  }, [
    workflows,
    search,
    status,
    applicableTo,
  ]);

  const stats = useMemo(() => {
    const active = workflows.filter(
      (item) => item.status === "Active"
    ).length;

    const inactive = workflows.filter(
      (item) => item.status === "Inactive"
    ).length;

    const multiLevel = workflows.filter(
      (item) => item.approvalLevels > 1
    ).length;

    const autoApproval = workflows.filter(
      (item) => item.autoApproval
    ).length;

    return {
      total: workflows.length,
      active,
      inactive,
      multiLevel,
      autoApproval,
    };
  }, [workflows]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      applicableTo: "All Employees",
      leaveTypes: [],
      approvalLevels: 1,
      level1: "Reporting Manager",
      level2: "HR Manager",
      level3: "HR Head",
      autoApproval: false,
      status: "Active",
    });

    setEditingWorkflow(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (workflow) => {
    setEditingWorkflow(workflow);

    setFormData({
      name: workflow.name,
      description: workflow.description,
      applicableTo: workflow.applicableTo,
      leaveTypes: workflow.leaveTypes || [],
      approvalLevels: workflow.approvalLevels,
      level1: workflow.level1 || "Reporting Manager",
      level2: workflow.level2 || "HR Manager",
      level3: workflow.level3 || "HR Head",
      autoApproval: workflow.autoApproval,
      status: workflow.status,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleLeaveTypeChange = (leaveType) => {
    setFormData((prev) => {
      const alreadySelected =
        prev.leaveTypes.includes(leaveType);

      return {
        ...prev,
        leaveTypes: alreadySelected
          ? prev.leaveTypes.filter(
              (item) => item !== leaveType
            )
          : [...prev.leaveTypes, leaveType],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Workflow name is required.");
      return;
    }

    if (formData.leaveTypes.length === 0) {
      alert("Please select at least one leave type.");
      return;
    }

    const approvalLevels = Number(
      formData.approvalLevels
    );

    const workflowPayload = {
      ...formData,
      approvalLevels,
      level2:
        approvalLevels >= 2
          ? formData.level2
          : "",
      level3:
        approvalLevels >= 3
          ? formData.level3
          : "",
    };

    if (editingWorkflow) {
      setWorkflows((prev) =>
        prev.map((item) =>
          item.id === editingWorkflow.id
            ? {
                ...item,
                ...workflowPayload,
              }
            : item
        )
      );

      alert(
        "Leave workflow updated successfully."
      );
    } else {
      const newWorkflow = {
        id: Date.now(),
        ...workflowPayload,
      };

      setWorkflows((prev) => [
        newWorkflow,
        ...prev,
      ]);

      alert(
        "Leave workflow created successfully."
      );
    }

    closeForm();
  };

  const handleDelete = (id) => {
    const workflow = workflows.find(
      (item) => item.id === id
    );

    if (!workflow) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${workflow.name}"?`
    );

    if (!confirmed) return;

    setWorkflows((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setWorkflows((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );
  };

  return (
    <div className="leave-workflow-page">

      {/* HEADER */}

      <div className="leave-workflow-header">

        <div>
          <div className="leave-workflow-breadcrumb">
            Masters
            <span>/</span>
            Leave Approval Workflow
          </div>

          <h1>Leave Approval Workflow</h1>

          <p>
            Configure approval levels and approvers
            for employee leave requests.
          </p>
        </div>

        <button
          className="leave-workflow-add-btn"
          onClick={openAddForm}
        >
          <BsPlusLg />
          Add Workflow
        </button>

      </div>

      {/* STATS */}

      <div className="leave-workflow-stats">

        <div className="leave-workflow-stat-card">

          <div className="workflow-stat-icon blue">
            <BsDiagram3Fill />
          </div>

          <div>
            <span>Total Workflows</span>
            <strong>{stats.total}</strong>
          </div>

        </div>

        <div className="leave-workflow-stat-card">

          <div className="workflow-stat-icon green">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Active</span>
            <strong>{stats.active}</strong>
          </div>

        </div>

        <div className="leave-workflow-stat-card">

          <div className="workflow-stat-icon gray">
            <BsXCircleFill />
          </div>

          <div>
            <span>Inactive</span>
            <strong>{stats.inactive}</strong>
          </div>

        </div>

        <div className="leave-workflow-stat-card">

          <div className="workflow-stat-icon orange">
            <BsPersonCheckFill />
          </div>

          <div>
            <span>Multi-Level</span>
            <strong>{stats.multiLevel}</strong>
          </div>

        </div>

        <div className="leave-workflow-stat-card">

          <div className="workflow-stat-icon purple">
            <BsLightningChargeFill />
          </div>

          <div>
            <span>Auto Approval</span>
            <strong>{stats.autoApproval}</strong>
          </div>

        </div>

      </div>

      {/* TOOLBAR */}

      <div className="leave-workflow-toolbar">

        <div className="leave-workflow-search">

          <BsSearch />

          <input
            type="text"
            placeholder="Search workflow..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          {workflowStatusOptions.map(
            (item) => (
              <option key={item}>
                {item}
              </option>
            )
          )}
        </select>

        <select
          value={applicableTo}
          onChange={(e) =>
            setApplicableTo(e.target.value)
          }
        >
          {workflowApplicabilityOptions.map(
            (item) => (
              <option key={item}>
                {item}
              </option>
            )
          )}
        </select>

      </div>

      {/* WORKFLOW LIST */}

      <div className="leave-workflow-card">

        <div className="leave-workflow-card-header">

          <div>
            <h2>Approval Workflows</h2>

            <p>
              {filteredWorkflows.length} workflow
              {filteredWorkflows.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

          <div className="workflow-header-icon">
            <BsDiagram3Fill />
          </div>

        </div>

        <div className="leave-workflow-list">

          {filteredWorkflows.map(
            (workflow) => (

              <div
                className="workflow-row"
                key={workflow.id}
              >

                {/* INFO */}

                <div className="workflow-info">

                  <div className="workflow-title-row">

                    <div className="workflow-code">
                      WF
                    </div>

                    <div>
                      <h3>
                        {workflow.name}
                      </h3>

                      <p>
                        {workflow.description}
                      </p>
                    </div>

                  </div>

                  <div className="workflow-tags">

                    <span>
                      {workflow.applicableTo}
                    </span>

                    <span>
                      {workflow.leaveTypes.length} Leave Type
                      {workflow.leaveTypes.length !== 1
                        ? "s"
                        : ""}
                    </span>

                  </div>

                </div>

                {/* APPROVAL FLOW */}

                <div className="workflow-flow">

                  <div className="flow-label">
                    Approval Flow
                  </div>

                  <div className="flow-steps">

                    <div className="flow-step">

                      <div className="flow-step-number">
                        1
                      </div>

                      <div>
                        <small>
                          Level 1
                        </small>

                        <strong>
                          {workflow.level1}
                        </strong>
                      </div>

                    </div>

                    {workflow.approvalLevels >=
                      2 && (
                      <BsArrowRight className="flow-arrow" />
                    )}

                    {workflow.approvalLevels >=
                      2 && (
                      <div className="flow-step">

                        <div className="flow-step-number">
                          2
                        </div>

                        <div>
                          <small>
                            Level 2
                          </small>

                          <strong>
                            {workflow.level2}
                          </strong>
                        </div>

                      </div>
                    )}

                    {workflow.approvalLevels >=
                      3 && (
                      <>
                        <BsArrowRight className="flow-arrow" />

                        <div className="flow-step">

                          <div className="flow-step-number">
                            3
                          </div>

                          <div>
                            <small>
                              Level 3
                            </small>

                            <strong>
                              {workflow.level3}
                            </strong>
                          </div>

                        </div>
                      </>
                    )}

                  </div>

                </div>

                {/* STATUS */}

                <div className="workflow-status">

                  <button
                    className={`workflow-status-btn ${
                      workflow.status ===
                      "Active"
                        ? "active"
                        : "inactive"
                    }`}
                    onClick={() =>
                      toggleStatus(
                        workflow.id
                      )
                    }
                  >
                    {workflow.status ===
                    "Active" ? (
                      <>
                        <BsCheckCircleFill />
                        Active
                      </>
                    ) : (
                      <>
                        <BsXCircleFill />
                        Inactive
                      </>
                    )}
                  </button>

                </div>

                {/* ACTION */}

                <div className="workflow-actions">

                  <button
                    className="workflow-action edit"
                    title="Edit"
                    onClick={() =>
                      openEditForm(
                        workflow
                      )
                    }
                  >
                    <BsPencilSquare />
                  </button>

                  <button
                    className="workflow-action delete"
                    title="Delete"
                    onClick={() =>
                      handleDelete(
                        workflow.id
                      )
                    }
                  >
                    <BsTrash />
                  </button>

                  <button
                    className="workflow-action more"
                    title="More"
                  >
                    <BsThreeDotsVertical />
                  </button>

                </div>

              </div>

            )
          )}

        </div>

        {filteredWorkflows.length === 0 && (
          <div className="workflow-empty">

            <BsSearch />

            <h3>
              No Workflows Found
            </h3>

            <p>
              Try changing your search or
              filter criteria.
            </p>

          </div>
        )}

      </div>

      {/* MODAL */}

      {showForm && (
        <div
          className="workflow-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              closeForm();
            }
          }}
        >

          <div className="workflow-modal">

            <div className="workflow-modal-header">

              <div>
                <h2>
                  {editingWorkflow
                    ? "Edit Approval Workflow"
                    : "Create Approval Workflow"}
                </h2>

                <p>
                  Configure how leave requests
                  move through the approval process.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* BASIC INFORMATION */}

              <div className="workflow-form-section">

                <div className="workflow-section-heading">
                  <h3>
                    Workflow Information
                  </h3>

                  <p>
                    Define where this workflow
                    will be used.
                  </p>
                </div>

                <div className="workflow-form-grid">

                  <div className="workflow-form-group">

                    <label>
                      Workflow Name
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Standard Employee Leave"
                      required
                    />

                  </div>

                  <div className="workflow-form-group">

                    <label>
                      Applicable To
                    </label>

                    <select
                      name="applicableTo"
                      value={
                        formData.applicableTo
                      }
                      onChange={handleChange}
                    >
                      {workflowApplicabilityOptions
                        .filter(
                          (item) =>
                            item !==
                            "All Employees" ||
                            true
                        )
                        .map((item) => (
                          <option key={item}>
                            {item}
                          </option>
                        ))}
                    </select>

                  </div>

                  <div className="workflow-form-group full">

                    <label>
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe this approval workflow..."
                    />

                  </div>

                </div>

              </div>

              {/* LEAVE TYPES */}

              <div className="workflow-form-section">

                <div className="workflow-section-heading">

                  <h3>
                    Leave Types
                  </h3>

                  <p>
                    Select the leave types to
                    which this workflow applies.
                  </p>

                </div>

                <div className="leave-type-checkbox-grid">

                  {availableLeaveTypes.map(
                    (leaveType) => {

                      const selected =
                        formData.leaveTypes.includes(
                          leaveType
                        );

                      return (
                        <label
                          key={leaveType}
                          className={`leave-type-checkbox ${
                            selected
                              ? "selected"
                              : ""
                          }`}
                        >

                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() =>
                              handleLeaveTypeChange(
                                leaveType
                              )
                            }
                          />

                          <span className="checkbox-mark">
                            {selected &&
                              "✓"}
                          </span>

                          <span>
                            {leaveType}
                          </span>

                        </label>
                      );
                    }
                  )}

                </div>

              </div>

              {/* APPROVAL LEVELS */}

              <div className="workflow-form-section">

                <div className="workflow-section-heading">

                  <h3>
                    Approval Levels
                  </h3>

                  <p>
                    Configure the number of
                    people required to approve
                    the request.
                  </p>

                </div>

                <div className="workflow-level-select">

                  {approvalLevelOptions.map(
                    (level) => (
                      <label
                        key={level}
                        className={
                          Number(
                            formData.approvalLevels
                          ) === level
                            ? "level-option selected"
                            : "level-option"
                        }
                      >

                        <input
                          type="radio"
                          name="approvalLevels"
                          value={level}
                          checked={
                            Number(
                              formData.approvalLevels
                            ) === level
                          }
                          onChange={
                            handleChange
                          }
                        />

                        <strong>
                          {level}
                        </strong>

                        <span>
                          {level === 1
                            ? "Single Approval"
                            : level === 2
                            ? "Two-Level Approval"
                            : "Three-Level Approval"}
                        </span>

                      </label>
                    )
                  )}

                </div>

                <div className="approval-level-grid">

                  <div className="approver-box">

                    <div className="approver-number">
                      1
                    </div>

                    <div className="workflow-form-group">

                      <label>
                        Level 1 Approver
                      </label>

                      <select
                        name="level1"
                        value={
                          formData.level1
                        }
                        onChange={
                          handleChange
                        }
                      >
                        {approverOptions.map(
                          (item) => (
                            <option
                              key={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>

                    </div>

                  </div>

                  {Number(
                    formData.approvalLevels
                  ) >= 2 && (
                    <div className="approver-box">

                      <div className="approver-number">
                        2
                      </div>

                      <div className="workflow-form-group">

                        <label>
                          Level 2 Approver
                        </label>

                        <select
                          name="level2"
                          value={
                            formData.level2
                          }
                          onChange={
                            handleChange
                          }
                        >
                          {approverOptions.map(
                            (item) => (
                              <option
                                key={item}
                              >
                                {item}
                              </option>
                            )
                          )}
                        </select>

                      </div>

                    </div>
                  )}

                  {Number(
                    formData.approvalLevels
                  ) >= 3 && (
                    <div className="approver-box">

                      <div className="approver-number">
                        3
                      </div>

                      <div className="workflow-form-group">

                        <label>
                          Level 3 Approver
                        </label>

                        <select
                          name="level3"
                          value={
                            formData.level3
                          }
                          onChange={
                            handleChange
                          }
                        >
                          {approverOptions.map(
                            (item) => (
                              <option
                                key={item}
                              >
                                {item}
                              </option>
                            )
                          )}
                        </select>

                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* AUTO APPROVAL */}

              <div className="workflow-policy-box">

                <div className="workflow-policy-content">

                  <div className="workflow-policy-icon">
                    <BsLightningChargeFill />
                  </div>

                  <div>
                    <strong>
                      Enable Auto Approval
                    </strong>

                    <span>
                      Automatically approve requests
                      that meet configured business rules.
                    </span>
                  </div>

                </div>

                <label className="workflow-switch">

                  <input
                    type="checkbox"
                    name="autoApproval"
                    checked={
                      formData.autoApproval
                    }
                    onChange={handleChange}
                  />

                  <span></span>

                </label>

              </div>

              {/* STATUS */}

              <div className="workflow-status-field">

                <div className="workflow-form-group">

                  <label>
                    Workflow Status
                  </label>

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

              {/* FOOTER */}

              <div className="workflow-modal-footer">

                <button
                  type="button"
                  className="workflow-cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="workflow-save-btn"
                >
                  {editingWorkflow
                    ? "Update Workflow"
                    : "Create Workflow"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default LeaveWorkflow;