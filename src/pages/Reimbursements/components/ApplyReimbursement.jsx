import React, { useEffect, useRef, useState } from "react";
import {
  BsX,
  BsReceipt,
  BsPerson,
  BsCalendar3,
  BsCashStack,
  BsCreditCard,
  BsFileEarmarkText,
  BsPaperclip,
  BsCloudUpload,
  BsTrash,
  BsCheckCircle,
} from "react-icons/bs";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import {
  reimbursementEmployeeOptions,
  reimbursementTypeOptions,
  reimbursementPaymentModeOptions,
} from "./ReimbursementData";

import "./ApplyReimbursement.css";

const ApplyReimbursement = ({
  isOpen = false,
  reimbursement = null,
  onClose,
  onSubmit,
}) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    employeeId: "",
    reimbursementType: "",
    expenseDate: "",
    amount: "",
    paymentMode: "",
    description: "",
    remarks: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(reimbursement);

  /* =======================================================
     LOAD EDIT DATA
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (reimbursement) {
      setFormData({
        employeeId: reimbursement.employeeId || "",
        reimbursementType:
          reimbursement.reimbursementType || "",
        expenseDate: reimbursement.expenseDate || "",
        amount:
          reimbursement.amount !== undefined &&
          reimbursement.amount !== null
            ? String(reimbursement.amount)
            : "",
        paymentMode: reimbursement.paymentMode || "",
        description: reimbursement.description || "",
        remarks: reimbursement.remarks || "",
      });

      if (reimbursement.receiptAttached) {
        setSelectedFile({
          name:
            reimbursement.receiptName ||
            "Existing receipt",
          existing: true,
        });
      } else {
        setSelectedFile(null);
      }
    } else {
      setFormData({
        employeeId: "",
        reimbursementType: "",
        expenseDate: "",
        amount: "",
        paymentMode: "",
        description: "",
        remarks: "",
      });

      setSelectedFile(null);
    }

    setErrors({});
    setIsSubmitting(false);
  }, [isOpen, reimbursement]);

  /* =======================================================
     BODY SCROLL CONTROL
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* =======================================================
     HANDLE INPUT
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  /* =======================================================
     EMPLOYEE DETAILS
  ======================================================= */

  const selectedEmployee = reimbursementEmployeeOptions.find(
    (employee) => employee.value === formData.employeeId
  );

  /* =======================================================
     FILE VALIDATION
  ======================================================= */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        receipt:
          "Only PDF, JPG, PNG and WEBP files are allowed.",
      }));

      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setErrors((previous) => ({
        ...previous,
        receipt: "File size must not exceed 5 MB.",
      }));

      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    setErrors((previous) => ({
      ...previous,
      receipt: "",
    }));
  };

  /* =======================================================
     REMOVE FILE
  ======================================================= */

  const handleRemoveFile = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setErrors((previous) => ({
      ...previous,
      receipt: "",
    }));
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId) {
      newErrors.employeeId = "Please select an employee.";
    }

    if (!formData.reimbursementType) {
      newErrors.reimbursementType =
        "Please select an expense type.";
    }

    if (!formData.expenseDate) {
      newErrors.expenseDate =
        "Please select the expense date.";
    }

    if (!formData.amount) {
      newErrors.amount = "Please enter the expense amount.";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount =
        "Amount must be greater than zero.";
    }

    if (!formData.paymentMode) {
      newErrors.paymentMode =
        "Please select a payment mode.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Please provide an expense description.";
    }

    if (formData.description.trim().length < 10) {
      newErrors.description =
        "Description should contain at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...(reimbursement || {}),

      employeeId: formData.employeeId,

      employeeName:
        selectedEmployee?.employeeName || "",

      department:
        selectedEmployee?.department || "",

      reimbursementType:
        formData.reimbursementType,

      expenseDate:
        formData.expenseDate,

      amount:
        Number(formData.amount),

      paymentMode:
        formData.paymentMode,

      description:
        formData.description.trim(),

      remarks:
        formData.remarks.trim(),

      receiptAttached:
        Boolean(selectedFile),

      receiptName:
        selectedFile?.name || "",

      updatedOn:
        new Date().toISOString(),
    };

    try {
      if (typeof onSubmit === "function") {
        await onSubmit(
          payload,
          selectedFile
        );
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error(
        "Reimbursement submit error:",
        error
      );

      setErrors({
        submit:
          error?.message ||
          "Unable to submit reimbursement.",
      });

      setIsSubmitting(false);
    }
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="apply-reimbursement-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="apply-reimbursement-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-reimbursement-title"
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="apply-reimbursement-header">

          <div className="apply-reimbursement-header-left">

            <div className="apply-reimbursement-header-icon">
              <BsReceipt />
            </div>

            <div>
              <h2 id="apply-reimbursement-title">
                {isEditMode
                  ? "Edit Reimbursement"
                  : "Apply Reimbursement"}
              </h2>

              <p>
                {isEditMode
                  ? `Update ${reimbursement?.claimId || "claim"} details`
                  : "Submit a new reimbursement claim"}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="apply-reimbursement-close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            <BsX />
          </button>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="apply-reimbursement-form"
          onSubmit={handleSubmit}
        >

          <div className="apply-reimbursement-content">

            {/* =================================================
                EMPLOYEE SECTION
            ================================================= */}

            <section className="apply-reimbursement-section">

              <div className="apply-reimbursement-section-heading">

                <div className="apply-section-icon">
                  <BsPerson />
                </div>

                <div>
                  <h3>Employee Information</h3>

                  <p>
                    Select the employee submitting the claim
                  </p>
                </div>

              </div>

              <div className="apply-form-grid">

                <CustomDropdown
                  label="Employee"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  options={reimbursementEmployeeOptions}
                  required
                  error={errors.employeeId}
                />

                <div className="apply-readonly-field">

                  <label>
                    Department
                  </label>

                  <div className="apply-readonly-value">
                    {selectedEmployee?.department || (
                      <span>
                        Department will appear automatically
                      </span>
                    )}
                  </div>

                </div>

              </div>

              {selectedEmployee && (
                <div className="selected-employee-banner">

                  <div className="selected-employee-avatar">
                    {selectedEmployee.employeeName
                      .split(" ")
                      .map((name) => name.charAt(0))
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {selectedEmployee.employeeName}
                    </strong>

                    <span>
                      {selectedEmployee.value} •{" "}
                      {selectedEmployee.department}
                    </span>
                  </div>

                  <BsCheckCircle />
                </div>
              )}

            </section>

            {/* =================================================
                EXPENSE SECTION
            ================================================= */}

            <section className="apply-reimbursement-section">

              <div className="apply-reimbursement-section-heading">

                <div className="apply-section-icon">
                  <BsFileEarmarkText />
                </div>

                <div>
                  <h3>Expense Information</h3>

                  <p>
                    Enter details of the expense
                  </p>
                </div>

              </div>

              <div className="apply-form-grid">

                <CustomDropdown
                  label="Expense Type"
                  name="reimbursementType"
                  value={formData.reimbursementType}
                  onChange={handleChange}
                  options={reimbursementTypeOptions.filter(
                    (option) => option.value !== ""
                  )}
                  required
                  error={errors.reimbursementType}
                />

                <div className="apply-date-field">

                  <label htmlFor="expenseDate">
                    Expense Date
                    <span className="apply-required">
                      *
                    </span>
                  </label>

                  <div className="apply-date-wrapper">

                    <BsCalendar3 />

                    <input
                      id="expenseDate"
                      name="expenseDate"
                      type="date"
                      value={formData.expenseDate}
                      onChange={handleChange}
                      className={
                        errors.expenseDate
                          ? "apply-input apply-input-error"
                          : "apply-input"
                      }
                    />

                  </div>

                  {errors.expenseDate && (
                    <span className="apply-error-text">
                      {errors.expenseDate}
                    </span>
                  )}

                </div>

                <CustomTextInput
                  label="Expense Amount"
                  name="amount"
                  id="expenseAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  error={errors.amount}
                  maxLength={10}
                />

                <CustomDropdown
                  label="Payment Mode"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  options={reimbursementPaymentModeOptions.filter(
                    (option) => option.value !== ""
                  )}
                  required
                  error={errors.paymentMode}
                />

              </div>

              <div className="apply-full-width-field">

                <label
                  htmlFor="reimbursement-description"
                  className="apply-field-label"
                >
                  Expense Description
                  <span className="apply-required">
                    *
                  </span>
                </label>

                <textarea
                  id="reimbursement-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={500}
                  rows={4}
                  placeholder="Describe the expense and business purpose..."
                  className={
                    errors.description
                      ? "apply-textarea apply-input-error"
                      : "apply-textarea"
                  }
                />

                <div className="apply-textarea-footer">

                  {errors.description ? (
                    <span className="apply-error-text">
                      {errors.description}
                    </span>
                  ) : (
                    <span>
                      Provide a clear description for approval.
                    </span>
                  )}

                  <span>
                    {formData.description.length}/500
                  </span>

                </div>

              </div>

            </section>

            {/* =================================================
                RECEIPT SECTION
            ================================================= */}

            <section className="apply-reimbursement-section">

              <div className="apply-reimbursement-section-heading">

                <div className="apply-section-icon">
                  <BsPaperclip />
                </div>

                <div>
                  <h3>Supporting Document</h3>

                  <p>
                    Attach receipt or supporting expense document
                  </p>
                </div>

              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="apply-hidden-file-input"
                onChange={handleFileChange}
              />

              {!selectedFile ? (
                <button
                  type="button"
                  className="apply-upload-area"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >

                  <div className="apply-upload-icon">
                    <BsCloudUpload />
                  </div>

                  <strong>
                    Upload receipt or document
                  </strong>

                  <span>
                    Click to browse or select a file
                  </span>

                  <small>
                    PDF, JPG, PNG or WEBP • Maximum 5 MB
                  </small>

                </button>
              ) : (
                <div className="apply-selected-file">

                  <div className="apply-selected-file-icon">
                    <BsPaperclip />
                  </div>

                  <div className="apply-selected-file-info">
                    <strong>
                      {selectedFile.name}
                    </strong>

                    <span>
                      {selectedFile.existing
                        ? "Existing attachment"
                        : `${(
                            selectedFile.size /
                            1024 /
                            1024
                          ).toFixed(2)} MB`}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="apply-remove-file"
                    onClick={handleRemoveFile}
                    title="Remove attachment"
                  >
                    <BsTrash />
                  </button>

                </div>
              )}

              {errors.receipt && (
                <span className="apply-error-text apply-file-error">
                  {errors.receipt}
                </span>
              )}

            </section>

            {/* =================================================
                REMARKS
            ================================================= */}

            <section className="apply-reimbursement-section">

              <div className="apply-reimbursement-section-heading">

                <div className="apply-section-icon">
                  <BsCreditCard />
                </div>

                <div>
                  <h3>Additional Information</h3>

                  <p>
                    Add optional remarks for the approver
                  </p>
                </div>

              </div>

              <div className="apply-full-width-field">

                <label
                  htmlFor="reimbursement-remarks"
                  className="apply-field-label"
                >
                  Remarks
                </label>

                <textarea
                  id="reimbursement-remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  maxLength={300}
                  rows={3}
                  placeholder="Add any additional remarks..."
                  className="apply-textarea"
                />

                <div className="apply-textarea-footer">
                  <span>
                    Optional
                  </span>

                  <span>
                    {formData.remarks.length}/300
                  </span>
                </div>

              </div>

            </section>

            {/* Submit Error */}

            {errors.submit && (
              <div className="apply-submit-error">
                {errors.submit}
              </div>
            )}

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="apply-reimbursement-footer">

            <button
              type="button"
              className="apply-footer-btn cancel"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="apply-footer-btn submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="apply-submit-spinner" />
                  {isEditMode
                    ? "Updating..."
                    : "Submitting..."}
                </>
              ) : (
                <>
                  <BsCheckCircle />

                  {isEditMode
                    ? "Update Claim"
                    : "Submit Claim"}
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default ApplyReimbursement;