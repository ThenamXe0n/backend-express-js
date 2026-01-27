import React, { useState } from "react";
import ProfileSideBar from "../components/user/ProfileSideBar";
import ChangePassword from "../components/forms/ChangePasswordForm";

function ProfileSettings() {
  const [active, setActive] = useState("profile");
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem("userDetail"));
  return (
    <div className="flex w-full  h-screen p-3">
      <ProfileSideBar
        user={loggedInUserDetails}
        active={active}
        setActive={setActive}
      />

      <div className=" flex-1 rounded-md">
        {active === "changePassword" && <ChangePassword/>}
        {active === "profile"   && <h1>this is profile page</h1>}
      </div>
    </div>
  );
}

export default ProfileSettings;
