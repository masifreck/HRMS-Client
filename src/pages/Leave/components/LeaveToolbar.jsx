import React from "react";

import {
  BsSearch,
  BsFunnel,
  BsDownload,
  BsPlusLg,
} from "react-icons/bs";

import {
  departmentOptions,
  leaveTypeOptions,
  leaveStatusOptions,
} from "./LeaveData";

import "./LeaveToolbar.css";

const LeaveToolbar = ({
  search,
  setSearch,
  department,
  setDepartment,
  leaveType,
  setLeaveType,
  status,
  setStatus,
  onAddLeave,
}) => {
  return (
    <div className="leave-toolbar">

      <div className="leave-toolbar-left">

        {/* Search */}

        <div className="leave-search-box">

          <BsSearch />

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        {/* Department */}

        <select
          value={department}
          onChange={(event) =>
            setDepartment(event.target.value)
          }
          className="leave-filter-select"
        >
          {departmentOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Leave Type */}

        <select
          value={leaveType}
          onChange={(event) =>
            setLeaveType(event.target.value)
          }
          className="leave-filter-select"
        >
          {leaveTypeOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          className="leave-filter-select"
        >
          {leaveStatusOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="leave-toolbar-right">

        <button
          type="button"
          className="leave-secondary-button"
        >
          <BsFunnel />
          <span>More Filters</span>
        </button>

        <button
          type="button"
          className="leave-secondary-button"
        >
          <BsDownload />
          <span>Export</span>
        </button>

        <button
          type="button"
          className="leave-primary-button"
          onClick={onAddLeave}
        >
          <BsPlusLg />
          <span>Apply Leave</span>
        </button>

      </div>

    </div>
  );
};

export default LeaveToolbar;