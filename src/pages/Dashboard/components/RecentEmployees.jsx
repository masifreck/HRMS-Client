import React from "react";
import {
  BsThreeDotsVertical,
  BsArrowUpRight,
} from "react-icons/bs";

import "./RecentEmployees.css";

function RecentEmployees() {

  const employees = [
    {
      id: 1,
      name: "Rahul Sharma",
      employeeId: "EMP-1024",
      department: "Development",
      designation: "Software Engineer",
      joiningDate: "12 Sep 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Singh",
      employeeId: "EMP-1023",
      department: "Human Resources",
      designation: "HR Executive",
      joiningDate: "10 Sep 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Verma",
      employeeId: "EMP-1022",
      department: "Finance",
      designation: "Accountant",
      joiningDate: "08 Sep 2026",
      status: "Active",
    },
    {
      id: 4,
      name: "Neha Gupta",
      employeeId: "EMP-1021",
      department: "Marketing",
      designation: "Marketing Executive",
      joiningDate: "06 Sep 2026",
      status: "Active",
    },
    {
      id: 5,
      name: "Arjun Kumar",
      employeeId: "EMP-1020",
      department: "Operations",
      designation: "Operations Manager",
      joiningDate: "04 Sep 2026",
      status: "Active",
    },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="recent-employees-card">

      <div className="recent-header">

        <div>
          <h3>Recent Employees</h3>

          <p>
            Recently added employees
          </p>
        </div>

        <button className="view-all-btn">
          View All
          <BsArrowUpRight />
        </button>

      </div>

      <div className="employee-table-wrapper">

        <table className="employee-table">

          <thead>

            <tr>

              <th>Employee</th>

              <th>Department</th>

              <th>Designation</th>

              <th>Joining Date</th>

              <th>Status</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {employees.map((employee) => (

              <tr key={employee.id}>

                <td>

                  <div className="employee-info">

                    <div className="employee-avatar">
                      {getInitials(employee.name)}
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
                  {employee.department}
                </td>

                <td>
                  {employee.designation}
                </td>

                <td>
                  {employee.joiningDate}
                </td>

                <td>

                  <span className="employee-status">
                    <span className="status-dot"></span>
                    {employee.status}
                  </span>

                </td>

                <td>

                  <button className="employee-more">
                    <BsThreeDotsVertical />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentEmployees;