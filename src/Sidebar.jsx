import React, { useState } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsCalendarCheck,
  BsCalendar2CheckFill,
  BsCashStack,
  BsBarChartFill,
  BsWallet2,
  BsCalendarEvent,
  BsGearFill,
  BsChevronDown,
  BsChevronRight,
  BsListTask,
  BsBuilding,
  BsPersonBadge,
  BsDiagram3,
  BsClock,
} from "react-icons/bs";

function Sidebar({ sidebarOpen, toggleSidebar}) {
  const [masterOpen, setMasterOpen] = useState(false);

  return (
    <aside id="sidebar" className={sidebarOpen ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon" />
          <span>HRMS</span>
        </div>

        <span className="icon close_icon" onClick={toggleSidebar}>X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsGrid1X2Fill className="icon" />
            <span className="sidebar-link-text">Dashboard</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsPeopleFill className="icon" />
            <span className="sidebar-link-text">Employees</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsCalendarCheck className="icon" />
            <span className="sidebar-link-text">Attendance</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsCalendar2CheckFill className="icon" />
            <span className="sidebar-link-text">Leaves</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsCashStack className="icon" />
            <span className="sidebar-link-text">Payroll</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsBarChartFill className="icon" />
            <span className="sidebar-link-text">Reports</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsWallet2 className="icon" />
            <span className="sidebar-link-text">Reimbursements</span>
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsCalendarEvent className="icon" />
            <span className="sidebar-link-text">Holidays</span>
          </a>
        </li>

        {/* Master List */}
        <li className="sidebar-list-item">
          <div
            className="sidebar-link"
            onClick={() => setMasterOpen(!masterOpen)}
            style={{ cursor: "pointer" }}
          >
            <BsListTask className="icon" />
            <span className="sidebar-link-text">Master List</span>

            <span style={{ marginLeft: "auto" }}>
              {masterOpen ? <BsChevronDown /> : <BsChevronRight />}
            </span>
          </div>

          {masterOpen && (
            <ul className="submenu">
              <li>
                <a href="#">
                  <BsBuilding className="icon" /> Branch
                </a>
              </li>

              <li>
                <a href="#">
                  <BsPersonBadge className="icon" /> Designation
                </a>
              </li>

              <li>
                <a href="#">
                  <BsDiagram3 className="icon" /> Department
                </a>
              </li>

              <li>
                <a href="#">
                  <BsClock className="icon" /> Shift
                </a>
              </li>

              <li>
                <a href="#">
                  <BsCalendar2CheckFill className="icon" /> Leave Type
                </a>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar-list-item">
          <a href="#" className="sidebar-link">
            <BsGearFill className="icon" />
            <span className="sidebar-link-text">Settings</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;