import React from "react";
import {
  BsList,
  BsSearch,
  BsBell,
  BsChatDots,
  BsMoon,
  BsChevronDown,
} from "react-icons/bs";

import "./Header.css";

function Header({ toggleSidebar }) {
  return (
    <header className="header">

      {/* Left Section */}

      <div className="header-left">

        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >
          <BsList />
        </button>

        <div className="logo">

          <div className="logo-icon">
            HR
          </div>

          <div className="logo-text">

            <h3>HRMS Pro</h3>

            <span>Enterprise Suite</span>

          </div>

        </div>

      </div>

      {/* Center */}

      <div className="header-center">

        <div className="search-box">

          <BsSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search employee, payroll, attendance..."
          />

        </div>

      </div>

      {/* Right */}

      <div className="header-right">

        <button className="header-icon">

          <BsMoon />

        </button>

        <button className="header-icon notification">

          <BsBell />

          <span className="badge">
            3
          </span>

        </button>

        <button className="header-icon notification">

          <BsChatDots />

          <span className="badge">
            5
          </span>

        </button>

        <div className="profile">

          <img
            src="https://ui-avatars.com/api/?name=Mohd+Asif&background=2563eb&color=fff"
            alt="profile"
          />

          <div className="profile-info">

            <h4>Mohd Asif</h4>

            <span>Administrator</span>

          </div>

          <BsChevronDown />

        </div>

      </div>

    </header>
  );
}

export default Header;