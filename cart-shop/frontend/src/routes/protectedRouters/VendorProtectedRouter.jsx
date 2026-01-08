import { ArrowBigLeft, Lock } from "lucide-react";
import React from "react";
import UnauthorizedPage from "../../pages/authPages/UnauthorizedPage";

function VendorProtectedRouter({ children }) {
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem("userDetail"));
  console.log("details are ==>", loggedInUserDetails.role);

  if (loggedInUserDetails.role !== "vendor" || loggedInUserDetails.role !== "admin") {
    return (
      <UnauthorizedPage/>
    );
  }

  return <div>{children}</div>;
}

export default VendorProtectedRouter;
