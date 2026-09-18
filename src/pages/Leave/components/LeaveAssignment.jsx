import React, { useMemo, useState } from "react";
import {
  BsCheckCircleFill,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsCloudDownload,
  BsEye,
  BsPencilSquare,
  BsPeopleFill,
  BsPlusLg,
  BsSearch,
  BsThreeDotsVertical,
  BsTrash,
  BsXLg,
} from "react-icons/bs";

import {
  leaveAssignmentData,
  assignmentDepartmentOptions,
  assignmentLeaveTypeOptions,
  assignmentStatusOptions,
  financialYearOptions,
} from "./LeaveAssignmentData";

import "./LeaveAssignment.css";

const ITEMS_PER_PAGE = 6;

const emptyForm = {
  employeeId: "",
  employeeName: "",
  department: "",
  designation: "",
  financialYear: "2026-27",
  leaveType: "Casual Leave",
  allocated: "",
  used: "",
  pending: "",
  status: "Active",
};

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("en-IN");
};

const calculateRemaining = (allocated, used, pending) => {
  return (
    Number(allocated || 0) -
    Number(used || 0) -
    Number(pending || 0)
  );
};

const getUtilization = (used, allocated) => {
  if (!Number(allocated)) {
    return 0;
  }

  return Math.min(
    100,
    Math.round((Number(used || 0) / Number(allocated)) * 100)
  );
};

