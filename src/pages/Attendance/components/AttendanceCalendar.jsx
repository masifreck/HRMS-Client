import React, { useMemo, useState } from "react";

import {
  BsChevronLeft,
  BsChevronRight,
  BsPersonCheckFill,
  BsPersonXFill,
  BsClockFill,
  BsPersonDashFill,
  BsCalendar3,
} from "react-icons/bs";

import "./AttendanceCalendar.css";

const employees = [
  {
    id: 1,
    name: "Rahul Sharma",
    employeeId: "EMP-1024",
    department: "Development",
    initials: "RS",
  },
  {
    id: 2,
    name: "Priya Singh",
    employeeId: "EMP-1023",
    department: "Human Resources",
    initials: "PS",
  },
  {
    id: 3,
    name: "Aman Verma",
    employeeId: "EMP-1022",
    department: "Finance",
    initials: "AV",
  },
  {
    id: 4,
    name: "Neha Gupta",
    employeeId: "EMP-1021",
    department: "Marketing",
    initials: "NG",
  },
];

const statusPattern = [
  "present",
  "present",
  "present",
  "late",
  "present",
  "weekend",
  "weekend",
  "present",
  "present",
  "absent",
  "present",
  "leave",
  "present",
  "weekend",
  "weekend",
  "present",
  "late",
  "present",
  "present",
  "present",
  "present",
  "weekend",
  "weekend",
  "present",
  "present",
  "present",
  "absent",
  "present",
  "present",
  "weekend",
  "weekend",
];

const getStatusForDay = (employeeId, day) => {
  if (!day) {
    return null;
  }

  const index =
    (day + employeeId * 3) %
    statusPattern.length;

  return statusPattern[index];
};

function AttendanceCalendar() {
  const [selectedEmployee, setSelectedEmployee] =
    useState(employees[0]);

  const [currentDate, setCurrentDate] =
    useState(new Date(2026, 8, 1));

  const [selectedDay, setSelectedDay] =
    useState(15);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(day);
    }

    return days;
  }, [firstDay, daysInMonth]);

  const changeMonth = (direction) => {
    setCurrentDate(
      new Date(
        year,
        month + direction,
        1
      )
    );

    setSelectedDay(null);
  };

  const selectedStatus = selectedDay
    ? getStatusForDay(
        selectedEmployee.id,
        selectedDay
      )
    : null;

  const statusLabel = {
    present: "Present",
    absent: "Absent",
    late: "Late",
    leave: "On Leave",
    weekend: "Weekend",
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <BsPersonCheckFill />;

      case "absent":
        return <BsPersonXFill />;

      case "late":
        return <BsClockFill />;

      case "leave":
        return <BsPersonDashFill />;

      default:
        return null;
    }
  };

  return (
    <div className="attendance-calendar">

      {/* Header */}

      <div className="attendance-calendar-header">

        <div className="calendar-heading">

          <div className="calendar-heading-icon">
            <BsCalendar3 />
          </div>

          <div>
            <h2>Attendance Calendar</h2>

            <p>
              View monthly attendance for individual
              employees.
            </p>
          </div>

        </div>

        {/* Employee */}

        <div className="calendar-employee-select">

          <span>Employee</span>

          <select
            value={selectedEmployee.id}
            onChange={(event) => {
              const employee =
                employees.find(
                  (item) =>
                    item.id ===
                    Number(event.target.value)
                );

              setSelectedEmployee(employee);
              setSelectedDay(null);
            }}
          >
            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.name} -{" "}
                {employee.employeeId}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Employee summary */}

      <div className="calendar-employee-card">

        <div className="calendar-employee-avatar">
          {selectedEmployee.initials}
        </div>

        <div className="calendar-employee-info">

          <h3>{selectedEmployee.name}</h3>

          <p>
            {selectedEmployee.employeeId}
            <span>•</span>
            {selectedEmployee.department}
          </p>

        </div>

        <div className="calendar-summary">

          <div>
            <strong>20</strong>
            <span>Present</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Absent</span>
          </div>

          <div>
            <strong>2</strong>
            <span>Late</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Leave</span>
          </div>

        </div>

      </div>

      {/* Calendar */}

      <div className="calendar-card">

        <div className="calendar-navigation">

          <button
            type="button"
            onClick={() =>
              changeMonth(-1)
            }
          >
            <BsChevronLeft />
          </button>

          <div>
            <h3>
              {monthName} {year}
            </h3>

            <span>
              Monthly attendance overview
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              changeMonth(1)
            }
          >
            <BsChevronRight />
          </button>

        </div>

        {/* Legend */}

        <div className="calendar-legend">

          <span>
            <i className="legend-dot present"></i>
            Present
          </span>

          <span>
            <i className="legend-dot late"></i>
            Late
          </span>

          <span>
            <i className="legend-dot absent"></i>
            Absent
          </span>

          <span>
            <i className="legend-dot leave"></i>
            On Leave
          </span>

        </div>

        {/* Week */}

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

        {/* Days */}

        <div className="calendar-grid">

          {calendarDays.map(
            (day, index) => {

              const status =
                getStatusForDay(
                  selectedEmployee.id,
                  day
                );

              const isSelected =
                selectedDay === day;

              const isToday =
                day === 15 &&
                month === 8 &&
                year === 2026;

              return (
                <button
                  type="button"
                  key={`${year}-${month}-${index}`}
                  className={`calendar-day ${
                    !day ? "empty" : ""
                  } ${
                    isSelected
                      ? "selected"
                      : ""
                  } ${
                    isToday
                      ? "today"
                      : ""
                  } ${
                    status || ""
                  }`}
                  disabled={!day}
                  onClick={() =>
                    setSelectedDay(day)
                  }
                >
                  {day && (
                    <>
                      <span className="calendar-day-number">
                        {day}
                      </span>

                      {status !==
                        "weekend" && (
                        <span
                          className={`calendar-status-dot ${status}`}
                        ></span>
                      )}
                    </>
                  )}
                </button>
              );
            }
          )}

        </div>

      </div>

      {/* Selected day */}

      {selectedDay && (
        <div className="selected-day-card">

          <div className="selected-day-header">

            <div>
              <span>Selected Date</span>

              <h3>
                {selectedDay} {monthName}{" "}
                {year}
              </h3>
            </div>

            {selectedStatus &&
              selectedStatus !==
                "weekend" && (
                <span
                  className={`selected-status ${selectedStatus}`}
                >
                  {getStatusIcon(
                    selectedStatus
                  )}

                  {
                    statusLabel[
                      selectedStatus
                    ]
                  }
                </span>
              )}

          </div>

          <div className="selected-day-details">

            <div>
              <span>Check In</span>
              <strong>
                {selectedStatus ===
                  "absent" ||
                selectedStatus ===
                  "leave"
                  ? "--"
                  : selectedStatus ===
                    "late"
                  ? "09:28 AM"
                  : "08:58 AM"}
              </strong>
            </div>

            <div>
              <span>Check Out</span>
              <strong>
                {selectedStatus ===
                  "absent" ||
                selectedStatus ===
                  "leave"
                  ? "--"
                  : "06:05 PM"}
              </strong>
            </div>

            <div>
              <span>Work Hours</span>
              <strong>
                {selectedStatus ===
                  "absent" ||
                selectedStatus ===
                  "leave"
                  ? "--"
                  : selectedStatus ===
                    "late"
                  ? "8h 37m"
                  : "9h 07m"}
              </strong>
            </div>

            <div>
              <span>Attendance Status</span>

              <strong>
                {statusLabel[
                  selectedStatus
                ] || "Weekend"}
              </strong>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AttendanceCalendar;