import React, { useState } from "react";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  useCreateCompanyMutation,
} from "../../../features/company/companyApi";

import "./RegisterCompany.css";

const initialForm = {
  companyCode: "",
  companyName: "",
  legalName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  employeeLimit: 10,
  storageLimitMb: 1024,
};

const RegisterCompany = () => {
  const navigate = useNavigate();

  const [
    createCompany,
    {
      isLoading,
    },
  ] = useCreateCompanyMutation();

  const [formData, setFormData] =
    useState(initialForm);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.companyCode.trim()) {
      setErrorMessage(
        "Company code is required."
      );
      return;
    }

    if (!formData.companyName.trim()) {
      setErrorMessage(
        "Company name is required."
      );
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage(
        "Company email is required."
      );
      return;
    }

    try {
      const response =
        await createCompany({
          ...formData,

          companyCode:
            formData.companyCode
              .trim()
              .toUpperCase(),

          companyName:
            formData.companyName.trim(),

          legalName:
            formData.legalName.trim(),

          email:
            formData.email.trim(),

          phone:
            formData.phone.trim(),

          address:
            formData.address.trim(),

          city:
            formData.city.trim(),

          state:
            formData.state.trim(),

          employeeLimit:
            Number(
              formData.employeeLimit
            ),

          storageLimitMb:
            Number(
              formData.storageLimitMb
            ),
        }).unwrap();

      if (!response?.success) {
        setErrorMessage(
          response?.message ||
            "Unable to create company."
        );

        return;
      }

      setSuccessMessage(
        "Company registered successfully."
      );

      setTimeout(() => {
        navigate(
          "/super-admin/companies"
        );
      }, 700);

    } catch (error) {
      console.error(
        "Create Company Error:",
        error
      );

      setErrorMessage(
        error?.data?.message ||
          "Unable to create company."
      );
    }
  };

  return (
    <div className="register-company-page">

      {/* HEADER */}

      <div className="register-company-header">

        <button
          type="button"
          className="register-back-button"
          onClick={() =>
            navigate(
              "/super-admin/companies"
            )
          }
        >
          <FiArrowLeft />

          <span>
            Companies
          </span>
        </button>

        <div>
          <span className="register-eyebrow">
            COMPANY MANAGEMENT
          </span>

          <h1>
            Register company
          </h1>

          <p>
            Add a new company to your HRMS
            platform.
          </p>
        </div>

      </div>


      {/* FORM */}

      <form
        className="register-company-form"
        onSubmit={handleSubmit}
      >

        {/* BASIC */}

        <section className="register-section">

          <div className="register-section-header">

            <div className="register-section-icon">
              <FiBriefcase />
            </div>

            <div>
              <h2>
                Company information
              </h2>

              <p>
                Basic information about
                the organization.
              </p>
            </div>

          </div>


          <div className="register-grid">

            <div className="register-field">

              <label>
                Company code
                <span>*</span>
              </label>

              <input
                name="companyCode"
                value={
                  formData.companyCode
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. EXIM"
              />

            </div>


            <div className="register-field">

              <label>
                Company name
                <span>*</span>
              </label>

              <input
                name="companyName"
                value={
                  formData.companyName
                }
                onChange={
                  handleChange
                }
                placeholder="Enter company name"
              />

            </div>


            <div className="register-field register-full">

              <label>
                Legal name
              </label>

              <input
                name="legalName"
                value={
                  formData.legalName
                }
                onChange={
                  handleChange
                }
                placeholder="Registered legal name"
              />

            </div>

          </div>

        </section>


        {/* CONTACT */}

        <section className="register-section">

          <div className="register-section-header">

            <div className="register-section-icon">
              <FiMail />
            </div>

            <div>
              <h2>
                Contact information
              </h2>

              <p>
                How the company can
                be contacted.
              </p>
            </div>

          </div>


          <div className="register-grid">

            <div className="register-field">

              <label>
                Email
                <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="company@example.com"
              />

            </div>


            <div className="register-field">

              <label>
                Phone
              </label>

              <input
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                placeholder="Company phone number"
              />

            </div>

          </div>

        </section>


        {/* ADDRESS */}

        <section className="register-section">

          <div className="register-section-header">

            <div className="register-section-icon">
              <FiMapPin />
            </div>

            <div>
              <h2>
                Location
              </h2>

              <p>
                Company address and
                location details.
              </p>
            </div>

          </div>


          <div className="register-grid">

            <div className="register-field register-full">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                placeholder="Company address"
                rows={3}
              />

            </div>


            <div className="register-field">

              <label>
                City
              </label>

              <input
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                placeholder="City"
              />

            </div>


            <div className="register-field">

              <label>
                State
              </label>

              <input
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
                placeholder="State"
              />

            </div>


            <div className="register-field">

              <label>
                Country
              </label>

              <input
                name="country"
                value={
                  formData.country
                }
                onChange={
                  handleChange
                }
                placeholder="Country"
              />

            </div>

          </div>

        </section>


        {/* LIMITS */}

        <section className="register-section">

          <div className="register-section-header">

            <div className="register-section-icon">
              <FiUsersIcon />
            </div>

            <div>
              <h2>
                Initial limits
              </h2>

              <p>
                Temporary company limits.
                Subscription plans can update
                these later.
              </p>
            </div>

          </div>


          <div className="register-grid">

            <div className="register-field">

              <label>
                Employee limit
              </label>

              <input
                type="number"
                min="1"
                name="employeeLimit"
                value={
                  formData.employeeLimit
                }
                onChange={
                  handleChange
                }
              />

            </div>


            <div className="register-field">

              <label>
                Storage limit (MB)
              </label>

              <input
                type="number"
                min="1"
                name="storageLimitMb"
                value={
                  formData.storageLimitMb
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </div>

        </section>


        {/* MESSAGE */}

        {errorMessage && (
          <div className="register-error">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="register-success">

            <FiCheckCircle />

            <span>
              {successMessage}
            </span>

          </div>
        )}


        {/* ACTIONS */}

        <div className="register-actions">

          <button
            type="button"
            className="register-cancel"
            onClick={() =>
              navigate(
                "/super-admin/companies"
              )
            }
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="register-submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Creating..."
              : "Create company"}
          </button>

        </div>

      </form>

    </div>
  );
};


/*
 * Small local icon wrapper.
 * Keeps the section icon consistent without
 * adding another dependency.
 */
const FiUsersIcon = () => {
  return (
    <span className="register-users-icon">
      👥
    </span>
  );
};

export default RegisterCompany;