const LeaveAssignment = () => {
  const [assignments, setAssignments] = useState(
    leaveAssignmentData
  );

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("");
  const [financialYear, setFinancialYear] = useState("2026-27");

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [editingAssignment, setEditingAssignment] =
    useState(null);

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);

  const [form, setForm] = useState(emptyForm);

  const [openAction, setOpenAction] = useState(null);

  /* =========================================
     FLATTEN ASSIGNMENTS
  ========================================= */

  const flattenedAssignments = useMemo(() => {
    const result = [];

    assignments.forEach((employee) => {
      employee.assignments.forEach((item) => {
        result.push({
          ...item,
          employeeRecordId: employee.id,
          employeeId: employee.employeeId,
          employeeName: employee.employeeName,
          initials: employee.initials,
          department: employee.department,
          designation: employee.designation,
          financialYear: employee.financialYear,
          employeeStatus: employee.status,
        });
      });
    });

    return result;
  }, [assignments]);

  /* =========================================
     FILTER
  ========================================= */

  const filteredAssignments = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return flattenedAssignments.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.employeeName.toLowerCase().includes(keyword) ||
        item.employeeId.toLowerCase().includes(keyword) ||
        item.department.toLowerCase().includes(keyword) ||
        item.leaveType.toLowerCase().includes(keyword) ||
        item.code.toLowerCase().includes(keyword);

      const matchesDepartment =
        !department || item.department === department;

      const matchesLeaveType =
        !leaveType || item.leaveType === leaveType;

      const matchesStatus =
        !status || item.employeeStatus === status;

      const matchesYear =
        !financialYear ||
        item.financialYear === financialYear;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLeaveType &&
        matchesStatus &&
        matchesYear
      );
    });
  }, [
    flattenedAssignments,
    search,
    department,
    leaveType,
    status,
    financialYear,
  ]);

  /* =========================================
     STATISTICS
  ========================================= */

  const statistics = useMemo(() => {
    const employeeIds = new Set(
      filteredAssignments.map((item) => item.employeeId)
    );

    const activeEmployeeIds = new Set(
      filteredAssignments
        .filter((item) => item.employeeStatus === "Active")
        .map((item) => item.employeeId)
    );

    const totalAllocated = filteredAssignments.reduce(
      (total, item) => total + Number(item.allocated || 0),
      0
    );

    const totalUsed = filteredAssignments.reduce(
      (total, item) => total + Number(item.used || 0),
      0
    );

    const totalPending = filteredAssignments.reduce(
      (total, item) => total + Number(item.pending || 0),
      0
    );

    const totalRemaining = filteredAssignments.reduce(
      (total, item) =>
        total +
        calculateRemaining(
          item.allocated,
          item.used,
          item.pending
        ),
      0
    );

    return {
      employees: employeeIds.size,
      activeEmployees: activeEmployeeIds.size,
      allocated: totalAllocated,
      used: totalUsed,
      pending: totalPending,
      remaining: totalRemaining,
    };
  }, [filteredAssignments]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAssignments.length / ITEMS_PER_PAGE
    )
  );

  const paginatedAssignments = filteredAssignments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =========================================
     FILTER RESET
  ========================================= */

  const resetFilters = () => {
    setSearch("");
    setDepartment("");
    setLeaveType("");
    setStatus("");
    setFinancialYear("2026-27");
    setCurrentPage(1);
  };

  /* =========================================
     FORM HANDLERS
  ========================================= */

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingAssignment(null);

    setForm({
      ...emptyForm,
      financialYear: financialYear || "2026-27",
    });

    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingAssignment(item);

    setForm({
      employeeId: item.employeeId,
      employeeName: item.employeeName,
      department: item.department,
      designation: item.designation,
      financialYear: item.financialYear,
      leaveType: item.leaveType,
      allocated: item.allocated,
      used: item.used,
      pending: item.pending,
      status: item.employeeStatus,
    });

    setOpenAction(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAssignment(null);
    setForm(emptyForm);
  };

  /* =========================================
     SAVE ASSIGNMENT
  ========================================= */

  const handleSave = () => {
    if (
      !form.employeeId ||
      !form.employeeName ||
      !form.department ||
      !form.leaveType
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      form.allocated === "" ||
      Number(form.allocated) < 0
    ) {
      alert("Please enter a valid allocated leave balance.");
      return;
    }

    if (Number(form.used || 0) < 0) {
      alert("Used leave cannot be negative.");
      return;
    }

    if (Number(form.pending || 0) < 0) {
      alert("Pending leave cannot be negative.");
      return;
    }

    if (
      Number(form.used || 0) +
        Number(form.pending || 0) >
      Number(form.allocated || 0)
    ) {
      alert(
        "Used + Pending leave cannot be greater than allocated leave."
      );
      return;
    }

    if (editingAssignment) {
      setAssignments((previous) =>
        previous.map((employee) => {
          if (
            employee.id !==
            editingAssignment.employeeRecordId
          ) {
            return employee;
          }

          return {
            ...employee,
            financialYear: form.financialYear,
            status: form.status,
            assignments: employee.assignments.map(
              (assignment) => {
                if (
                  assignment.leaveType !==
                  editingAssignment.leaveType
                ) {
                  return assignment;
                }

                return {
                  ...assignment,
                  leaveType: form.leaveType,
                  code:
                    form.leaveType === "Casual Leave"
                      ? "CL"
                      : form.leaveType === "Sick Leave"
                      ? "SL"
                      : form.leaveType === "Earned Leave"
                      ? "EL"
                      : assignment.code,
                  allocated: Number(form.allocated || 0),
                  used: Number(form.used || 0),
                  pending: Number(form.pending || 0),
                };
              }
            ),
          };
        })
      );

      alert("Leave assignment updated successfully.");
    } else {
      const existingEmployee = assignments.find(
        (employee) =>
          employee.employeeId === form.employeeId
      );

      if (existingEmployee) {
        setAssignments((previous) =>
          previous.map((employee) => {
            if (
              employee.employeeId !== form.employeeId
            ) {
              return employee;
            }

            const alreadyExists =
              employee.assignments.some(
                (assignment) =>
                  assignment.leaveType === form.leaveType
              );

            if (alreadyExists) {
              alert(
                "This leave type is already assigned to the employee."
              );

              return employee;
            }

            return {
              ...employee,
              financialYear: form.financialYear,
              status: form.status,
              assignments: [
                ...employee.assignments,
                {
                  leaveType: form.leaveType,
                  code:
                    form.leaveType === "Casual Leave"
                      ? "CL"
                      : form.leaveType === "Sick Leave"
                      ? "SL"
                      : form.leaveType === "Earned Leave"
                      ? "EL"
                      : "LV",
                  allocated: Number(form.allocated || 0),
                  used: Number(form.used || 0),
                  pending: Number(form.pending || 0),
                },
              ],
            };
          })
        );

        alert("Leave assignment added successfully.");
      } else {
        const newEmployee = {
          id: Date.now(),
          employeeId: form.employeeId,
          employeeName: form.employeeName,
          initials: form.employeeName
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          department: form.department,
          designation:
            form.designation || "Employee",
          financialYear: form.financialYear,
          status: form.status,
          assignments: [
            {
              leaveType: form.leaveType,
              code:
                form.leaveType === "Casual Leave"
                  ? "CL"
                  : form.leaveType === "Sick Leave"
                  ? "SL"
                  : form.leaveType === "Earned Leave"
                  ? "EL"
                  : "LV",
              allocated: Number(form.allocated || 0),
              used: Number(form.used || 0),
              pending: Number(form.pending || 0),
            },
          ],
        };

        setAssignments((previous) => [
          ...previous,
          newEmployee,
        ]);

        alert("Leave assignment added successfully.");
      }
    }

    closeModal();
  };

  /* =========================================
     DETAILS
  ========================================= */

  const openDetails = (item) => {
    setSelectedAssignment(item);
    setOpenAction(null);
    setShowDetails(true);
  };

  /* =========================================
     DELETE
  ========================================= */

  const handleDelete = (item) => {
    setOpenAction(null);

    const confirmed = window.confirm(
      `Delete ${item.leaveType} assignment for ${item.employeeName}?`
    );

    if (!confirmed) {
      return;
    }

    setAssignments((previous) =>
      previous
        .map((employee) => {
          if (
            employee.id !== item.employeeRecordId
          ) {
            return employee;
          }

          return {
            ...employee,
            assignments: employee.assignments.filter(
              (assignment) =>
                assignment.leaveType !== item.leaveType
            ),
          };
        })
        .filter(
          (employee) => employee.assignments.length > 0
        )
    );

    alert("Leave assignment deleted successfully.");
  };

  /* =========================================
     STATUS
  ========================================= */

  const toggleEmployeeStatus = (item) => {
    setOpenAction(null);

    setAssignments((previous) =>
      previous.map((employee) => {
        if (employee.id !== item.employeeRecordId) {
          return employee;
        }

        return {
          ...employee,
          status:
            employee.status === "Active"
              ? "Inactive"
              : "Active",
        };
      })
    );
  };

  /* =========================================
     CSV EXPORT
  ========================================= */

  const exportCSV = () => {
    if (!filteredAssignments.length) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "Employee ID",
      "Employee Name",
      "Department",
      "Designation",
      "Financial Year",
      "Leave Type",
      "Code",
      "Allocated",
      "Used",
      "Pending",
      "Remaining",
      "Utilization %",
      "Status",
    ];

    const rows = filteredAssignments.map((item) => {
      const remaining = calculateRemaining(
        item.allocated,
        item.used,
        item.pending
      );

      const utilization = getUtilization(
        item.used,
        item.allocated
      );

      return [
        item.employeeId,
        item.employeeName,
        item.department,
        item.designation,
        item.financialYear,
        item.leaveType,
        item.code,
        item.allocated,
        item.used,
        item.pending,
        remaining,
        utilization,
        item.employeeStatus,
      ];
    });

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
    link.download = `leave-assignment-${financialYear}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================
     PAGE CHANGE
  ========================================= */

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <section className="leave-assignment">

      {/* HEADER */}
      <div className="leave-assignment-header">

        <div>
          <div className="leave-assignment-title-row">

            <div className="leave-assignment-title-icon">
              <BsPeopleFill />
            </div>

            <div>
              <h2>Employee Leave Assignment</h2>

              <p>
                Assign and manage employee leave balances
                for each financial year.
              </p>
            </div>

          </div>
        </div>

        <div className="leave-assignment-header-actions">

          <button
            className="leave-assignment-export-btn"
            onClick={exportCSV}
          >
            <BsCloudDownload />
            Export
          </button>

          <button
            className="leave-assignment-add-btn"
            onClick={openAddModal}
          >
            <BsPlusLg />
            Assign Leave
          </button>

        </div>

      </div>

      {/* STATISTICS */}
      <div className="leave-assignment-stats">

        <div className="leave-assignment-stat-card">

          <div className="leave-assignment-stat-icon employees">
            <BsPeopleFill />
          </div>

          <div>
            <span>Employees</span>
            <strong>{statistics.employees}</strong>
          </div>

        </div>

        <div className="leave-assignment-stat-card">

          <div className="leave-assignment-stat-icon active">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Active Employees</span>
            <strong>{statistics.activeEmployees}</strong>
          </div>

        </div>

        <div className="leave-assignment-stat-card">

          <div className="leave-assignment-stat-icon allocated">
            <BsPeopleFill />
          </div>

          <div>
            <span>Total Allocated</span>
            <strong>{formatNumber(statistics.allocated)}</strong>
          </div>

        </div>

        <div className="leave-assignment-stat-card">

          <div className="leave-assignment-stat-icon pending">
            <BsThreeDotsVertical />
          </div>

          <div>
            <span>Pending Leaves</span>
            <strong>{formatNumber(statistics.pending)}</strong>
          </div>

        </div>

        <div className="leave-assignment-stat-card">

          <div className="leave-assignment-stat-icon remaining">
            <BsCheckCircleFill />
          </div>

          <div>
            <span>Remaining</span>
            <strong>{formatNumber(statistics.remaining)}</strong>
          </div>

        </div>

      </div>

      {/* FILTERS */}
      <div className="leave-assignment-filter-card">

        <div className="leave-assignment-search">

          <BsSearch />

          <input
            type="text"
            placeholder="Search employee, ID, department or leave type..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />

        </div>

        <div className="leave-assignment-filter">

          <label>Department</label>

          <div className="leave-assignment-select">

            <select
              value={department}
              onChange={(event) => {
                setDepartment(event.target.value);
                setCurrentPage(1);
              }}
            >
              {assignmentDepartmentOptions.map(
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

            <BsChevronDown />

          </div>

        </div>

        <div className="leave-assignment-filter">

          <label>Leave Type</label>

          <div className="leave-assignment-select">

            <select
              value={leaveType}
              onChange={(event) => {
                setLeaveType(event.target.value);
                setCurrentPage(1);
              }}
            >
              {assignmentLeaveTypeOptions.map(
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

            <BsChevronDown />

          </div>

        </div>

        <div className="leave-assignment-filter">

          <label>Status</label>

          <div className="leave-assignment-select">

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setCurrentPage(1);
              }}
            >
              {assignmentStatusOptions.map(
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

            <BsChevronDown />

          </div>

        </div>

        <div className="leave-assignment-filter">

          <label>Financial Year</label>

          <div className="leave-assignment-select">

            <select
              value={financialYear}
              onChange={(event) => {
                setFinancialYear(event.target.value);
                setCurrentPage(1);
              }}
            >
              {financialYearOptions.map(
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

            <BsChevronDown />

          </div>

        </div>

        <button
          className="leave-assignment-reset-btn"
          onClick={resetFilters}
        >
          Reset
        </button>

      </div>

      {/* TABLE */}
      <div className="leave-assignment-table-card">

        <div className="leave-assignment-table-header">

          <div>
            <h3>Leave Balance Assignments</h3>

            <p>
              {filteredAssignments.length} assignment
              {filteredAssignments.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

        </div>

        <div className="leave-assignment-table-wrapper">

          <table className="leave-assignment-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Balance</th>
                <th>Allocated</th>
                <th>Used</th>
                <th>Pending</th>
                <th>Remaining</th>
                <th>Utilization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginatedAssignments.map((item) => {

                const remaining = calculateRemaining(
                  item.allocated,
                  item.used,
                  item.pending
                );

                const utilization = getUtilization(
                  item.used,
                  item.allocated
                );

                const lowBalance = remaining <= 2;

                return (
                  <tr key={`${item.employeeId}-${item.code}`}>

                    {/* EMPLOYEE */}
                    <td>

                      <div className="leave-assignment-employee">

                        <div className="leave-assignment-avatar">
                          {item.initials}
                        </div>

                        <div>

                          <strong>
                            {item.employeeName}
                          </strong>

                          <span>
                            {item.employeeId}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* DEPARTMENT */}
                    <td>

                      <div className="leave-assignment-department">

                        <strong>
                          {item.department}
                        </strong>

                        <span>
                          {item.designation}
                        </span>

                      </div>

                    </td>

                    {/* LEAVE BALANCE */}
                    <td>

                      <div className="leave-assignment-leave-type">

                        <span className="leave-assignment-code">
                          {item.code}
                        </span>

                        <div>
                          <strong>
                            {item.leaveType}
                          </strong>

                          <span>
                            FY {item.financialYear}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* ALLOCATED */}
                    <td>
                      <strong className="leave-number">
                        {formatNumber(item.allocated)}
                      </strong>
                    </td>

                    {/* USED */}
                    <td>
                      <strong className="leave-used">
                        {formatNumber(item.used)}
                      </strong>
                    </td>

                    {/* PENDING */}
                    <td>
                      <strong className="leave-pending">
                        {formatNumber(item.pending)}
                      </strong>
                    </td>

                    {/* REMAINING */}
                    <td>

                      <strong
                        className={
                          lowBalance
                            ? "leave-remaining low"
                            : "leave-remaining"
                        }
                      >
                        {formatNumber(remaining)}
                      </strong>

                    </td>

                    {/* UTILIZATION */}
                    <td>

                      <div className="leave-utilization">

                        <div className="leave-utilization-top">

                          <span>
                            {utilization}%
                          </span>

                        </div>

                        <div className="leave-progress">
                          <div
                            className="leave-progress-bar"
                            style={{
                              width: `${utilization}%`,
                            }}
                          />
                        </div>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td>

                      <span
                        className={`leave-assignment-status ${
                          item.employeeStatus ===
                          "Active"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        <span />
                        {item.employeeStatus}
                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className="leave-assignment-actions">

                        <button
                          className="leave-icon-btn"
                          title="View Details"
                          onClick={() =>
                            openDetails(item)
                          }
                        >
                          <BsEye />
                        </button>

                        <button
                          className="leave-icon-btn"
                          title="Edit"
                          onClick={() =>
                            openEditModal(item)
                          }
                        >
                          <BsPencilSquare />
                        </button>

                        <div className="leave-action-wrapper">

                          <button
                            className="leave-icon-btn"
                            title="More"
                            onClick={() =>
                              setOpenAction(
                                openAction ===
                                  `${item.employeeId}-${item.code}`
                                  ? null
                                  : `${item.employeeId}-${item.code}`
                              )
                            }
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {openAction ===
                            `${item.employeeId}-${item.code}` && (
                            <div className="leave-action-menu">

                              <button
                                onClick={() =>
                                  openDetails(item)
                                }
                              >
                                <BsEye />
                                View Details
                              </button>

                              <button
                                onClick={() =>
                                  openEditModal(item)
                                }
                              >
                                <BsPencilSquare />
                                Edit Assignment
                              </button>

                              <button
                                onClick={() =>
                                  toggleEmployeeStatus(
                                    item
                                  )
                                }
                              >
                                <BsCheckCircleFill />
                                {item.employeeStatus ===
                                "Active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>

                              <button
                                className="danger"
                                onClick={() =>
                                  handleDelete(item)
                                }
                              >
                                <BsTrash />
                                Delete
                              </button>

                            </div>
                          )}

                        </div>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

          {/* EMPTY */}
          {!paginatedAssignments.length && (
            <div className="leave-assignment-empty">

              <div className="leave-assignment-empty-icon">
                <BsPeopleFill />
              </div>

              <h3>No leave assignments found</h3>

              <p>
                Try changing your search or filter
                criteria.
              </p>

              <button
                onClick={resetFilters}
              >
                Reset Filters
              </button>

            </div>
          )}

        </div>

        {/* PAGINATION */}
        {filteredAssignments.length > 0 && (
          <div className="leave-assignment-pagination">

            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) *
                  ITEMS_PER_PAGE +
                  1}
              </strong>{" "}
              -{" "}
              <strong>
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredAssignments.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredAssignments.length}
              </strong>
            </span>

            <div className="leave-pagination-buttons">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  changePage(currentPage - 1)
                }
              >
                <BsChevronLeft />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )
                .map((page) => (
                  <button
                    key={page}
                    className={
                      page === currentPage
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
                disabled={currentPage === totalPages}
                onClick={() =>
                  changePage(currentPage + 1)
                }
              >
                <BsChevronRight />
              </button>

            </div>

          </div>
        )}

      </div>

      {/* =========================================
          ADD / EDIT MODAL
      ========================================= */}

      {showModal && (
        <div
          className="leave-assignment-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="leave-assignment-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="leave-assignment-modal-header">

              <div>
                <h3>
                  {editingAssignment
                    ? "Edit Leave Assignment"
                    : "Assign Leave"}
                </h3>

                <p>
                  Configure leave balance for an
                  employee.
                </p>
              </div>

              <button
                className="leave-modal-close"
                onClick={closeModal}
              >
                <BsXLg />
              </button>

            </div>

            <div className="leave-assignment-modal-body">

              {/* EMPLOYEE INFORMATION */}
              <div className="leave-modal-section">

                <div className="leave-modal-section-title">
                  Employee Information
                </div>

                <div className="leave-form-grid">

                  <div className="leave-form-group">

                    <label>
                      Employee ID
                      <span>*</span>
                    </label>

                    <input
                      name="employeeId"
                      value={form.employeeId}
                      onChange={handleFormChange}
                      placeholder="e.g. EMP-1024"
                      disabled={Boolean(
                        editingAssignment
                      )}
                    />

                  </div>

                  <div className="leave-form-group">

                    <label>
                      Employee Name
                      <span>*</span>
                    </label>

                    <input
                      name="employeeName"
                      value={form.employeeName}
                      onChange={handleFormChange}
                      placeholder="Enter employee name"
                      disabled={Boolean(
                        editingAssignment
                      )}
                    />

                  </div>

                  <div className="leave-form-group">

                    <label>Department</label>

                    <input
                      name="department"
                      value={form.department}
                      onChange={handleFormChange}
                      placeholder="e.g. Development"
                      disabled={Boolean(
                        editingAssignment
                      )}
                    />

                  </div>

                  <div className="leave-form-group">

                    <label>Designation</label>

                    <input
                      name="designation"
                      value={form.designation}
                      onChange={handleFormChange}
                      placeholder="e.g. Software Engineer"
                      disabled={Boolean(
                        editingAssignment
                      )}
                    />

                  </div>

                </div>

              </div>

              {/* ASSIGNMENT */}
              <div className="leave-modal-section">

                <div className="leave-modal-section-title">
                  Leave Assignment
                </div>

                <div className="leave-form-grid">

                  <div className="leave-form-group">

                    <label>
                      Financial Year
                      <span>*</span>
                    </label>

                    <div className="leave-form-select">

                      <select
                        name="financialYear"
                        value={form.financialYear}
                        onChange={handleFormChange}
                      >
                        {financialYearOptions
                          .filter(
                            (option) =>
                              option.value
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

                      <BsChevronDown />

                    </div>

                  </div>

                  <div className="leave-form-group">

                    <label>
                      Leave Type
                      <span>*</span>
                    </label>

                    <div className="leave-form-select">

                      <select
                        name="leaveType"
                        value={form.leaveType}
                        onChange={handleFormChange}
                      >
                        {assignmentLeaveTypeOptions
                          .filter(
                            (option) =>
                              option.value
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

                      <BsChevronDown />

                    </div>

                  </div>

                  <div className="leave-form-group">

                    <label>
                      Allocated
                      <span>*</span>
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="allocated"
                      value={form.allocated}
                      onChange={handleFormChange}
                      placeholder="0"
                    />

                  </div>

                  <div className="leave-form-group">

                    <label>Used</label>

                    <input
                      type="number"
                      min="0"
                      name="used"
                      value={form.used}
                      onChange={handleFormChange}
                      placeholder="0"
                    />

                  </div>

                  <div className="leave-form-group">

                    <label>Pending</label>

                    <input
                      type="number"
                      min="0"
                      name="pending"
                      value={form.pending}
                      onChange={handleFormChange}
                      placeholder="0"
                    />

                  </div>

                  <div className="leave-form-group">

                    <label>Status</label>

                    <div className="leave-form-select">

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleFormChange}
                      >
                        <option value="Active">
                          Active
                        </option>

                        <option value="Inactive">
                          Inactive
                        </option>
                      </select>

                      <BsChevronDown />

                    </div>

                  </div>

                </div>

              </div>

              {/* PREVIEW */}
              <div className="leave-assignment-preview">

                <div className="leave-preview-title">
                  Balance Preview
                </div>

                <div className="leave-preview-grid">

                  <div>
                    <span>Allocated</span>
                    <strong>
                      {formatNumber(
                        form.allocated
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>Used</span>
                    <strong>
                      {formatNumber(form.used)}
                    </strong>
                  </div>

                  <div>
                    <span>Pending</span>
                    <strong>
                      {formatNumber(
                        form.pending
                      )}
                    </strong>
                  </div>

                  <div className="remaining">
                    <span>Remaining</span>
                    <strong>
                      {formatNumber(
                        calculateRemaining(
                          form.allocated,
                          form.used,
                          form.pending
                        )
                      )}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            <div className="leave-assignment-modal-footer">

              <button
                className="leave-modal-cancel"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="leave-modal-save"
                onClick={handleSave}
              >
                <BsCheckCircleFill />

                {editingAssignment
                  ? "Update Assignment"
                  : "Save Assignment"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =========================================
          DETAILS MODAL
      ========================================= */}

      {showDetails && selectedAssignment && (
        <div
          className="leave-assignment-modal-overlay"
          onClick={() => setShowDetails(false)}
        >

          <div
            className="leave-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="leave-assignment-modal-header">

              <div>
                <h3>Leave Assignment Details</h3>

                <p>
                  Employee leave balance information.
                </p>
              </div>

              <button
                className="leave-modal-close"
                onClick={() =>
                  setShowDetails(false)
                }
              >
                <BsXLg />
              </button>

            </div>

            <div className="leave-details-body">

              <div className="leave-details-profile">

                <div className="leave-details-avatar">
                  {selectedAssignment.initials}
                </div>

                <div>
                  <h3>
                    {selectedAssignment.employeeName}
                  </h3>

                  <p>
                    {selectedAssignment.employeeId}
                  </p>

                  <span>
                    {selectedAssignment.department}
                  </span>
                </div>

              </div>

              <div className="leave-details-grid">

                <div>
                  <span>Designation</span>
                  <strong>
                    {selectedAssignment.designation}
                  </strong>
                </div>

                <div>
                  <span>Financial Year</span>
                  <strong>
                    FY {selectedAssignment.financialYear}
                  </strong>
                </div>

                <div>
                  <span>Leave Type</span>
                  <strong>
                    {selectedAssignment.leaveType}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>
                    {selectedAssignment.employeeStatus}
                  </strong>
                </div>

              </div>

              <div className="leave-details-balance">

                <div>
                  <span>Allocated</span>
                  <strong>
                    {formatNumber(
                      selectedAssignment.allocated
                    )}
                  </strong>
                </div>

                <div>
                  <span>Used</span>
                  <strong>
                    {formatNumber(
                      selectedAssignment.used
                    )}
                  </strong>
                </div>

                <div>
                  <span>Pending</span>
                  <strong>
                    {formatNumber(
                      selectedAssignment.pending
                    )}
                  </strong>
                </div>

                <div className="remaining">
                  <span>Remaining</span>
                  <strong>
                    {formatNumber(
                      calculateRemaining(
                        selectedAssignment.allocated,
                        selectedAssignment.used,
                        selectedAssignment.pending
                      )
                    )}
                  </strong>
                </div>

              </div>

              <div className="leave-details-utilization">

                <div>
                  <span>Leave Utilization</span>

                  <strong>
                    {getUtilization(
                      selectedAssignment.used,
                      selectedAssignment.allocated
                    )}
                    %
                  </strong>
                </div>

                <div className="leave-details-progress">
                  <div
                    style={{
                      width: `${getUtilization(
                        selectedAssignment.used,
                        selectedAssignment.allocated
                      )}%`,
                    }}
                  />
                </div>

              </div>

            </div>

            <div className="leave-assignment-modal-footer">

              <button
                className="leave-modal-cancel"
                onClick={() =>
                  setShowDetails(false)
                }
              >
                Close
              </button>

              <button
                className="leave-modal-save"
                onClick={() => {
                  setShowDetails(false);
                  openEditModal(selectedAssignment);
                }}
              >
                <BsPencilSquare />
                Edit Assignment
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default LeaveAssignment;