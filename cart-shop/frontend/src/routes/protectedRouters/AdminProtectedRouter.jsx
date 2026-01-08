import { ArrowBigLeft, Lock } from "lucide-react";
import React from "react";
import UnauthorizedPage from "../../pages/authPages/UnauthorizedPage";

function AdminProtectedRouter({ children }) {
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem("userDetail"));

  if (loggedInUserDetails.role !== "admin") {
    return (
      <UnauthorizedPage/>
    );
  }

  return <div>{children}</div>;
}

export default AdminProtectedRouter;
