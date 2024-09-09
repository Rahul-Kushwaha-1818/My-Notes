import React from "react";
import { getInitials } from "../../Utils/helper";

const Profile = ({ onLogout, userInfo }) => {
  return (
    <>
      <div className="flex gap-5 mr-3 justify-between items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 ">
          {getInitials(userInfo?.username)}
        </div>
        <div className="text-sm font-medium ">{userInfo?.username}</div>
        <button
          className="text-sm bg-red-500 px-3 py-1 rounded-md text-white hover:opacity-80"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
