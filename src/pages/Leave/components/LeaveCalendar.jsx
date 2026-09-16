import React, { useMemo, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsCalendar3,
  BsPersonFill,
} from "react-icons/bs";

import  leaveData  from "./LeaveData";

import "./LeaveCalendar.css";

const LeaveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 8, 15)
  );

  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  const departments = [
    "All Departments",
    "Development",
    "HR",
    "Finance",
    "Marketing",
    "Operations",
    "Sales",
  ];

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const filteredLeaves = useMemo(() => {
    if (selectedDepartment === "All Departments") {
      return leaveData;
    }

    return leaveData.filter(
      (item) => item.department === selectedDepartment
    );
  }, [selectedDepartment]);

  const getDaysInMonth = () => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth();
  const firstDay = getFirstDayOfMonth();

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

    setSelectedDate(today);
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const getLeaveForDate = (day) => {
    const date = new Date(year, month, day);

    return filteredLeaves.filter((leave) => {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);

      from.setHours(0, 0, 0, 0);
      to.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);

      return date >= from && date <= to;
    });
  };

  const isSelectedDate = (day) => {
    if (!selectedDate) {
      return false;
    }

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day) => {
    const today = new Date();

    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const handleDateClick = (day) => {
    setSelectedDate(
      new Date(year, month, day)
    );
  };

  const selectedDateLeaves = selectedDate
    ? filteredLeaves.filter((leave) => {
        const from = new Date(leave.fromDate);
        const to = new Date(leave.toDate);

        const selected = new Date(selectedDate);

        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);

        return selected >= from && selected <= to;
      })
    : [];

  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push({
      type: "empty",
      id: `empty-${i}`,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({
      type: "day",
      day,
    });
  }

  return (
    <div className="leave-calendar-section">

      {/* Header */}
      <div className="leave-calendar-header">

        <div className="leave-calendar-title">

          <div className="leave-calendar-title-icon">
            <BsCalendar3 />
          </div>

          <div>
            <h2>Leave Calendar</h2>
            <p>
              View employee leave schedules
            </p>
          </div>

        </div>

        <div className="leave-calendar-controls">

          <select
            value={selectedDepartment}
            onChange={(e) =>
              setSelectedDepartment(e.target.value)
            }
            className="calendar-department-select"
          >
            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="today-button"
            onClick={goToToday}
          >
            Today
          </button>

        </div>

      </div>

      {/* Calendar */}
      <div className="leave-calendar-layout">

        <div className="leave-calendar-card">

          {/* Month Navigation */}
          <div className="calendar-month-header">

            <button
              type="button"
              onClick={previousMonth}
              className="month-navigation-button"
            >
              <BsChevronLeft />
            </button>

            <h3>
              {monthName} {year}
            </h3>

            <button
              type="button"
              onClick={nextMonth}
              className="month-navigation-button"
            >
              <BsChevronRight />
            </button>

          </div>

          {/* Week Days */}
          <div className="calendar-weekdays">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div key={day}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid">

            {calendarCells.map((cell) => {

              if (cell.type === "empty") {
                return (
                  <div
                    key={cell.id}
                    className="calendar-day empty-day"
                  />
                );
              }

              const leaves = getLeaveForDate(
                cell.day
              );

              return (
                <button
                  type="button"
                  key={cell.day}
                  className={`calendar-day ${
                    isSelectedDate(cell.day)
                      ? "selected"
                      : ""
                  } ${
                    isToday(cell.day)
                      ? "today"
                      : ""
                  }`}
                  onClick={() =>
                    handleDateClick(cell.day)
                  }
                >

                  <span className="calendar-day-number">
                    {cell.day}
                  </span>

                  {leaves.length > 0 && (
                    <div className="calendar-leave-list">

                      {leaves
                        .slice(0, 3)
                        .map((leave) => (
                          <span
                            key={leave.id}
                            className={`calendar-leave-pill ${leave.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            <span className="leave-pill-dot" />
                            {leave.employeeName}
                          </span>
                        ))}

                      {leaves.length > 3 && (
                        <span className="more-leaves">
                          +{leaves.length - 3} more
                        </span>
                      )}

                    </div>
                  )}

                </button>
              );
            })}

          </div>

          {/* Legend */}
          <div className="leave-calendar-legend">

            <div className="legend-item">
              <span className="legend-dot approved" />
              <span>Approved</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot pending" />
              <span>Pending</span>
            </div>

            <div className="legend-item">
              <span className="legend-dot rejected" />
              <span>Rejected</span>
            </div>

          </div>

        </div>

        {/* Selected Date */}
        <div className="selected-date-card">

          <div className="selected-date-header">

            <div>
              <span>Selected Date</span>

              <h3>
                {selectedDate
                  ? selectedDate.toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "--"}
              </h3>
            </div>

            <div className="selected-date-icon">
              <BsCalendar3 />
            </div>

          </div>

          <div className="selected-date-divider" />

          <div className="selected-date-title">
            <span>Leave Requests</span>
            <strong>
              {selectedDateLeaves.length}
            </strong>
          </div>

          {selectedDateLeaves.length === 0 ? (
            <div className="no-leave-date">

              <div className="no-leave-icon">
                <BsCalendar3 />
              </div>

              <strong>No leave scheduled</strong>

              <span>
                No employee leave is scheduled
                for this date.
              </span>

            </div>
          ) : (
            <div className="selected-leaves-list">

              {selectedDateLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="selected-leave-item"
                >

                  <div className="selected-leave-avatar">
                    {leave.initials ||
                      leave.employeeName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)}
                  </div>

                  <div className="selected-leave-info">

                    <strong>
                      {leave.employeeName}
                    </strong>

                    <span>
                      {leave.leaveType}
                    </span>

                    <small>
                      {leave.department}
                    </small>

                  </div>

                  <span
                    className={`selected-leave-status ${leave.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {leave.status}
                  </span>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default LeaveCalendar;