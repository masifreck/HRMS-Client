import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BsThreeDotsVertical,
  BsEye,
  BsCheckLg,
  BsXLg,
  BsCalendar3,
} from "react-icons/bs";

import LeaveToolbar from "./components/LeaveToolbar";
import LeaveSummary from "./components/LeaveSummary";
import leaveData from "./components/LeaveData";
import LeaveCalendar from "./components/LeaveCalendar";
import "./Leave.css";

const Leave = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");
  const [leaveType, setLeaveType] =
    useState("All Leave Types");
  const [status, setStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 7;

  const filteredLeaves = useMemo(() => {
    return leaveData.filter((item) => {

      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        item.employeeName
          .toLowerCase()
          .includes(searchText) ||
        item.employeeId
          .toLowerCase()
          .includes(searchText);

      const matchesDepartment =
        department === "All Departments" ||
        item.department === department;

      const matchesLeaveType =
        leaveType === "All Leave Types" ||
        item.leaveType === leaveType;

      const matchesStatus =
        status === "All Status" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLeaveType &&
        matchesStatus
      );
    });
  }, [
    search,
    department,
    leaveType,
    status,
  ]);

  const totalRequests = leaveData.length;

  const pending = leaveData.filter(
    (item) => item.status === "Pending"
  ).length;

  const approved = leaveData.filter(
    (item) => item.status === "Approved"
  ).length;

  const rejected = leaveData.filter(
    (item) => item.status === "Rejected"
  ).length;

  const totalDays = leaveData.reduce(
    (total, item) => total + item.days,
    0
  );

  const totalPages = Math.ceil(
    filteredLeaves.length / rowsPerPage
  );

  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDepartment = (value) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  const handleLeaveType = (value) => {
    setLeaveType(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const getStatusClass = (leaveStatus) => {
    switch (leaveStatus) {
      case "Approved":
        return "leave-status approved";

      case "Pending":
        return "leave-status pending";

      case "Rejected":
        return "leave-status rejected";

      default:
        return "leave-status";
    }
  };

  return (
    <div className="leave-page">

      {/* ================= HEADER ================= */}

      <div className="leave-page-header">

        <div>

          <div className="leave-title-row">

            <div className="leave-page-title-icon">
              <BsCalendar3 />
            </div>

            <div>
              <h1>Leave Management</h1>

              <p>
                Manage employee leave requests and approvals
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <LeaveSummary
        totalRequests={totalRequests}
        pending={pending}
        approved={approved}
        rejected={rejected}
        totalDays={totalDays}
      />

      {/* ================= TOOLBAR ================= */}

      <LeaveToolbar
  search={search}
  setSearch={setSearch}
  department={department}
  setDepartment={setDepartment}
  leaveType={leaveType}
  setLeaveType={setLeaveType}
  status={status}
  setStatus={setStatus}
  onAddLeave={() => navigate("/leave/apply")}
/>

      {/* ================= TABLE ================= */}

      <section className="leave-table-card">

        <div className="leave-table-header">

          <div>
            <h3>Leave Requests</h3>

            <p>
              Review and manage employee leave applications
            </p>
          </div>

          <span className="leave-record-count">
            {filteredLeaves.length} Requests
          </span>

        </div>

        <div className="leave-table-wrapper">

          <table className="leave-table">

            <thead>

              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th>Days</th>
                <th>Applied On</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {paginatedLeaves.length > 0 ? (

                paginatedLeaves.map((item) => (

                  <tr key={item.id}>

                    {/* Employee */}

                    <td>

                      <div className="leave-employee">

                        <div className="leave-avatar">
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

                    {/* Leave Type */}

                    <td>
                      <span className="leave-type">
                        {item.leaveType}
                      </span>
                    </td>

                    {/* Duration */}

                    <td>

                      <div className="leave-duration">

                        <strong>
                          {item.fromDate}
                        </strong>

                        {item.fromDate !== item.toDate && (
                          <>
                            <span>to</span>

                            <strong>
                              {item.toDate}
                            </strong>
                          </>
                        )}

                      </div>

                    </td>

                    {/* Days */}

                    <td>
                      <span className="leave-days">
                        {item.days}
                        {item.days === 1
                          ? " day"
                          : " days"}
                      </span>
                    </td>

                    {/* Applied */}

                    <td>
                      <span className="leave-applied-date">
                        {item.appliedOn}
                      </span>
                    </td>

                    {/* Reason */}

                    <td>

                      <span
                        className="leave-reason"
                        title={item.reason}
                      >
                        {item.reason}
                      </span>

                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={getStatusClass(
                          item.status
                        )}
                      >
                        <span className="leave-status-dot" />
                        {item.status}
                      </span>

                    </td>

                    {/* Action */}

                    <td>

                      <div className="leave-actions">

                        <button
                          type="button"
                          title="View"
                          onClick={() =>
                            navigate(
                              `/leave/${item.id}`
                            )
                          }
                        >
                          <BsEye />
                        </button>

                        {item.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              title="Approve"
                              className="approve-action"
                              onClick={() =>
                                alert(
                                  `Approve leave for ${item.employeeName}`
                                )
                              }
                            >
                              <BsCheckLg />
                            </button>

                            <button
                              type="button"
                              title="Reject"
                              className="reject-action"
                              onClick={() =>
                                alert(
                                  `Reject leave for ${item.employeeName}`
                                )
                              }
                            >
                              <BsXLg />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          title="More"
                        >
                          <BsThreeDotsVertical />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="leave-empty-cell"
                  >

                    <div className="leave-empty-state">

                      <BsCalendar3 />

                      <h3>No leave requests found</h3>

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

        {/* ================= PAGINATION ================= */}

        {filteredLeaves.length > 0 && (
          <div className="leave-pagination">

            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  currentPage * rowsPerPage,
                  filteredLeaves.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredLeaves.length}
              </strong>
            </span>

            <div className="leave-pagination-buttons">

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
              >
                Previous
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
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
              >
                Next
              </button>

            </div>

          </div>
        )}

      </section>
<LeaveCalendar />
    </div>
  );
};

export default Leave;