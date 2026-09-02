import React from "react";

import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import { useEmployee } from "../../../context/EmployeeContext";

import "./ExperienceForm.css";

const employmentTypeOptions = [
  { value: "Fresher", label: "Fresher" },
  { value: "Experienced", label: "Experienced" },
];

const employmentModeOptions = [
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Freelancer", label: "Freelancer" },
];

const noticePeriodOptions = [
  { value: "Immediate", label: "Immediate" },
  { value: "15 Days", label: "15 Days" },
  { value: "30 Days", label: "30 Days" },
  { value: "45 Days", label: "45 Days" },
  { value: "60 Days", label: "60 Days" },
  { value: "90 Days", label: "90 Days" },
];

const ExperienceForm = () => {

  const { employeeData, updateField } = useEmployee();

  return (

    <div className="experience-form">

      {/* ===================================================== */}

      <FormCard title="Professional Experience">

        <div className="experience-header">

          <div>

            <h3>Employment Information</h3>

            <p>
              Enter complete employment history of the employee.
            </p>

          </div>

          <div className="experience-badge">
            Experience Profile
          </div>

        </div>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Professional Summary">

        <SectionTitle title="Employment Overview" />

        <FormGrid>

          <CustomDropdown
            label="Employment Type"
            name="employmentType"
            required
            options={employmentTypeOptions}
            value={employeeData.employmentType || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Total Experience (Years)"
            name="totalExperience"
            placeholder="Example : 3.5"
            value={employeeData.totalExperience || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Relevant Experience"
            name="relevantExperience"
            placeholder="Example : 2 Years"
            value={employeeData.relevantExperience || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Notice Period"
            name="noticePeriod"
            options={noticePeriodOptions}
            value={employeeData.noticePeriod || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Current / Last Company">

        <SectionTitle title="Employment Details" />

        <FormGrid>

          <CustomTextInput
            label="Company Name"
            name="currentCompanyName"
            placeholder="Enter company name"
            value={employeeData.currentCompanyName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Employee ID"
            name="currentEmployeeId"
            placeholder="Employee ID"
            value={employeeData.currentEmployeeId || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Designation"
            name="currentDesignation"
            placeholder="Software Engineer"
            value={employeeData.currentDesignation || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Department"
            name="currentDepartment"
            placeholder="IT Department"
            value={employeeData.currentDepartment || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Employment Mode"
            name="currentEmploymentMode"
            options={employmentModeOptions}
            value={employeeData.currentEmploymentMode || ""}
            onChange={updateField}
          />

          <CustomTextInput
            type="date"
            label="Joining Date"
            name="currentJoiningDate"
            value={employeeData.currentJoiningDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            type="date"
            label="Relieving Date"
            name="currentRelievingDate"
            value={employeeData.currentRelievingDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Current CTC"
            name="currentCTC"
            placeholder="Annual Salary"
            value={employeeData.currentCTC || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Current Salary"
            name="currentSalary"
            placeholder="Monthly Salary"
            value={employeeData.currentSalary || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Manager Name"
            name="currentManager"
            placeholder="Reporting Manager"
            value={employeeData.currentManager || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Manager Contact"
            name="currentManagerContact"
            placeholder="9876543210"
            value={employeeData.currentManagerContact || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Manager Email"
            type="email"
            name="currentManagerEmail"
            placeholder="manager@company.com"
            value={employeeData.currentManagerEmail || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Previous Company">

        <SectionTitle title="Previous Employment" />

        <FormGrid>

          <CustomTextInput
            label="Company Name"
            name="previousCompanyName"
            placeholder="Previous Company"
            value={employeeData.previousCompanyName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Designation"
            name="previousDesignation"
            placeholder="Designation"
            value={employeeData.previousDesignation || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Department"
            name="previousDepartment"
            placeholder="Department"
            value={employeeData.previousDepartment || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Employment Mode"
            name="previousEmploymentMode"
            options={employmentModeOptions}
            value={employeeData.previousEmploymentMode || ""}
            onChange={updateField}
          />

          <CustomTextInput
            type="date"
            label="Joining Date"
            name="previousJoiningDate"
            value={employeeData.previousJoiningDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            type="date"
            label="Relieving Date"
            name="previousRelievingDate"
            value={employeeData.previousRelievingDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Last CTC"
            name="previousCTC"
            placeholder="Annual Salary"
            value={employeeData.previousCTC || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Reason For Leaving"
            name="previousReason"
            placeholder="Career Growth"
            value={employeeData.previousReason || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>
            {/* ===================================================== */}

      <FormCard title="Projects & Responsibilities">

        <SectionTitle title="Project Information" />

        <div className="experience-textarea-group">
          <label>Projects Worked</label>

          <textarea
            name="projectsWorked"
            placeholder="Describe important projects, responsibilities, technologies used..."
            value={employeeData.projectsWorked || ""}
            onChange={updateField}
          />
        </div>

        <div className="experience-textarea-group">
          <label>Key Responsibilities</label>

          <textarea
            name="keyResponsibilities"
            placeholder="Describe daily responsibilities..."
            value={employeeData.keyResponsibilities || ""}
            onChange={updateField}
          />
        </div>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Technical Skills">

        <SectionTitle title="Professional Skills" />

        <FormGrid>

          <CustomTextInput
            label="Primary Technology"
            name="primaryTechnology"
            placeholder="React.js"
            value={employeeData.primaryTechnology || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Secondary Technology"
            name="secondaryTechnology"
            placeholder="Node.js"
            value={employeeData.secondaryTechnology || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Database"
            name="databaseSkill"
            placeholder="MySQL / PostgreSQL"
            value={employeeData.databaseSkill || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Backend"
            name="backendSkill"
            placeholder="Node.js / Java"
            value={employeeData.backendSkill || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Frontend"
            name="frontendSkill"
            placeholder="React / Angular"
            value={employeeData.frontendSkill || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Version Control"
            name="versionControl"
            placeholder="Git / GitHub"
            value={employeeData.versionControl || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Cloud Platform"
            name="cloudPlatform"
            placeholder="AWS / Azure"
            value={employeeData.cloudPlatform || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Other Skills"
            name="otherSkills"
            placeholder="Docker, Redis..."
            value={employeeData.otherSkills || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Achievements">

        <SectionTitle title="Professional Achievements" />

        <div className="experience-textarea-group">

          <label>Achievements</label>

          <textarea
            name="professionalAchievements"
            placeholder="Awards, recognitions, promotions..."
            value={employeeData.professionalAchievements || ""}
            onChange={updateField}
          />

        </div>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Reference Details">

        <SectionTitle title="Professional Reference" />

        <FormGrid>

          <CustomTextInput
            label="Reference Name"
            name="referenceName"
            placeholder="Enter reference name"
            value={employeeData.referenceName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Company"
            name="referenceCompany"
            placeholder="Company Name"
            value={employeeData.referenceCompany || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Designation"
            name="referenceDesignation"
            placeholder="Manager"
            value={employeeData.referenceDesignation || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Mobile Number"
            name="referenceMobile"
            placeholder="9876543210"
            value={employeeData.referenceMobile || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Email"
            type="email"
            name="referenceEmail"
            placeholder="reference@email.com"
            value={employeeData.referenceEmail || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Relationship"
            name="referenceRelationship"
            placeholder="Reporting Manager"
            value={employeeData.referenceRelationship || ""}
            onChange={updateField}
          />

        </FormGrid>

      </FormCard>

      {/* ===================================================== */}

      <FormCard title="Experience Summary">

        <SectionTitle title="Additional Information" />

        <div className="experience-textarea-group">

          <label>Reason For Job Change</label>

          <textarea
            name="jobChangeReason"
            placeholder="Explain why you changed jobs..."
            value={employeeData.jobChangeReason || ""}
            onChange={updateField}
          />

        </div>

        <div className="experience-textarea-group">

          <label>Professional Summary</label>

          <textarea
            name="experienceSummary"
            placeholder="Write professional profile summary..."
            value={employeeData.experienceSummary || ""}
            onChange={updateField}
          />

        </div>

        <div className="experience-textarea-group">

          <label>HR Remarks</label>

          <textarea
            name="experienceRemarks"
            placeholder="Internal HR remarks..."
            value={employeeData.experienceRemarks || ""}
            onChange={updateField}
          />

        </div>

      </FormCard>

    </div>

  );

};

export default ExperienceForm;