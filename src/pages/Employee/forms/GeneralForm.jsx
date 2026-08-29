import { useState } from "react";

import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import {
  genderOptions,
  salutationOptions,
  branchOptions,
  departmentOptions,
  companyOptions,
  designationOptions,
  gradeOptions,
  statusOptions,
} from "../../../data/dropdownData";

import "./GeneralForm.css";

const GeneralForm = () => {
  const [employee, setEmployee] = useState({
    employeeCode: "",
    employeeName: "",
    salutation: "",
    dob: "",
    gender: "",
    joiningDate: "",
    fatherName: "",
    motherName: "",
    branch: "",
    department: "",
    designation: "",
    company: "",
    grade: "",
    project: "",
    reportingHead: "",
    attendanceCode: "",
    geoId: "",
    currentStatus: "Current",
    vehicleNo: "",
    driveStartDate: "",
    onDuty: true,
    salaryStop: false,
    isLogin: false,
    isSalaryShow: false,
    attendanceApp: false,
    attendanceAnywhere: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <FormCard title="General Information">
        <SectionTitle title="Employee Details" />

        <FormGrid>

          <CustomTextInput
            label="Employee Code"
            name="employeeCode"
            value={employee.employeeCode}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Employee Name"
            name="employeeName"
            required
            value={employee.employeeName}
            onChange={handleChange}
          />

          <CustomDropdown
            label="Salutation"
            options={salutationOptions}
            value={employee.salutation}
            name="salutation"
            onChange={handleChange}
          />

          <CustomTextInput
            label="Date of Birth"
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
          />

          <CustomDropdown
            label="Gender"
            options={genderOptions}
            value={employee.gender}
            name="gender"
            onChange={handleChange}
          />

          <CustomTextInput
            label="Joining Date"
            type="date"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Father Name"
            name="fatherName"
            value={employee.fatherName}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Mother Name"
            name="motherName"
            value={employee.motherName}
            onChange={handleChange}
          />

          <CustomDropdown
            label="Branch"
            options={branchOptions}
            value={employee.branch}
            name="branch"
            onChange={handleChange}
          />

          <CustomDropdown
            label="Department"
            options={departmentOptions}
            value={employee.department}
            name="department"
            onChange={handleChange}
          />

          <CustomDropdown
            label="Designation"
            options={designationOptions}
            value={employee.designation}
            name="designation"
            onChange={handleChange}
          />

          <CustomDropdown
            label="Company"
            options={companyOptions}
            value={employee.company}
            name="company"
            onChange={handleChange}
          />

          <CustomDropdown
            label="Grade"
            options={gradeOptions}
            value={employee.grade}
            name="grade"
            onChange={handleChange}
          />

          <CustomTextInput
            label="Project"
            name="project"
            value={employee.project}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Reporting Head"
            name="reportingHead"
            value={employee.reportingHead}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Attendance Code"
            name="attendanceCode"
            value={employee.attendanceCode}
            onChange={handleChange}
          />

          <CustomDropdown
            label="Current Status"
            options={statusOptions}
            value={employee.currentStatus}
            name="currentStatus"
            onChange={handleChange}
          />

          <CustomTextInput
            label="Geo Finishing Id"
            name="geoId"
            value={employee.geoId}
            onChange={handleChange}
          />

        </FormGrid>
      </FormCard>

      <FormCard title="Attendance & Permissions">
        <div className="checkbox-grid">

          <label><input type="checkbox" name="onDuty" checked={employee.onDuty} onChange={handleChange} /> On Duty</label>

          <label><input type="checkbox" name="salaryStop" checked={employee.salaryStop} onChange={handleChange} /> Salary Stop</label>

          <label><input type="checkbox" name="isLogin" checked={employee.isLogin} onChange={handleChange} /> Is Login</label>

          <label><input type="checkbox" name="isSalaryShow" checked={employee.isSalaryShow} onChange={handleChange} /> Is Salary Show</label>

          <label><input type="checkbox" name="attendanceApp" checked={employee.attendanceApp} onChange={handleChange} /> Attendance From App</label>

          <label><input type="checkbox" name="attendanceAnywhere" checked={employee.attendanceAnywhere} onChange={handleChange} /> Attendance Anywhere</label>

        </div>
      </FormCard>

      <FormCard title="Vehicle Details">

        <FormGrid>

          <CustomTextInput
            label="Vehicle Number"
            name="vehicleNo"
            value={employee.vehicleNo}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Drive Start Date"
            type="date"
            name="driveStartDate"
            value={employee.driveStartDate}
            onChange={handleChange}
          />

        </FormGrid>

      </FormCard>
    </>
  );
};

export default GeneralForm;