import React, { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Profile from "../Cards/Profile";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../../Redux/user/userSlice";
import axios from "axios";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());

      const res = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},

        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(error);
        dispatch(signoutFailure(res.data.message));
      }

      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(signoutFailure(error.message));
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="bg-white flex justify-between items-center px-6 py-2 drop-shadow-md">
        <div className="text-xl font-bold text-slate-950">
          <Link to="/">
            MY <span className="text-gray-500">NOTES</span>
          </Link>
        </div>
        <div>
          <Searchbar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
        <div>
          <Profile userInfo={userInfo} onLogout={onLogout} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
