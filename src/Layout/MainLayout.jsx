import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

import "./MainLayout.css";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">

      <Header
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="layout-body">

        <Sidebar
          sidebarOpen={sidebarOpen}
        />

        <main
          className={`layout-content ${
            sidebarOpen ? "sidebar-open" : "sidebar-close"
          }`}
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;