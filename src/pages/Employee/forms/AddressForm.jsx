import FormCard from "../../../components/FormCard/FormCard";
import FormGrid from "../../../components/FormGrid/FormGrid";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import CustomTextInput from "../../../components/CustomTextInput/CustomTextInput";

import { useEmployee } from "../../../context/EmployeeContext";

const AddressForm = () => {

const { employeeData, updateField } = useEmployee();

return (

<FormCard title="Address Information">

<SectionTitle title="Permanent Address"/>

<FormGrid>

<CustomTextInput
label="Permanent Address"
name="permanentAddress"
value={employeeData.permanentAddress}
onChange={updateField}
/>

<CustomTextInput
label="Current Address"
name="currentAddress"
value={employeeData.currentAddress}
onChange={updateField}
/>

<CustomTextInput
label="City"
name="city"
value={employeeData.city}
onChange={updateField}
/>

<CustomTextInput
label="State"
name="state"
value={employeeData.state}
onChange={updateField}
/>

<CustomTextInput
label="Country"
name="country"
value={employeeData.country}
onChange={updateField}
/>

<CustomTextInput
label="Pincode"
name="pincode"
value={employeeData.pincode}
onChange={updateField}
/>

</FormGrid>

</FormCard>

);

};

export default AddressForm;