import React, { useMemo, useState } from "react";

import {
  BsPeopleFill,
  BsThreeDotsVertical,
  BsEye,
  BsPencilSquare,
  BsTrash,
  BsPersonCheckFill,
  BsPersonXFill,
  BsPersonDashFill,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import EmployeeToolbar from "./components/EmployeeToolbar";

import {
  employeeListData,
} from "./components/EmployeeListData";

import "./EmployeeList.css";


function EmployeeList() {

  const navigate = useNavigate();


  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All Departments");

  const [status, setStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [openMenu, setOpenMenu] =
    useState(null);


  const employeesPerPage = 6;


  /* ==========================
     FILTER EMPLOYEES
  ========================== */

  const filteredEmployees = useMemo(() => {

    return employeeListData.filter((employee) => {

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
        employee.email
          .toLowerCase()
          .includes(searchValue) ||
        employee.phone
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


  /* ==========================
     PAGINATION
  ========================== */

  const totalPages = Math.ceil(
    filteredEmployees.length /
      employeesPerPage
  );


  const startIndex =
    (currentPage - 1) *
    employeesPerPage;


  const currentEmployees =
    filteredEmployees.slice(
      startIndex,
      startIndex + employeesPerPage
    );


  const changePage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    setOpenMenu(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


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


  /* ==========================
     STATUS ICON
  ========================== */

  const getStatusIcon = (statusValue) => {

    if (statusValue === "Active") {
      return <BsPersonCheckFill />;
    }

    if (statusValue === "On Leave") {
      return <BsPersonDashFill />;
    }

    return <BsPersonXFill />;

  };


  return (
    <div className="employee-page">

      {/* PAGE HEADER */}

      <div className="employee-page-header">

        <div className="employee-page-title">

          <div className="employee-page-icon">
            <BsPeopleFill />
          </div>

          <div>
            <h2>
              Employees
            </h2>

            <p>
              Manage your organization's
              employees and workforce.
            </p>
          </div>

        </div>


        <div className="employee-summary">

          <div className="employee-summary-item">

            <strong>
              {employeeListData.length}
            </strong>

            <span>
              Total Employees
            </span>

          </div>

          <div className="summary-divider"></div>

          <div className="employee-summary-item">

            <strong>
              {
                employeeListData.filter(
                  (item) =>
                    item.status === "Active"
                ).length
              }
            </strong>

            <span>
              Active
            </span>

          </div>

        </div>

      </div>


      {/* TOOLBAR */}

      <EmployeeToolbar

        search={search}

        setSearch={handleSearchChange}

        department={department}

        setDepartment={handleDepartmentChange}

        status={status}

        setStatus={handleStatusChange}

        onAddEmployee={() =>
          navigate("/employees/add")
        }

      />


      {/* EMPLOYEE CARD */}

      <div className="employee-list-card">

        {/* CARD HEADER */}

        <div className="employee-list-header">

          <div>

            <h3>
              Employee Directory
            </h3>

            <p>
              Showing{" "}
              <strong>
                {filteredEmployees.length}
              </strong>{" "}
              employees
            </p>

          </div>

        </div>


        {/* DESKTOP TABLE */}

        <div className="employee-table-container">

          <table className="employee-list-table">

            <thead>

              <tr>

                <th>
                  Employee
                </th>

                <th>
                  Department
                </th>

                <th>
                  Designation
                </th>

                <th>
                  Joining Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {currentEmployees.map(
                (employee) => (

                  <tr key={employee.id}>

                    {/* EMPLOYEE */}

                    <td>

                      <div className="employee-table-person">

                        <div className="employee-table-avatar">
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


                    {/* DEPARTMENT */}

                    <td>
                      <span className="employee-department">
                        {employee.department}
                      </span>
                    </td>


                    {/* DESIGNATION */}

                    <td>
                      <span className="employee-designation">
                        {employee.designation}
                      </span>
                    </td>


                    {/* JOINING */}

                    <td>
                      <span className="employee-date">
                        {employee.joiningDate}
                      </span>
                    </td>


                    {/* STATUS */}

                    <td>

                      <span
                        className={`employee-status-badge ${
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


                    {/* ACTION */}

                    <td>

                      <div className="employee-action-wrapper">

                        <button
                          type="button"
                          className="employee-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === employee.id
                                ? null
                                : employee.id
                            )
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>


                        {openMenu === employee.id && (

                          <div className="employee-action-menu">

                           <button
  type="button"
  onClick={() =>
    navigate(`/employees/${employee.id}`)
  }
>
  <BsEye />
  View
</button>

                            <button type="button">
                              <BsPencilSquare />
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-action"
                            >
                              <BsTrash />
                              Delete
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


          {/* EMPTY STATE */}

          {currentEmployees.length === 0 && (

            <div className="employee-empty-state">

              <div>
                <BsPeopleFill />
              </div>

              <h3>
                No employees found
              </h3>

              <p>
                Try changing your search
                or filter criteria.
              </p>

            </div>

          )}

        </div>


        {/* PAGINATION */}

        {filteredEmployees.length > 0 && (

          <div className="employee-pagination">

            <span className="pagination-info">

              Showing{" "}

              <strong>
                {startIndex + 1}
              </strong>

              {" "}to{" "}

              <strong>
                {Math.min(
                  startIndex +
                    employeesPerPage,
                  filteredEmployees.length
                )}
              </strong>

              {" "}of{" "}

              <strong>
                {filteredEmployees.length}
              </strong>

            </span>


            <div className="pagination-buttons">

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
                { length: totalPages },
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
                  currentPage === totalPages
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

    </div>
  );
}

export default EmployeeList;