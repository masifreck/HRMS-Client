import React from "react";

import {
  BsSearch,
  BsSliders,
  BsPersonPlusFill,
  BsDownload,
} from "react-icons/bs";

import {
  departmentOptions,
  statusOptions,
} from "./EmployeeListData";

import "./EmployeeToolbar.css";

function EmployeeToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  onAddEmployee,
}) {

  return (
    <div className="employee-toolbar">

      <div className="employee-toolbar-left">

        {/* SEARCH */}

        <div className="employee-search">

          <BsSearch />

          <input
            type="text"
            placeholder="Search employee, ID, email..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>


        {/* DEPARTMENT */}

        <div className="employee-filter">

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


        {/* STATUS */}

        <div className="employee-filter">

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


      <div className="employee-toolbar-right">

        <button
          type="button"
          className="employee-export-btn"
        >
          <BsDownload />
          <span>Export</span>
        </button>


        <button
          type="button"
          className="employee-filter-btn"
        >
          <BsSliders />
          <span>More Filters</span>
        </button>


        <button
          type="button"
          className="add-employee-btn"
          onClick={onAddEmployee}
        >
          <BsPersonPlusFill />
          <span>Add Employee</span>
        </button>

      </div>

    </div>
  );
}

export default EmployeeToolbar;