import React, { useState } from "react";
import {
  FiBarChart2,
  FiBriefcase,
  FiCreditCard,
  FiMenu,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";

import "./SuperAdminLayout.css";

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/super-admin/dashboard",
      icon: <FiBarChart2 />,
    },
    {
      label: "Companies",
      path: "/super-admin/companies",
      icon: <FiBriefcase />,
    },
    {
      label: "Subscriptions",
      path: "/super-admin/subscriptions",
      icon: <FiCreditCard />,
    },
    {
      label: "Users",
      path: "/super-admin/users",
      icon: <FiUsers />,
    },
  ];

  return (
    <div className="sa-layout">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="sa-mobile-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`sa-sidebar ${
          sidebarOpen ? "sa-sidebar-open" : ""
        }`}
      >

        <div className="sa-sidebar-header">

          <div className="sa-logo">
            H
          </div>

          <div className="sa-brand">
            <strong>HRMS</strong>
            <span>Platform</span>
          </div>

          <button
            className="sa-mobile-close"
            onClick={closeSidebar}
          >
            <FiX />
          </button>

        </div>


        <div className="sa-sidebar-section">
          PLATFORM
        </div>


        <nav className="sa-navigation">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sa-nav-item ${
                  isActive
                    ? "sa-nav-item-active"
                    : ""
                }`
              }
            >
              <span className="sa-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>
          ))}

        </nav>


        <div className="sa-sidebar-bottom">

          <NavLink
            to="/super-admin/settings"
            className="sa-nav-item"
            onClick={closeSidebar}
          >
            <span className="sa-nav-icon">
              <FiSettings />
            </span>

            <span>
              Settings
            </span>
          </NavLink>

          <div className="sa-admin-info">

            <div className="sa-admin-avatar">
              S
            </div>

            <div>
              <strong>
                Super Admin
              </strong>

              <span>
                Platform Administrator
              </span>
            </div>

          </div>

        </div>

      </aside>


      {/* MAIN */}

      <div className="sa-main">

        <header className="sa-topbar">

          <button
            className="sa-menu-button"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <FiMenu />
          </button>

          <div className="sa-topbar-title">
            Platform Administration
          </div>

        </header>


        <main className="sa-main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default SuperAdminLayout;