import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { EmployeeProvider } from "./context/EmployeeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

<EmployeeProvider>

<App/>

</EmployeeProvider>

);