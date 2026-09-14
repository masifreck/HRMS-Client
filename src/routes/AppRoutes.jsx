import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import EmployeeList from "../pages/Employee/EmployeeList";

import AddEmployee from "../pages/Employee/AddEmployee";
import EmployeeDetails from "../pages/Employee/EmployeeDetails";
import Attendance from "../pages/Attendance/Attendance";
import AttendanceEmployeeDetails
  from "../pages/Attendance/components/AttendanceEmployeeDetails";

import Leave from "../pages/Leave/Leave";
function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/employees"
                        element={<EmployeeList />}
                    />

                    <Route
                        path="/employees/add"
                        element={<AddEmployee />}
                    />

  <Route
  path="/employees/:id"
  element={<EmployeeDetails />}
/>

<Route
  path="/attendance"
  element={<Attendance />}
/>

<Route
  path="/attendance/employee/:id"
  element={<AttendanceEmployeeDetails />}
/>

<Route
  path="/leave"
  element={<Leave />}
/>
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;