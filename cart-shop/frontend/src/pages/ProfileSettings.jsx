import React, { useEffect, useState } from "react";
import ProfileSideBar from "../components/user/ProfileSideBar";
import ChangePassword from "../components/forms/ChangePasswordForm";
import UserProfileTab from "../components/tabs/UserProfileTab";
import { fetchLoggedInUserDetailsAPI } from "../services/apiCollection";
import toast from "react-hot-toast";

function ProfileSettings() {
  const [active, setActive] = useState(
    sessionStorage.getItem("activeTab") || "profile",
  );
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem("userDetail"));
  const [data, setData] = useState({});

  useEffect(() => {
    let loaduserDetails = async () => {
      let userData = await fetchLoggedInUserDetailsAPI();
      setData(userData);
      toast.success("user data loaded");
    };
    loaduserDetails();
  }, [active]);

  return (
    <div className="flex w-full  h-screen p-3">
      <ProfileSideBar
        user={loggedInUserDetails}
        active={active}
        setActive={setActive}
      />

      <div className=" flex-1 rounded-md">
        {active === "changePassword" && <ChangePassword />}
        {active === "profile" && <UserProfileTab setActive={setActive} user={data} setUser={setData} />}
      </div>
    </div>
  );
}

export default ProfileSettings;
