import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsChevronDown,
  BsChevronRight,
} from "react-icons/bs";

import sidebarMenu from "../../data/sidebarMenu";
import "./Sidebar.css";

function Sidebar({ sidebarOpen }) {
  const [openMenus, setOpenMenus] = useState({
    Employee: true,
    Masters: true,
  });

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
      <div className="sidebar-content">

        {sidebarMenu?.map((section) => {

          // Safety check
          if (!section?.items || !Array.isArray(section.items)) {
            return null;
          }

          return (
            <div
              className="sidebar-section"
              key={section.section}
            >
              {/* Section Heading */}
              {sidebarOpen && section.section && (
                <p className="sidebar-heading">
                  {section.section}
                </p>
              )}

              {section.items.map((item) => {

                // Safety check
                if (!item) {
                  return null;
                }

                const Icon = item.icon;

                {/* =========================
                    MENU WITH CHILDREN
                ========================= */}
                if (
                  item.children &&
                  Array.isArray(item.children)
                ) {
                  return (
                    <div key={item.title}>

                      <div
                        className="sidebar-item"
                        onClick={() => toggleMenu(item.title)}
                      >
                        <div className="sidebar-left">
                          {Icon && (
                            <Icon className="sidebar-icon" />
                          )}

                          {sidebarOpen && (
                            <span>{item.title}</span>
                          )}
                        </div>

                        {sidebarOpen && (
                          openMenus[item.title] ? (
                            <BsChevronDown />
                          ) : (
                            <BsChevronRight />
                          )
                        )}
                      </div>

                      {/* SUBMENU */}
                      {sidebarOpen &&
                        openMenus[item.title] && (
                          <div className="submenu">

                            {item.children.map((child) => {

                              if (!child) {
                                return null;
                              }

                              const ChildIcon = child.icon;

                              return (
                                <NavLink
                                  key={child.title}
                                  to={child.path}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "submenu-item active"
                                      : "submenu-item"
                                  }
                                >
                                  {ChildIcon && (
                                    <ChildIcon />
                                  )}

                                  <span>
                                    {child.title}
                                  </span>
                                </NavLink>
                              );
                            })}

                          </div>
                        )}
                    </div>
                  );
                }

                {/* =========================
                    NORMAL MENU ITEM
                ========================= */}
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "sidebar-item active"
                        : "sidebar-item"
                    }
                  >
                    <div className="sidebar-left">

                      {Icon && (
                        <Icon className="sidebar-icon" />
                      )}

                      {sidebarOpen && (
                        <span>{item.title}</span>
                      )}

                    </div>
                  </NavLink>
                );
              })}
            </div>
          );
        })}

      </div>

      {/* =========================
          SIDEBAR FOOTER
      ========================= */}
      <div className="sidebar-footer">

        {sidebarOpen ? (
          <>
            <div className="user-card">

              <img
                src="https://ui-avatars.com/api/?name=Mohd+Asif&background=2563eb&color=fff"
                alt="User"
              />

              <div>
                <h4>Mohd Asif</h4>
                <p>Administrator</p>
              </div>

            </div>

            {/* <div className="version-card">
              <small>HRMS PRO</small>
              <span>Version 1.0.0</span>
            </div> */}
          </>
        ) : (
          <img
            className="mini-avatar"
            src="https://ui-avatars.com/api/?name=Mohd+Asif&background=2563eb&color=fff"
            alt="User"
          />
        )}

      </div>

    </aside>
  );
}

export default Sidebar;