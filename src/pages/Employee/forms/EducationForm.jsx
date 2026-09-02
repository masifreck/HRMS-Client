import React from "react";

import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import { useEmployee } from "../../../context/EmployeeContext";

import "./EducationForm.css";

const qualificationOptions = [
  { value: "10th", label: "10th / Secondary" },
  { value: "12th", label: "12th / Higher Secondary" },
  { value: "Diploma", label: "Diploma" },
  { value: "Graduation", label: "Graduation" },
  { value: "Post Graduation", label: "Post Graduation" },
  { value: "Doctorate", label: "Doctorate / PhD" },
  { value: "Other", label: "Other" },
];

const educationModeOptions = [
  { value: "Regular", label: "Regular" },
  { value: "Distance", label: "Distance" },
  { value: "Online", label: "Online" },
  { value: "Part Time", label: "Part Time" },
];

const gradeTypeOptions = [
  { value: "Percentage", label: "Percentage" },
  { value: "CGPA", label: "CGPA" },
  { value: "Grade", label: "Grade" },
];

const proficiencyOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];

const languageLevelOptions = [
  { value: "Basic", label: "Basic" },
  { value: "Good", label: "Good" },
  { value: "Fluent", label: "Fluent" },
  { value: "Native", label: "Native" },
];

const EducationForm = () => {
  const { employeeData, updateField } = useEmployee();

  return (
    <div className="education-form">
      <FormCard title="Education Information">
        <div className="education-intro">
          <div>
            <h3>Academic & Professional Qualifications</h3>

            <p>
              Add employee academic qualifications, certifications, skills and
              language proficiency.
            </p>
          </div>

          <div className="education-badge">
            Education Profile
          </div>
        </div>
      </FormCard>

      {/* =========================
          HIGHEST QUALIFICATION
      ========================== */}

      <FormCard title="Highest Qualification">
        <SectionTitle title="Qualification Details" />

        <FormGrid>
          <CustomDropdown
            label="Highest Qualification"
            name="highestQualification"
            required
            options={qualificationOptions}
            value={employeeData.highestQualification || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Course / Degree"
            name="highestDegree"
            placeholder="Example: B.Tech"
            value={employeeData.highestDegree || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Specialization"
            name="highestSpecialization"
            placeholder="Example: Computer Science"
            value={employeeData.highestSpecialization || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="University / Board"
            name="highestUniversity"
            placeholder="Enter university or board"
            value={employeeData.highestUniversity || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="College / Institute"
            name="highestInstitute"
            placeholder="Enter college or institute"
            value={employeeData.highestInstitute || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Education Mode"
            name="highestEducationMode"
            options={educationModeOptions}
            value={employeeData.highestEducationMode || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Start Year"
            type="number"
            name="highestStartYear"
            placeholder="2020"
            maxLength={4}
            value={employeeData.highestStartYear || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passing Year"
            type="number"
            name="highestPassingYear"
            placeholder="2024"
            maxLength={4}
            value={employeeData.highestPassingYear || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Result Type"
            name="highestGradeType"
            options={gradeTypeOptions}
            value={employeeData.highestGradeType || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Percentage / CGPA / Grade"
            name="highestResult"
            placeholder="Example: 82.5 or 8.5"
            value={employeeData.highestResult || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Enrollment / Roll Number"
            name="highestRollNumber"
            placeholder="Enter enrollment number"
            value={employeeData.highestRollNumber || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Education Location"
            name="highestEducationLocation"
            placeholder="City, State"
            value={employeeData.highestEducationLocation || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      {/* =========================
          10TH
      ========================== */}

      <FormCard title="Secondary Education">
        <SectionTitle title="10th / Secondary School Details" />

        <FormGrid>
          <CustomTextInput
            label="School Name"
            name="secondarySchoolName"
            placeholder="Enter school name"
            value={employeeData.secondarySchoolName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Board"
            name="secondaryBoard"
            placeholder="CBSE / ICSE / State Board"
            value={employeeData.secondaryBoard || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passing Year"
            type="number"
            name="secondaryPassingYear"
            placeholder="2018"
            value={employeeData.secondaryPassingYear || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Result Type"
            name="secondaryGradeType"
            options={gradeTypeOptions}
            value={employeeData.secondaryGradeType || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Percentage / CGPA"
            name="secondaryResult"
            placeholder="Example: 85%"
            value={employeeData.secondaryResult || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Roll Number"
            name="secondaryRollNumber"
            placeholder="Enter roll number"
            value={employeeData.secondaryRollNumber || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      {/* =========================
          12TH
      ========================== */}

      <FormCard title="Higher Secondary Education">
        <SectionTitle title="12th / Higher Secondary Details" />

        <FormGrid>
          <CustomTextInput
            label="School / College Name"
            name="higherSecondaryInstitute"
            placeholder="Enter institute name"
            value={employeeData.higherSecondaryInstitute || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Board"
            name="higherSecondaryBoard"
            placeholder="CBSE / ICSE / State Board"
            value={employeeData.higherSecondaryBoard || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Stream"
            name="higherSecondaryStream"
            placeholder="Science / Commerce / Arts"
            value={employeeData.higherSecondaryStream || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passing Year"
            type="number"
            name="higherSecondaryPassingYear"
            placeholder="2020"
            value={employeeData.higherSecondaryPassingYear || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Result Type"
            name="higherSecondaryGradeType"
            options={gradeTypeOptions}
            value={employeeData.higherSecondaryGradeType || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Percentage / CGPA"
            name="higherSecondaryResult"
            placeholder="Example: 82%"
            value={employeeData.higherSecondaryResult || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      {/* =========================
          GRADUATION
      ========================== */}

      <FormCard title="Graduation">
        <SectionTitle title="Graduation Details" />

        <FormGrid>
          <CustomTextInput
            label="Degree"
            name="graduationDegree"
            placeholder="Example: B.Tech / BCA / B.Com"
            value={employeeData.graduationDegree || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Specialization"
            name="graduationSpecialization"
            placeholder="Enter specialization"
            value={employeeData.graduationSpecialization || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="College"
            name="graduationCollege"
            placeholder="Enter college name"
            value={employeeData.graduationCollege || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="University"
            name="graduationUniversity"
            placeholder="Enter university name"
            value={employeeData.graduationUniversity || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Study Mode"
            name="graduationMode"
            options={educationModeOptions}
            value={employeeData.graduationMode || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Start Year"
            type="number"
            name="graduationStartYear"
            placeholder="2019"
            value={employeeData.graduationStartYear || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passing Year"
            type="number"
            name="graduationPassingYear"
            placeholder="2023"
            value={employeeData.graduationPassingYear || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Result Type"
            name="graduationGradeType"
            options={gradeTypeOptions}
            value={employeeData.graduationGradeType || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Percentage / CGPA"
            name="graduationResult"
            placeholder="Example: 8.2"
            value={employeeData.graduationResult || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      {/* =========================
          POST GRADUATION
      ========================== */}

      <FormCard title="Post Graduation">
        <SectionTitle title="Post Graduation Details" />

        <FormGrid>
          <CustomTextInput
            label="Degree"
            name="postGraduationDegree"
            placeholder="Example: MBA / M.Tech"
            value={employeeData.postGraduationDegree || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Specialization"
            name="postGraduationSpecialization"
            placeholder="Enter specialization"
            value={employeeData.postGraduationSpecialization || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="College"
            name="postGraduationCollege"
            placeholder="Enter college name"
            value={employeeData.postGraduationCollege || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="University"
            name="postGraduationUniversity"
            placeholder="Enter university"
            value={employeeData.postGraduationUniversity || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Study Mode"
            name="postGraduationMode"
            options={educationModeOptions}
            value={employeeData.postGraduationMode || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Start Year"
            type="number"
            name="postGraduationStartYear"
            placeholder="2023"
            value={employeeData.postGraduationStartYear || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Passing Year"
            type="number"
            name="postGraduationPassingYear"
            placeholder="2025"
            value={employeeData.postGraduationPassingYear || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Result Type"
            name="postGraduationGradeType"
            options={gradeTypeOptions}
            value={employeeData.postGraduationGradeType || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Percentage / CGPA"
            name="postGraduationResult"
            placeholder="Example: 8.5"
            value={employeeData.postGraduationResult || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      {/* =========================
          CERTIFICATIONS
      ========================== */}

      <FormCard title="Professional Certifications">
        <SectionTitle title="Certification Details" />

        <FormGrid>
          <CustomTextInput
            label="Certification Name"
            name="certificationName"
            placeholder="Example: AWS Developer Associate"
            value={employeeData.certificationName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Issuing Organization"
            name="certificationOrganization"
            placeholder="Example: Amazon Web Services"
            value={employeeData.certificationOrganization || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Certificate ID"
            name="certificateId"
            placeholder="Enter certificate ID"
            value={employeeData.certificateId || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Issue Date"
            type="date"
            name="certificateIssueDate"
            value={employeeData.certificateIssueDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Expiry Date"
            type="date"
            name="certificateExpiryDate"
            value={employeeData.certificateExpiryDate || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Certificate URL"
            type="url"
            name="certificateUrl"
            placeholder="https://..."
            value={employeeData.certificateUrl || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      {/* =========================
          SKILLS
      ========================== */}

      <FormCard title="Skills">
        <SectionTitle title="Professional Skills" />

        <div className="education-skill-grid">
          <div className="skill-field">
            <CustomTextInput
              label="Primary Skill"
              name="primarySkill"
              placeholder="Example: React.js"
              value={employeeData.primarySkill || ""}
              onChange={updateField}
            />

            <CustomDropdown
              label="Proficiency"
              name="primarySkillLevel"
              options={proficiencyOptions}
              value={employeeData.primarySkillLevel || ""}
              onChange={updateField}
            />
          </div>

          <div className="skill-field">
            <CustomTextInput
              label="Secondary Skill"
              name="secondarySkill"
              placeholder="Example: Node.js"
              value={employeeData.secondarySkill || ""}
              onChange={updateField}
            />

            <CustomDropdown
              label="Proficiency"
              name="secondarySkillLevel"
              options={proficiencyOptions}
              value={employeeData.secondarySkillLevel || ""}
              onChange={updateField}
            />
          </div>

          <div className="skill-field">
            <CustomTextInput
              label="Additional Skill"
              name="additionalSkill"
              placeholder="Example: PostgreSQL"
              value={employeeData.additionalSkill || ""}
              onChange={updateField}
            />

            <CustomDropdown
              label="Proficiency"
              name="additionalSkillLevel"
              options={proficiencyOptions}
              value={employeeData.additionalSkillLevel || ""}
              onChange={updateField}
            />
          </div>
        </div>
      </FormCard>

      {/* =========================
          LANGUAGES
      ========================== */}

      <FormCard title="Languages">
        <SectionTitle title="Language Proficiency" />

        <div className="language-grid">
          <div className="language-card">
            <CustomTextInput
              label="Language 1"
              name="languageOne"
              placeholder="Example: English"
              value={employeeData.languageOne || ""}
              onChange={updateField}
            />

            <CustomDropdown
              label="Proficiency"
              name="languageOneLevel"
              options={languageLevelOptions}
              value={employeeData.languageOneLevel || ""}
              onChange={updateField}
            />

            <div className="language-permissions">
              <label>
                <input
                  type="checkbox"
                  name="languageOneRead"
                  checked={employeeData.languageOneRead || false}
                  onChange={updateField}
                />
                Read
              </label>

              <label>
                <input
                  type="checkbox"
                  name="languageOneWrite"
                  checked={employeeData.languageOneWrite || false}
                  onChange={updateField}
                />
                Write
              </label>

              <label>
                <input
                  type="checkbox"
                  name="languageOneSpeak"
                  checked={employeeData.languageOneSpeak || false}
                  onChange={updateField}
                />
                Speak
              </label>
            </div>
          </div>

          <div className="language-card">
            <CustomTextInput
              label="Language 2"
              name="languageTwo"
              placeholder="Example: Hindi"
              value={employeeData.languageTwo || ""}
              onChange={updateField}
            />

            <CustomDropdown
              label="Proficiency"
              name="languageTwoLevel"
              options={languageLevelOptions}
              value={employeeData.languageTwoLevel || ""}
              onChange={updateField}
            />

            <div className="language-permissions">
              <label>
                <input
                  type="checkbox"
                  name="languageTwoRead"
                  checked={employeeData.languageTwoRead || false}
                  onChange={updateField}
                />
                Read
              </label>

              <label>
                <input
                  type="checkbox"
                  name="languageTwoWrite"
                  checked={employeeData.languageTwoWrite || false}
                  onChange={updateField}
                />
                Write
              </label>

              <label>
                <input
                  type="checkbox"
                  name="languageTwoSpeak"
                  checked={employeeData.languageTwoSpeak || false}
                  onChange={updateField}
                />
                Speak
              </label>
            </div>
          </div>

          <div className="language-card">
            <CustomTextInput
              label="Language 3"
              name="languageThree"
              placeholder="Enter language"
              value={employeeData.languageThree || ""}
              onChange={updateField}
            />

            <CustomDropdown
              label="Proficiency"
              name="languageThreeLevel"
              options={languageLevelOptions}
              value={employeeData.languageThreeLevel || ""}
              onChange={updateField}
            />

            <div className="language-permissions">
              <label>
                <input
                  type="checkbox"
                  name="languageThreeRead"
                  checked={employeeData.languageThreeRead || false}
                  onChange={updateField}
                />
                Read
              </label>

              <label>
                <input
                  type="checkbox"
                  name="languageThreeWrite"
                  checked={employeeData.languageThreeWrite || false}
                  onChange={updateField}
                />
                Write
              </label>

              <label>
                <input
                  type="checkbox"
                  name="languageThreeSpeak"
                  checked={employeeData.languageThreeSpeak || false}
                  onChange={updateField}
                />
                Speak
              </label>
            </div>
          </div>
        </div>
      </FormCard>

      {/* =========================
          ADDITIONAL INFORMATION
      ========================== */}

      <FormCard title="Additional Education Information">
        <SectionTitle title="Other Details" />

        <div className="education-textarea-group">
          <label htmlFor="educationAchievements">
            Academic Achievements
          </label>

          <textarea
            id="educationAchievements"
            name="educationAchievements"
            placeholder="Scholarships, awards, academic achievements..."
            value={employeeData.educationAchievements || ""}
            onChange={updateField}
          />
        </div>

        <div className="education-textarea-group">
          <label htmlFor="educationRemarks">
            Remarks
          </label>

          <textarea
            id="educationRemarks"
            name="educationRemarks"
            placeholder="Enter any additional education-related information..."
            value={employeeData.educationRemarks || ""}
            onChange={updateField}
          />
        </div>
      </FormCard>
    </div>
  );
};

export default EducationForm;