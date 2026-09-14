import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  BsArrowLeft,
  BsPencilSquare,
  BsPersonFill,
  BsTelephoneFill,
  BsEnvelopeFill,
  BsCalendarCheckFill,
  BsBuildingFill,
  BsBriefcaseFill,
  BsGeoAltFill,
  BsCreditCard2FrontFill,
  BsBank2,
  BsShieldCheck,
  BsClockFill,
} from "react-icons/bs";

import { employeeListData } from "./components/EmployeeListData";

import "./EmployeeDetails.css";


function EmployeeDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const employee = employeeListData.find(
    (item) => item.id === Number(id)
  );


  /* ==========================
     EMPLOYEE NOT FOUND
  ========================== */

  if (!employee) {

    return (
      <div className="employee-details-page">

        <div className="employee-details-not-found">

          <div className="details-not-found-icon">
            <BsPersonFill />
          </div>

          <h2>
            Employee Not Found
          </h2>

          <p>
            The employee you're looking for
            does not exist or may have been removed.
          </p>

          <button
            type="button"
            onClick={() => navigate("/employees")}
          >
            <BsArrowLeft />
            Back to Employees
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="employee-details-page">


      {/* ==========================
          TOP BAR
      ========================== */}

      <div className="employee-details-topbar">

        <button
          type="button"
          className="details-back-button"
          onClick={() => navigate("/employees")}
        >
          <BsArrowLeft />
          <span>Back to Employees</span>
        </button>


        <button
          type="button"
          className="details-edit-button"
        >
          <BsPencilSquare />
          <span>Edit Employee</span>
        </button>

      </div>


      {/* ==========================
          PROFILE HEADER
      ========================== */}

      <div className="employee-profile-card">

        <div className="employee-profile-main">

          <div className="employee-profile-avatar">
            {employee.initials}
          </div>


          <div className="employee-profile-info">

            <div className="employee-profile-name-row">

              <h1>
                {employee.name}
              </h1>

              <span
                className={`employee-profile-status ${
                  employee.status
                    .toLowerCase()
                    .replace(" ", "-")
                }`}
              >
                <span className="status-dot"></span>
                {employee.status}
              </span>

            </div>


            <p className="employee-profile-designation">
              {employee.designation}
            </p>


            <div className="employee-profile-meta">

              <span>
                <BsPersonFill />
                {employee.employeeId}
              </span>

              <span>
                <BsBuildingFill />
                {employee.department}
              </span>

              <span>
                <BsCalendarCheckFill />
                Joined {employee.joiningDate}
              </span>

            </div>

          </div>

        </div>


        <div className="employee-profile-actions">

          <div className="profile-action-item">

            <span>
              Employee ID
            </span>

            <strong>
              {employee.employeeId}
            </strong>

          </div>

          <div className="profile-action-divider"></div>

          <div className="profile-action-item">

            <span>
              Department
            </span>

            <strong>
              {employee.department}
            </strong>

          </div>

        </div>

      </div>


      {/* ==========================
          CONTENT GRID
      ========================== */}

      <div className="employee-details-grid">


        {/* ==========================
            PERSONAL INFORMATION
        ========================== */}

        <div className="employee-info-card">

          <div className="employee-info-card-header">

            <div className="info-card-icon">
              <BsPersonFill />
            </div>

            <div>
              <h3>
                Personal Information
              </h3>

              <p>
                Basic employee contact details
              </p>
            </div>

          </div>


          <div className="employee-info-content">

            <div className="employee-info-field">

              <span>
                Full Name
              </span>

              <strong>
                {employee.name}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Email Address
              </span>

              <strong>
                {employee.email}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Phone Number
              </span>

              <strong>
                {employee.phone}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Employee ID
              </span>

              <strong>
                {employee.employeeId}
              </strong>

            </div>

          </div>

        </div>


        {/* ==========================
            WORK INFORMATION
        ========================== */}

        <div className="employee-info-card">

          <div className="employee-info-card-header">

            <div className="info-card-icon work">
              <BsBriefcaseFill />
            </div>

            <div>
              <h3>
                Work Information
              </h3>

              <p>
                Organization and employment details
              </p>
            </div>

          </div>


          <div className="employee-info-content">

            <div className="employee-info-field">

              <span>
                Department
              </span>

              <strong>
                {employee.department}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Designation
              </span>

              <strong>
                {employee.designation}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Joining Date
              </span>

              <strong>
                {employee.joiningDate}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Employment Status
              </span>

              <strong className="status-text">
                {employee.status}
              </strong>

            </div>

          </div>

        </div>


        {/* ==========================
            CONTACT CARD
        ========================== */}

        <div className="employee-info-card">

          <div className="employee-info-card-header">

            <div className="info-card-icon contact">
              <BsTelephoneFill />
            </div>

            <div>
              <h3>
                Contact Information
              </h3>

              <p>
                Employee communication details
              </p>
            </div>

          </div>


          <div className="employee-contact-list">

            <div className="employee-contact-item">

              <div className="contact-item-icon">
                <BsEnvelopeFill />
              </div>

              <div>
                <span>
                  Email
                </span>

                <strong>
                  {employee.email}
                </strong>
              </div>

            </div>


            <div className="employee-contact-item">

              <div className="contact-item-icon">
                <BsTelephoneFill />
              </div>

              <div>
                <span>
                  Mobile
                </span>

                <strong>
                  {employee.phone}
                </strong>
              </div>

            </div>


            <div className="employee-contact-item">

              <div className="contact-item-icon">
                <BsGeoAltFill />
              </div>

              <div>
                <span>
                  Location
                </span>

                <strong>
                  India
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* ==========================
            ACCOUNT INFORMATION
        ========================== */}

        <div className="employee-info-card">

          <div className="employee-info-card-header">

            <div className="info-card-icon account">
              <BsCreditCard2FrontFill />
            </div>

            <div>
              <h3>
                Account Information
              </h3>

              <p>
                Employee account details
              </p>
            </div>

          </div>


          <div className="employee-info-content">

            <div className="employee-info-field">

              <span>
                Employee Code
              </span>

              <strong>
                {employee.employeeId}
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Bank Account
              </span>

              <strong>
                XXXX XXXX 4521
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Account Status
              </span>

              <strong className="account-active">
                Active
              </strong>

            </div>


            <div className="employee-info-field">

              <span>
                Access Role
              </span>

              <strong>
                Employee
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================
          QUICK INFORMATION
      ========================== */}

      <div className="employee-quick-grid">


        <div className="employee-quick-card">

          <div className="quick-card-icon attendance">
            <BsCalendarCheckFill />
          </div>

          <div>

            <span>
              Attendance
            </span>

            <strong>
              96.4%
            </strong>

            <small>
              This month
            </small>

          </div>

        </div>


        <div className="employee-quick-card">

          <div className="quick-card-icon leave">
            <BsClockFill />
          </div>

          <div>

            <span>
              Leave Balance
            </span>

            <strong>
              12 Days
            </strong>

            <small>
              Remaining
            </small>

          </div>

        </div>


        <div className="employee-quick-card">

          <div className="quick-card-icon payroll">
            <BsBank2 />
          </div>

          <div>

            <span>
              Payroll
            </span>

            <strong>
              Processed
            </strong>

            <small>
              September 2026
            </small>

          </div>

        </div>


        <div className="employee-quick-card">

          <div className="quick-card-icon verified">
            <BsShieldCheck />
          </div>

          <div>

            <span>
              Verification
            </span>

            <strong>
              Verified
            </strong>

            <small>
              Profile complete
            </small>

          </div>

        </div>

      </div>

    </div>
  );
}


export default EmployeeDetails;