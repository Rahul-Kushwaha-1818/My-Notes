import React, { useState } from "react";
import PasswordInput from "../../Components/Input/passwordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../Utils/helper";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Redux/user/userSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // Login API

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(error);
        dispatch(signInFailure(data.message));
      }

      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className=" w-96 border rounded px-8 py-10 bg-white">
          <form onSubmit={handleLogin}>
            <h3 className="text-2xl font-semibold mb-1">Login</h3>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              LOGIN
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-[#2B85FF] underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
