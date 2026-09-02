import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";

import { useEmployee } from "../../../context/EmployeeContext";

const maritalStatusOptions = [
  {
    value: "Single",
    label: "Single",
  },
  {
    value: "Married",
    label: "Married",
  },
  {
    value: "Divorced",
    label: "Divorced",
  },
  {
    value: "Widowed",
    label: "Widowed",
  },
];

const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const FamilyForm = () => {
  const { employeeData, updateField } = useEmployee();

  return (
    <>
      <FormCard title="Family Information">
        <SectionTitle title="Family Details" />

        <FormGrid>
          <CustomTextInput
            label="Father Name"
            name="familyFatherName"
            value={employeeData.familyFatherName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Mother Name"
            name="familyMotherName"
            value={employeeData.familyMotherName || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Marital Status"
            name="maritalStatus"
            options={maritalStatusOptions}
            value={employeeData.maritalStatus || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Spouse Name"
            name="spouseName"
            value={employeeData.spouseName || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Number of Children"
            type="number"
            name="childrenCount"
            value={employeeData.childrenCount || ""}
            onChange={updateField}
          />

          <CustomDropdown
            label="Blood Group"
            name="bloodGroup"
            options={bloodGroupOptions}
            value={employeeData.bloodGroup || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>

      <FormCard title="Emergency Contact">
        <SectionTitle title="Emergency Contact Details" />

        <FormGrid>
          <CustomTextInput
            label="Emergency Contact Person"
            name="emergencyContactPerson"
            value={employeeData.emergencyContactPerson || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Relationship"
            name="relationship"
            value={employeeData.relationship || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Mobile Number"
            name="emergencyMobile"
            value={employeeData.emergencyMobile || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Alternate Mobile"
            name="alternateMobile"
            value={employeeData.alternateMobile || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Email"
            type="email"
            name="emergencyEmail"
            value={employeeData.emergencyEmail || ""}
            onChange={updateField}
          />

          <CustomTextInput
            label="Address"
            name="emergencyAddress"
            value={employeeData.emergencyAddress || ""}
            onChange={updateField}
          />
        </FormGrid>
      </FormCard>
    </>
  );
};

export default FamilyForm;