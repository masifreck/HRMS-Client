import React, { useMemo, useState } from "react";

import {
  BsCalendarCheckFill,
  BsPersonCheckFill,
  BsPersonXFill,
  BsClockFill,
  BsPersonDashFill,
  BsThreeDotsVertical,
  BsEye,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

import AttendanceToolbar from "./components/AttendanceToolbar";
import { attendanceData } from "./components/AttendanceData";
import AttendanceCalendar from "./components/AttendanceCalendar";
import "./Attendance.css";

function Attendance() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");
  const [status, setStatus] =
    useState("All Status");

  const [date, setDate] =
    useState("2026-09-15");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [openMenu, setOpenMenu] =
    useState(null);

  const employeesPerPage = 6;

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((employee) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        employee.name
          .toLowerCase()
          .includes(searchValue) ||
        employee.employeeId
          .toLowerCase()
          .includes(searchValue) ||
        employee.department
          .toLowerCase()
          .includes(searchValue);

      const matchesDepartment =
        department === "All Departments" ||
        employee.department === department;

      const matchesStatus =
        status === "All Status" ||
        employee.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [search, department, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAttendance.length /
        employeesPerPage
    )
  );

  const startIndex =
    (currentPage - 1) *
    employeesPerPage;

  const currentEmployees =
    filteredAttendance.slice(
      startIndex,
      startIndex + employeesPerPage
    );

  const presentCount = attendanceData.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendanceData.filter(
    (item) => item.status === "Absent"
  ).length;

  const lateCount = attendanceData.filter(
    (item) => item.status === "Late"
  ).length;

  const leaveCount = attendanceData.filter(
    (item) => item.status === "On Leave"
  ).length;

  const attendancePercentage =
    Math.round(
      ((presentCount + lateCount) /
        attendanceData.length) *
        100
    );

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value) => {
    setDate(value);
    setCurrentPage(1);
  };

  const getStatusIcon = (value) => {
    if (value === "Present") {
      return <BsPersonCheckFill />;
    }

    if (value === "Absent") {
      return <BsPersonXFill />;
    }

    if (value === "Late") {
      return <BsClockFill />;
    }

    return <BsPersonDashFill />;
  };

  const changePage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);
    setOpenMenu(null);
  };

  return (
    <div className="attendance-page">

      {/* Header */}

      <div className="attendance-page-header">

        <div className="attendance-page-title">

          <div className="attendance-page-icon">
            <BsCalendarCheckFill />
          </div>

          <div>
            <h1>Attendance</h1>

            <p>
              Monitor and manage employee attendance,
              working hours and daily status.
            </p>
          </div>

        </div>

        <div className="attendance-date-display">
          <span>Attendance Date</span>

          <strong>
            15 September 2026
          </strong>
        </div>

      </div>

      {/* Statistics */}

      <div className="attendance-stat-grid">

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon total">
            <BsCalendarCheckFill />
          </div>

          <div className="attendance-stat-info">
            <span>Total Employees</span>
            <strong>
              {attendanceData.length}
            </strong>
            <small>
              Registered employees
            </small>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon present">
            <BsPersonCheckFill />
          </div>

          <div className="attendance-stat-info">
            <span>Present</span>
            <strong>
              {presentCount}
            </strong>
            <small>
              Employees present
            </small>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon absent">
            <BsPersonXFill />
          </div>

          <div className="attendance-stat-info">
            <span>Absent</span>
            <strong>
              {absentCount}
            </strong>
            <small>
              Not marked present
            </small>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon late">
            <BsClockFill />
          </div>

          <div className="attendance-stat-info">
            <span>Late Arrivals</span>
            <strong>
              {lateCount}
            </strong>
            <small>
              Arrived after shift time
            </small>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon leave">
            <BsPersonDashFill />
          </div>

          <div className="attendance-stat-info">
            <span>On Leave</span>
            <strong>
              {leaveCount}
            </strong>
            <small>
              Approved leave
            </small>
          </div>

        </div>

        <div className="attendance-stat-card">

          <div className="attendance-stat-icon percentage">
            <BsPersonCheckFill />
          </div>

          <div className="attendance-stat-info">
            <span>Attendance Rate</span>
            <strong>
              {attendancePercentage}%
            </strong>
            <small>
              Today's attendance
            </small>
          </div>

        </div>

      </div>

      {/* Toolbar */}

      <AttendanceToolbar
        search={search}
        setSearch={handleSearchChange}
        department={department}
        setDepartment={handleDepartmentChange}
        status={status}
        setStatus={handleStatusChange}
        date={date}
        setDate={handleDateChange}
      />

      {/* Attendance Table */}

      <div className="attendance-list-card">

        <div className="attendance-list-header">

          <div>
            <h2>Daily Attendance</h2>

            <p>
              Attendance records for{" "}
              <strong>
                15 September 2026
              </strong>
            </p>
          </div>

          <div className="attendance-record-count">
            {filteredAttendance.length} Records
          </div>

        </div>

        <div className="attendance-table-container">

          <table className="attendance-table">

            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Work Hours</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {currentEmployees.map(
                (employee) => (
                  <tr key={employee.id}>

                    <td>
                      <div className="attendance-person">

                        <div className="attendance-avatar">
                          {employee.initials}
                        </div>

                        <div>
                          <h4>
                            {employee.name}
                          </h4>

                          <span>
                            {employee.employeeId}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="attendance-department">
                        {employee.department}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          employee.checkIn === "-"
                            ? "attendance-time empty"
                            : "attendance-time"
                        }
                      >
                        {employee.checkIn}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          employee.checkOut === "-"
                            ? "attendance-time empty"
                            : "attendance-time"
                        }
                      >
                        {employee.checkOut}
                      </span>
                    </td>

                    <td>
                      <span className="attendance-hours">
                        {employee.workHours}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`attendance-status ${
                          employee.status
                            .toLowerCase()
                            .replace(" ", "-")
                        }`}
                      >
                        {getStatusIcon(
                          employee.status
                        )}

                        {employee.status}
                      </span>
                    </td>

                    <td>

                      <div className="attendance-action-wrapper">

                        <button
                          type="button"
                          className="attendance-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                employee.id
                                ? null
                                : employee.id
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {openMenu === employee.id && (
                          <div className="attendance-action-menu">

                        <button
  type="button"
  onClick={() =>
    navigate(`/attendance/employee/${item.id}`)
  }
>
  View Details
</button>

                          </div>
                        )}

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {currentEmployees.length === 0 && (
            <div className="attendance-empty-state">

              <div>
                <BsCalendarCheckFill />
              </div>

              <h3>
                No attendance records found
              </h3>

              <p>
                Try changing your search or
                filter criteria.
              </p>

            </div>
          )}

        </div>

        {filteredAttendance.length > 0 && (
          <div className="attendance-pagination">

            <span>
              Showing{" "}
              <strong>
                {startIndex + 1}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  startIndex +
                    employeesPerPage,
                  filteredAttendance.length
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredAttendance.length}
              </strong>
            </span>

            <div className="attendance-pagination-buttons">

              <button
                type="button"
                disabled={currentPage === 1}
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
                  type="button"
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
                type="button"
                disabled={
                  currentPage ===
                  totalPages
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
<div className="attendance-calendar-section">
  <AttendanceCalendar />
</div>
    </div>
  );
}

export default Attendance;