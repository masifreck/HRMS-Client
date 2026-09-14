import React from "react";

import {
  BsSearch,
  BsCalendar3,
  BsDownload,
  BsSliders,
} from "react-icons/bs";

import {
  departmentOptions,
  statusOptions,
} from "./AttendanceData";

import "./AttendanceToolbar.css";

function AttendanceToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  date,
  setDate,
}) {
  return (
    <div className="attendance-toolbar">

      <div className="attendance-toolbar-left">

        <div className="attendance-search">
          <BsSearch />

          <input
            type="text"
            placeholder="Search employee, ID..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="attendance-date-filter">
          <BsCalendar3 />

          <input
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
          />
        </div>

        <div className="attendance-filter">
          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
          >
            {departmentOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="attendance-filter">
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            {statusOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

      <div className="attendance-toolbar-right">

        <button
          type="button"
          className="attendance-more-btn"
        >
          <BsSliders />
          <span>More Filters</span>
        </button>

        <button
          type="button"
          className="attendance-export-btn"
        >
          <BsDownload />
          <span>Export</span>
        </button>

      </div>

    </div>
  );
}

export default AttendanceToolbar;