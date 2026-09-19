import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

// Authentication
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";

// Employee
import EmployeeList from "../pages/Employee/EmployeeList";
import AddEmployee from "../pages/Employee/AddEmployee";
import EmployeeDetails from "../pages/Employee/EmployeeDetails";

// Attendance
import Attendance from "../pages/Attendance/Attendance";
import AttendanceEmployeeDetails from "../pages/Attendance/components/AttendanceEmployeeDetails";

// Leave
import Leave from "../pages/Leave/Leave";
import ApplyLeave from "../pages/Leave/components/ApplyLeave";
import LeaveDetails from "../pages/Leave/components/LeaveDetails";

// Masters
import LeaveType from "../pages/Master/LeaveType/LeaveType";
import LeaveWorkflow from "../pages/Master/LeaveWorkflow/LeaveWorkflow";
import Branch from "../pages/Master/Branch/Branch";
import Designation from "../pages/Master/Designation/Designation";
import Department from "../pages/Master/Department/Department";
import Shift from "../pages/Master/Shift/Shift";
import Bank from "../pages/Master/Bank/Bank";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminLayout from "../Layout/SuperAdminLayout";

import Companies from "../pages/SuperAdmin/Companies/Companies";
import RegisterCompany from "../pages/SuperAdmin/Companies/RegisterCompany";
// Payroll
import Payroll from "../pages/Payroll/Payroll";

// Reimbursements
import Reimbursements from "../pages/Reimbursements/Reimbursements";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            PUBLIC ROUTES
        ====================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =====================================================
            PROTECTED ROUTES
        ====================================================== */}

    <Route element={<ProtectedRoute />}>

  <Route
    element={<SuperAdminLayout />}
  >

    <Route
      path="/super-admin/dashboard"
      element={<SuperAdminDashboard />}
    />

    <Route
      path="/super-admin/companies"
      element={<Companies />}
    />

    <Route
      path="/super-admin/companies/register"
      element={<RegisterCompany />}
    />

  </Route>


          <Route element={<MainLayout />}>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />


            {/* =================================================
                EMPLOYEE
            ================================================== */}

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


            {/* =================================================
                ATTENDANCE
            ================================================== */}

            <Route
              path="/attendance"
              element={<Attendance />}
            />

            <Route
              path="/attendance/employee/:id"
              element={<AttendanceEmployeeDetails />}
            />


            {/* =================================================
                LEAVE
            ================================================== */}

            <Route
              path="/leave"
              element={<Leave />}
            />

            <Route
              path="/leave/apply"
              element={<ApplyLeave />}
            />

            <Route
              path="/leave/:id"
              element={<LeaveDetails />}
            />


            {/* =================================================
                MASTERS
            ================================================== */}

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
              path="/masters/bank"
              element={<Bank />}
            />


            {/* =================================================
                PAYROLL
            ================================================== */}

            <Route
              path="/payroll"
              element={<Payroll />}
            />


            {/* =================================================
                REIMBURSEMENTS
            ================================================== */}

            <Route
              path="/reimbursements"
              element={<Reimbursements />}
            />

          </Route>

        </Route>


        {/* =====================================================
            FALLBACK
        ====================================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;