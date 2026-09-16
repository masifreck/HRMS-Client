import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  BsArrowLeft,
  BsPersonCircle,
  BsCalendarCheckFill,
  BsCalendarXFill,
  BsClockFill,
  BsPersonDashFill,
  BsHourglassSplit,
  BsThreeDotsVertical,
  BsDownload,
} from "react-icons/bs";

import { attendanceData } from "./AttendanceData";
import "./AttendanceEmployeeDetails.css";

const AttendanceEmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState("September 2026");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;

  /*
   * In the future this employee will come from API.
   * For now we locate the employee from mock attendance data.
   */
  const employee = useMemo(() => {
    return attendanceData.find(
      (item) => String(item.id) === String(id)
    );
  }, [id]);

  /*
   * Mock monthly attendance history.
   * API can replace this array later.
   */
  const attendanceHistory = useMemo(() => {
    return [
      {
        date: "01 Sep 2026",
        day: "Tuesday",
        checkIn: "09:02 AM",
        checkOut: "06:04 PM",
        workHours: "8h 02m",
        overtime: "0h 02m",
        status: "Present",
      },
      {
        date: "02 Sep 2026",
        day: "Wednesday",
        checkIn: "08:57 AM",
        checkOut: "06:11 PM",
        workHours: "8h 14m",
        overtime: "0h 14m",
        status: "Present",
      },
      {
        date: "03 Sep 2026",
        day: "Thursday",
        checkIn: "09:18 AM",
        checkOut: "06:03 PM",
        workHours: "7h 45m",
        overtime: "0h 00m",
        status: "Late",
      },
      {
        date: "04 Sep 2026",
        day: "Friday",
        checkIn: "09:01 AM",
        checkOut: "06:00 PM",
        workHours: "7h 59m",
        overtime: "0h 00m",
        status: "Present",
      },
      {
        date: "05 Sep 2026",
        day: "Saturday",
        checkIn: "--",
        checkOut: "--",
        workHours: "--",
        overtime: "--",
        status: "Weekend",
      },
      {
        date: "07 Sep 2026",
        day: "Monday",
        checkIn: "08:54 AM",
        checkOut: "06:05 PM",
        workHours: "8h 11m",
        overtime: "0h 11m",
        status: "Present",
      },
      {
        date: "08 Sep 2026",
        day: "Tuesday",
        checkIn: "09:07 AM",
        checkOut: "06:02 PM",
        workHours: "7h 55m",
        overtime: "0h 00m",
        status: "Present",
      },
      {
        date: "09 Sep 2026",
        day: "Wednesday",
        checkIn: "09:26 AM",
        checkOut: "06:01 PM",
        workHours: "7h 35m",
        overtime: "0h 00m",
        status: "Late",
      },
      {
        date: "10 Sep 2026",
        day: "Thursday",
        checkIn: "--",
        checkOut: "--",
        workHours: "0h 00m",
        overtime: "0h 00m",
        status: "Absent",
      },
      {
        date: "11 Sep 2026",
        day: "Friday",
        checkIn: "08:59 AM",
        checkOut: "06:08 PM",
        workHours: "8h 09m",
        overtime: "0h 09m",
        status: "Present",
      },
      {
        date: "12 Sep 2026",
        day: "Saturday",
        checkIn: "--",
        checkOut: "--",
        workHours: "--",
        overtime: "--",
        status: "Weekend",
      },
      {
        date: "14 Sep 2026",
        day: "Monday",
        checkIn: "09:03 AM",
        checkOut: "06:00 PM",
        workHours: "7h 57m",
        overtime: "0h 00m",
        status: "Present",
      },
      {
        date: "15 Sep 2026",
        day: "Tuesday",
        checkIn: "08:55 AM",
        checkOut: "06:10 PM",
        workHours: "8h 15m",
        overtime: "0h 15m",
        status: "Present",
      },
    ];
  }, []);

  const stats = {
    workingDays: 22,
    present: 18,
    absent: 1,
    late: 2,
    leave: 1,
    totalHours: "143h 28m",
    overtime: "2h 31m",
    attendanceRate: "81.8%",
  };

  const totalPages = Math.ceil(
    attendanceHistory.length / rowsPerPage
  );

  const paginatedData = attendanceHistory.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "attendance-detail-status present";

      case "Absent":
        return "attendance-detail-status absent";

      case "Late":
        return "attendance-detail-status late";

      case "Leave":
        return "attendance-detail-status leave";

      case "Weekend":
        return "attendance-detail-status weekend";

      default:
        return "attendance-detail-status";
    }
  };

  if (!employee) {
    return (
      <div className="attendance-detail-page">
        <div className="attendance-detail-not-found">
          <BsPersonCircle />

          <h2>Employee Not Found</h2>

          <p>
            The employee attendance record you're looking for
            does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/attendance")}
          >
            <BsArrowLeft />
            Back to Attendance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance-detail-page">

      {/* ================= HEADER ================= */}

      <div className="attendance-detail-header">

        <div className="attendance-detail-header-left">

          <button
            className="attendance-back-button"
            onClick={() => navigate("/attendance")}
            type="button"
          >
            <BsArrowLeft />
          </button>

          <div>
            <h1>Attendance Details</h1>

            <p>
              View attendance history and working hours
            </p>
          </div>

        </div>

        <div className="attendance-detail-header-actions">

          <button
            type="button"
            className="attendance-export-button"
          >
            <BsDownload />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="attendance-more-button"
          >
            <BsThreeDotsVertical />
          </button>

        </div>

      </div>

      {/* ================= EMPLOYEE PROFILE ================= */}

      <section className="attendance-employee-profile">

        <div className="attendance-profile-main">

          <div className="attendance-profile-avatar">
            {employee.initials || "EM"}
          </div>

          <div className="attendance-profile-info">

            <h2>{employee.name}</h2>

            <p>{employee.employeeId}</p>

            <div className="attendance-profile-meta">

              <span>
                {employee.department}
              </span>

              <span className="meta-dot">•</span>

              <span>
                Software Engineer
              </span>

              <span className="meta-dot">•</span>

              <span className="employee-active">
                Active
              </span>

            </div>

          </div>

        </div>

        <div className="attendance-profile-date">

          <span>Viewing</span>

          <strong>{selectedMonth}</strong>

        </div>

      </section>

      {/* ================= MONTH SELECTOR ================= */}

      <section className="attendance-month-bar">

        <div>
          <h3>Monthly Attendance</h3>

          <p>
            Attendance summary for {selectedMonth}
          </p>
        </div>

        <select
          value={selectedMonth}
          onChange={(event) => {
            setSelectedMonth(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option>September 2026</option>
          <option>August 2026</option>
          <option>July 2026</option>
          <option>June 2026</option>
        </select>

      </section>

      {/* ================= STAT CARDS ================= */}

      <section className="attendance-detail-stats">

        <div className="attendance-detail-stat-card">

          <div className="detail-stat-icon present">
            <BsCalendarCheckFill />
          </div>

          <div>
            <span>Present Days</span>
            <strong>{stats.present}</strong>
            <small>of {stats.workingDays} working days</small>
          </div>

        </div>

        <div className="attendance-detail-stat-card">

          <div className="detail-stat-icon absent">
            <BsCalendarXFill />
          </div>

          <div>
            <span>Absent Days</span>
            <strong>{stats.absent}</strong>
            <small>Needs attention</small>
          </div>

        </div>

        <div className="attendance-detail-stat-card">

          <div className="detail-stat-icon late">
            <BsClockFill />
          </div>

          <div>
            <span>Late Arrivals</span>
            <strong>{stats.late}</strong>
            <small>Late check-ins</small>
          </div>

        </div>

        <div className="attendance-detail-stat-card">

          <div className="detail-stat-icon leave">
            <BsPersonDashFill />
          </div>

          <div>
            <span>Leave Days</span>
            <strong>{stats.leave}</strong>
            <small>Approved leave</small>
          </div>

        </div>

        <div className="attendance-detail-stat-card">

          <div className="detail-stat-icon hours">
            <BsHourglassSplit />
          </div>

          <div>
            <span>Total Hours</span>
            <strong>{stats.totalHours}</strong>
            <small>Worked this month</small>
          </div>

        </div>

        <div className="attendance-detail-stat-card">

          <div className="detail-stat-icon overtime">
            <BsClockFill />
          </div>

          <div>
            <span>Overtime</span>
            <strong>{stats.overtime}</strong>
            <small>Extra working time</small>
          </div>

        </div>

      </section>

      {/* ================= ATTENDANCE RATE ================= */}

      <section className="attendance-performance-card">

        <div className="performance-info">

          <div className="performance-title">

            <div className="performance-icon">
              <BsCalendarCheckFill />
            </div>

            <div>
              <h3>Attendance Rate</h3>
              <p>
                Overall attendance performance
              </p>
            </div>

          </div>

          <strong>{stats.attendanceRate}</strong>

        </div>

        <div className="performance-progress">

          <div
            className="performance-progress-fill"
            style={{ width: stats.attendanceRate }}
          />

        </div>

        <div className="performance-footer">

          <span>
            Target: <strong>95%</strong>
          </span>

          <span>
            Current: <strong>{stats.attendanceRate}</strong>
          </span>

        </div>

      </section>

      {/* ================= HISTORY ================= */}

      <section className="attendance-history-card">

        <div className="attendance-history-header">

          <div>
            <h3>Attendance History</h3>

            <p>
              Daily check-in and check-out records
            </p>
          </div>

          <span className="history-count">
            {attendanceHistory.length} Records
          </span>

        </div>

        <div className="attendance-history-table-wrapper">

          <table className="attendance-history-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Overtime</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {paginatedData.map((item, index) => (

                <tr key={`${item.date}-${index}`}>

                  <td>
                    <strong>{item.date}</strong>
                  </td>

                  <td>
                    <span className="attendance-day">
                      {item.day}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        item.checkIn === "--"
                          ? "time-empty"
                          : "attendance-time"
                      }
                    >
                      {item.checkIn}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        item.checkOut === "--"
                          ? "time-empty"
                          : "attendance-time"
                      }
                    >
                      {item.checkOut}
                    </span>
                  </td>

                  <td>
                    <strong className="working-hours">
                      {item.workHours}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={
                        item.overtime !== "0h 00m" &&
                        item.overtime !== "--"
                          ? "overtime-value"
                          : "time-empty"
                      }
                    >
                      {item.overtime}
                    </span>
                  </td>

                  <td>
                    <span className={getStatusClass(item.status)}>
                      <span className="status-dot" />
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="history-action"
                      type="button"
                      title="View details"
                    >
                      <BsThreeDotsVertical />
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (
          <div className="attendance-history-pagination">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
            >
              Previous
            </button>

            <div className="attendance-page-numbers">

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
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>

              ))}

            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
            >
              Next
            </button>

          </div>
        )}

      </section>

    </div>
  );
};

export default AttendanceEmployeeDetails;