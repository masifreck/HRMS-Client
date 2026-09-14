import React from "react";
import {
  BsPersonVcardFill,
  BsTelephoneFill,
  BsEnvelopeFill,
  BsCalendarDateFill,
  BsGenderAmbiguous,
  BsGeoAltFill,
  BsBuildingFill,
  BsBriefcaseFill,
} from "react-icons/bs";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import "./EducationForm.css";

function PersonalForm({ data = {}, onChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange({
      [name]: value,
    });
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
  ];

  const employmentTypeOptions = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Intern", label: "Intern" },
  ];

  return (
    <div className="employee-form">

      {/* Form Header */}

      <div className="form-section-header">
        <div className="form-section-icon">
          <BsPersonVcardFill />
        </div>

        <div>
          <h3>Personal Information</h3>
          <p>
            Enter the employee's basic personal and contact
            information.
          </p>
        </div>
      </div>

      {/* Basic Information */}

      <div className="form-block">

        <div className="form-block-title">
          <div>
            <h4>Basic Information</h4>
            <p>Employee identity and personal details</p>
          </div>
        </div>

        <div className="form-grid">

          <CustomTextInput
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            value={data.firstName || ""}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />

          <CustomTextInput
            label="Middle Name"
            name="middleName"
            placeholder="Enter middle name"
            value={data.middleName || ""}
            onChange={handleChange}
            autoComplete="additional-name"
          />

          <CustomTextInput
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            value={data.lastName || ""}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />

          <CustomTextInput
            label="Employee ID"
            name="employeeId"
            placeholder="Auto generated"
            value={data.employeeId || ""}
            onChange={handleChange}
            disabled
          />

          <CustomDropdown
            label="Gender"
            name="gender"
            options={genderOptions}
            value={data.gender || ""}
            onChange={handleChange}
            required
          />

          <CustomTextInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={data.dateOfBirth || ""}
            onChange={handleChange}
            required
          />

          <CustomDropdown
            label="Marital Status"
            name="maritalStatus"
            options={maritalStatusOptions}
            value={data.maritalStatus || ""}
            onChange={handleChange}
          />

          <CustomTextInput
            label="Nationality"
            name="nationality"
            placeholder="Enter nationality"
            value={data.nationality || ""}
            onChange={handleChange}
          />

        </div>
      </div>

      {/* Contact Information */}

      <div className="form-block">

        <div className="form-block-title">
          <div className="form-block-title-icon">
            <BsTelephoneFill />
          </div>

          <div>
            <h4>Contact Information</h4>
            <p>Employee communication details</p>
          </div>
        </div>

        <div className="form-grid">

          <CustomTextInput
            label="Mobile Number"
            type="tel"
            name="phone"
            placeholder="Enter mobile number"
            value={data.phone || ""}
            onChange={handleChange}
            required
            maxLength={10}
            autoComplete="tel"
          />

          <CustomTextInput
            label="Alternate Mobile"
            type="tel"
            name="alternatePhone"
            placeholder="Enter alternate number"
            value={data.alternatePhone || ""}
            onChange={handleChange}
            maxLength={10}
            autoComplete="tel"
          />

          <CustomTextInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={data.email || ""}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <CustomTextInput
            label="Personal Email"
            type="email"
            name="personalEmail"
            placeholder="Enter personal email"
            value={data.personalEmail || ""}
            onChange={handleChange}
            autoComplete="email"
          />

        </div>
      </div>

      {/* Address */}

      <div className="form-block">

        <div className="form-block-title">
          <div className="form-block-title-icon">
            <BsGeoAltFill />
          </div>

          <div>
            <h4>Address Information</h4>
            <p>Current residential address</p>
          </div>
        </div>

        <div className="form-grid">

          <div className="form-grid-full">
            <CustomTextInput
              label="Address"
              name="address"
              placeholder="Enter complete address"
              value={data.address || ""}
              onChange={handleChange}
              required
            />
          </div>

          <CustomTextInput
            label="City"
            name="city"
            placeholder="Enter city"
            value={data.city || ""}
            onChange={handleChange}
            required
          />

          <CustomTextInput
            label="State"
            name="state"
            placeholder="Enter state"
            value={data.state || ""}
            onChange={handleChange}
            required
          />

          <CustomTextInput
            label="Country"
            name="country"
            placeholder="Enter country"
            value={data.country || ""}
            onChange={handleChange}
            value={data.country || "India"}
            required
          />

          <CustomTextInput
            label="PIN Code"
            name="pinCode"
            placeholder="Enter PIN code"
            value={data.pinCode || ""}
            onChange={handleChange}
            maxLength={6}
            required
          />

        </div>
      </div>

      {/* Employment */}

      <div className="form-block">

        <div className="form-block-title">
          <div className="form-block-title-icon">
            <BsBriefcaseFill />
          </div>

          <div>
            <h4>Employment Information</h4>
            <p>Organization and employment details</p>
          </div>
        </div>

        <div className="form-grid">

          <CustomTextInput
            label="Joining Date"
            type="date"
            name="joiningDate"
            value={data.joiningDate || ""}
            onChange={handleChange}
            required
          />

          <CustomDropdown
            label="Employment Type"
            name="employmentType"
            options={employmentTypeOptions}
            value={data.employmentType || ""}
            onChange={handleChange}
            required
          />

          <CustomTextInput
            label="Department"
            name="department"
            placeholder="Select department"
            value={data.department || ""}
            onChange={handleChange}
            required
          />

          <CustomTextInput
            label="Designation"
            name="designation"
            placeholder="Enter designation"
            value={data.designation || ""}
            onChange={handleChange}
            required
          />

        </div>
      </div>

    </div>
  );
}

export default PersonalForm;