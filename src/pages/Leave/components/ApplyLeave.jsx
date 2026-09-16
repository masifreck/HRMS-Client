import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsArrowLeft,
  BsCalendar3,
  BsCloudUpload,
  BsInfoCircle,
  BsPaperclip,
  BsSend,
  BsX,
} from "react-icons/bs";

import {
  leaveTypeOptions,
} from "./LeaveData";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import "./ApplyLeave.css";

const ApplyLeave = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    durationType: "Full Day",
    reason: "",
  });

  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock employees
  // Later this will come from API
  const employeeOptions = [
    {
      value: "EMP-1024",
      label: "Rahul Sharma - EMP-1024",
    },
    {
      value: "EMP-1023",
      label: "Priya Singh - EMP-1023",
    },
    {
      value: "EMP-1022",
      label: "Aman Verma - EMP-1022",
    },
    {
      value: "EMP-1021",
      label: "Neha Gupta - EMP-1021",
    },
    {
      value: "EMP-1020",
      label: "Arjun Kumar - EMP-1020",
    },
    {
      value: "EMP-1019",
      label: "Sneha Patel - EMP-1019",
    },
    {
      value: "EMP-1018",
      label: "Vikash Yadav - EMP-1018",
    },
    {
      value: "EMP-1017",
      label: "Anjali Mehta - EMP-1017",
    },
    {
      value: "EMP-1016",
      label: "Rohit Das - EMP-1016",
    },
    {
      value: "EMP-1015",
      label: "Pooja Sharma - EMP-1015",
    },
  ];

  const balanceData = {
    "Casual Leave": 8,
    "Sick Leave": 6,
    "Earned Leave": 12,
    "Unpaid Leave": 0,
    "Maternity Leave": 90,
    "Paternity Leave": 15,
  };

  const selectedBalance = useMemo(() => {
    if (!formData.leaveType) {
      return null;
    }

    return balanceData[formData.leaveType] ?? 0;
  }, [formData.leaveType]);

  const calculateDays = () => {
    if (!formData.fromDate || !formData.toDate) {
      return 0;
    }

    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);

    if (to < from) {
      return 0;
    }

    const difference = to.getTime() - from.getTime();

    const days =
      Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

    if (formData.durationType === "Half Day") {
      return 0.5;
    }

    return days;
  };

  const numberOfDays = calculateDays();

  useEffect(() => {
    if (
      formData.fromDate &&
      formData.toDate &&
      new Date(formData.toDate) < new Date(formData.fromDate)
    ) {
      setErrors((prev) => ({
        ...prev,
        toDate: "To date cannot be before from date",
      }));
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.toDate;
        return updated;
      });
    }
  }, [formData.fromDate, formData.toDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAttachment = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // 5 MB validation
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        attachment: "File size must be less than 5 MB",
      }));

      return;
    }

    setAttachment(file);

    setErrors((prev) => ({
      ...prev,
      attachment: "",
    }));
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee) {
      newErrors.employee = "Please select an employee";
    }

    if (!formData.leaveType) {
      newErrors.leaveType = "Please select leave type";
    }

    if (!formData.fromDate) {
      newErrors.fromDate = "Please select from date";
    }

    if (!formData.toDate) {
      newErrors.toDate = "Please select to date";
    }

    if (
      formData.fromDate &&
      formData.toDate &&
      new Date(formData.toDate) < new Date(formData.fromDate)
    ) {
      newErrors.toDate = "To date cannot be before from date";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please enter a reason";
    }

    if (numberOfDays <= 0) {
      newErrors.toDate = "Please select a valid leave duration";
    }

    if (
      selectedBalance !== null &&
      selectedBalance > 0 &&
      numberOfDays > selectedBalance
    ) {
      newErrors.toDate =
        `Available balance is only ${selectedBalance} days`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // ------------------------------------------------
    // API will be integrated here later
    // ------------------------------------------------

    const payload = {
      employeeId: formData.employee,
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      durationType: formData.durationType,
      numberOfDays,
      reason: formData.reason,
      attachment,
    };

    console.log("Apply Leave Payload:", payload);

    // Temporary mock submission
    setTimeout(() => {
      setIsSubmitting(false);

      alert("Leave request submitted successfully.");

      navigate("/leave");
    }, 800);
  };

  return (
    <div className="apply-leave-page">

      {/* Header */}
      <div className="apply-leave-header">

        <div className="apply-leave-header-left">

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/leave")}
          >
            <BsArrowLeft />
          </button>

          <div>
            <h1>Apply Leave</h1>
            <p>
              Submit a new leave request for an employee
            </p>
          </div>

        </div>

      </div>

      <form
        className="apply-leave-layout"
        onSubmit={handleSubmit}
      >

        {/* Main Form */}
        <div className="apply-leave-main">

          {/* Employee Section */}
          <div className="leave-form-card">

            <div className="leave-card-header">
              <div className="leave-card-icon employee-icon">
                <BsInfoCircle />
              </div>

              <div>
                <h2>Employee Information</h2>
                <p>
                  Select the employee applying for leave
                </p>
              </div>
            </div>

            <div className="leave-form-grid">

              <CustomDropdown
                label="Employee"
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                options={employeeOptions}
                required
                error={errors.employee}
              />

              <CustomDropdown
                label="Leave Type"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                options={leaveTypeOptions.filter(
                  (item) => item.value !== ""
                )}
                required
                error={errors.leaveType}
              />

            </div>

          </div>

          {/* Leave Details */}
          <div className="leave-form-card">

            <div className="leave-card-header">
              <div className="leave-card-icon calendar-icon">
                <BsCalendar3 />
              </div>

              <div>
                <h2>Leave Details</h2>
                <p>
                  Select the dates and duration of leave
                </p>
              </div>
            </div>

            <div className="leave-form-grid">

              <CustomTextInput
                label="From Date"
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
                error={errors.fromDate}
              />

              <CustomTextInput
                label="To Date"
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
                error={errors.toDate}
              />

            </div>

            {/* Duration */}
            <div className="duration-section">

              <label className="duration-label">
                Duration
                <span className="required">*</span>
              </label>

              <div className="duration-options">

                <label
                  className={`duration-option ${
                    formData.durationType === "Full Day"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="durationType"
                    value="Full Day"
                    checked={
                      formData.durationType === "Full Day"
                    }
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Full Day</strong>
                    <small>
                      Complete day leave
                    </small>
                  </span>
                </label>

                <label
                  className={`duration-option ${
                    formData.durationType === "Half Day"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="durationType"
                    value="Half Day"
                    checked={
                      formData.durationType === "Half Day"
                    }
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Half Day</strong>
                    <small>
                      Half day leave
                    </small>
                  </span>
                </label>

              </div>

            </div>

            {/* Days */}
            <div className="days-summary">

              <div>
                <span>Number of Leave Days</span>
                <strong>
                  {numberOfDays}{" "}
                  {numberOfDays === 1 ? "Day" : "Days"}
                </strong>
              </div>

              <div>
                <span>Available Balance</span>
                <strong>
                  {selectedBalance !== null
                    ? `${selectedBalance} Days`
                    : "--"}
                </strong>
              </div>

            </div>

          </div>

          {/* Reason */}
          <div className="leave-form-card">

            <div className="leave-card-header">
              <div className="leave-card-icon reason-icon">
                <BsInfoCircle />
              </div>

              <div>
                <h2>Leave Reason</h2>
                <p>
                  Provide a reason for this leave request
                </p>
              </div>
            </div>

            <div className="reason-field">

              <label>
                Reason
                <span className="required">*</span>
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter the reason for leave..."
                maxLength={500}
                rows={5}
                className={
                  errors.reason ? "textarea-error" : ""
                }
              />

              <div className="textarea-footer">

                {errors.reason ? (
                  <span className="field-error">
                    {errors.reason}
                  </span>
                ) : (
                  <span>
                    Maximum 500 characters
                  </span>
                )}

                <span>
                  {formData.reason.length}/500
                </span>

              </div>

            </div>

          </div>

          {/* Attachment */}
          <div className="leave-form-card">

            <div className="leave-card-header">
              <div className="leave-card-icon attachment-icon">
                <BsPaperclip />
              </div>

              <div>
                <h2>Attachment</h2>
                <p>
                  Attach supporting documents if required
                </p>
              </div>
            </div>

            <label className="upload-box">

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleAttachment}
              />

              <BsCloudUpload />

              <strong>
                Click to upload a file
              </strong>

              <span>
                PDF, JPG, PNG, DOC or DOCX • Max 5 MB
              </span>

            </label>

            {errors.attachment && (
              <span className="field-error">
                {errors.attachment}
              </span>
            )}

            {attachment && (
              <div className="attachment-preview">

                <div className="attachment-info">
                  <BsPaperclip />

                  <div>
                    <strong>
                      {attachment.name}
                    </strong>

                    <span>
                      {(attachment.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeAttachment}
                  className="remove-attachment"
                >
                  <BsX />
                </button>

              </div>
            )}

          </div>

          {/* Actions */}
          <div className="apply-leave-actions">

            <button
              type="button"
              className="cancel-leave-button"
              onClick={() => navigate("/leave")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-leave-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner" />
                  Submitting...
                </>
              ) : (
                <>
                  <BsSend />
                  Submit Leave Request
                </>
              )}
            </button>

          </div>

        </div>

        {/* Right Side */}
        <aside className="apply-leave-sidebar">

          {/* Balance Card */}
          <div className="leave-balance-card">

            <div className="balance-card-top">
              <div>
                <span>Leave Balance</span>
                <h3>
                  {selectedBalance !== null
                    ? selectedBalance
                    : "--"}
                </h3>
              </div>

              <BsCalendar3 />
            </div>

            <p>
              {formData.leaveType
                ? `${formData.leaveType} available balance`
                : "Select a leave type to view balance"}
            </p>

          </div>

          {/* Request Summary */}
          <div className="request-summary-card">

            <h3>Request Summary</h3>

            <div className="summary-row">
              <span>Employee</span>
              <strong>
                {formData.employee || "--"}
              </strong>
            </div>

            <div className="summary-row">
              <span>Leave Type</span>
              <strong>
                {formData.leaveType || "--"}
              </strong>
            </div>

            <div className="summary-row">
              <span>From</span>
              <strong>
                {formData.fromDate || "--"}
              </strong>
            </div>

            <div className="summary-row">
              <span>To</span>
              <strong>
                {formData.toDate || "--"}
              </strong>
            </div>

            <div className="summary-row">
              <span>Duration</span>
              <strong>
                {numberOfDays > 0
                  ? `${numberOfDays} ${
                      numberOfDays === 1 ? "Day" : "Days"
                    }`
                  : "--"}
              </strong>
            </div>

          </div>

          {/* Information */}
          <div className="leave-info-card">

            <div className="info-title">
              <BsInfoCircle />
              <h3>Important</h3>
            </div>

            <ul>
              <li>
                Leave requests are subject to approval.
              </li>

              <li>
                Make sure the selected dates are correct.
              </li>

              <li>
                Supporting documents can be attached if required.
              </li>

              <li>
                Leave balance will be checked before submission.
              </li>
            </ul>

          </div>

        </aside>

      </form>
    </div>
  );
};

export default ApplyLeave;