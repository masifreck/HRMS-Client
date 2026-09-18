import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import EmployeeList from "../pages/Employee/EmployeeList";

import AddEmployee from "../pages/Employee/AddEmployee";
import EmployeeDetails from "../pages/Employee/EmployeeDetails";
import Attendance from "../pages/Attendance/Attendance";
import AttendanceEmployeeDetails
  from "../pages/Attendance/components/AttendanceEmployeeDetails";
import LeaveDetails
  from "../pages/Leave/components/LeaveDetails";

import Leave from "../pages/Leave/Leave";
import ApplyLeave from "../pages/Leave/components/ApplyLeave";
import LeaveType from "../pages/Master/LeaveType/LeaveType";
import LeaveWorkflow from "../pages/Master/LeaveWorkflow/LeaveWorkflow";

import Branch from "../pages/Master/Branch/Branch";
import Designation from "../pages/Master/Designation/Designation";
import Department from "../pages/Master/Department/Department";
import Shift from "../pages/Master/Shift/Shift";
import Payroll from "../pages/Payroll/Payroll";
import Bank from "../pages/Master/Bank/Bank";

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
<Route path="/leave/apply" element={<ApplyLeave />} />
<Route
  path="/leave/:id"
  element={<LeaveDetails />}
/>

<Route
  path="/masters/leave-workflow"
  element={<LeaveWorkflow />}
/>

<Route
  path="/masters/branch"
  element={<Branch />}
/>

<Route
  path="/masters/department"
  element={<Department />}
/>

<Route
  path="/masters/designation"
  element={<Designation />}
/>

<Route
  path="/masters/shift"
  element={<Shift />}
/>

<Route
  path="/masters/leave-type"
  element={<LeaveType />}
/>

<Route
  path="/masters/leave-workflow"
  element={<LeaveWorkflow />}
/>

<Route
  path="/masters/bank"
  element={<Bank />}
/>
<Route path="/payroll" element={<Payroll />} />
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;