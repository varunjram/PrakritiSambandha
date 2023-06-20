import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleLogIn } from "../services";
import { useAuthentication } from "../context/AuthContext";
import { USER_LOGGED_IN } from "../reducers/AuthReducer";

function Login() {
  const { isLoggedIn, dispatch } = useAuthentication();
  const [form, setForm] = useState({ username: "", password: "" });
  const Location = useLocation();
  const Navigate = useNavigate();

  const setFormField = (e, field) => setForm({ ...form, [field]: e.target.value });

  const updateUserLogIn = (payload) => dispatch({ type: USER_LOGGED_IN, payload: payload });

  return (
    <div className="grid h-screen">
      <section className="col-6 p-0">
        <img
          src="https://cdn.pixabay.com/photo/2017/05/31/10/03/background-2359803_1280.jpg"
          alt="nature"
          className="w-full h-full"
        />
      </section>
      <section className="col-6 p-0 flex align-items-center justify-content-center">
        <div className="w-6 ">
          <img
            src="https://www.clipartkey.com/mpngs/m/196-1969111_yoga-green-png.png"
            alt="hyper"
            height={100}
            className=""
          />
          <h2 className="text-left mb-0"> Welcome to Prakritisambandha</h2>
          <p className="text-left mt-0 text-gray-500">Please go ahead and login below.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await handleLogIn(form, updateUserLogIn);
              response === 200 ? Navigate(Location?.state?.from) : alert("error");
              // submitHandler(e);
            }}>
            <label
              htmlFor="username"
              className="block text-900  mb-2 text-left">
              Username
            </label>
            <InputText
              value={form.email}
              id="username"
              type="text"
              onChange={(e) => setFormField(e, "username")}
              placeholder="Username"
              className="w-full mb-3"
              required
            />

            <div className="">
              <label
                htmlFor="password"
                className={`block text-900  mb-2 text-left`}>
                Password
              </label>

              <Password
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setFormField(e, "password")}
                toggleMask
                feedback={false}
                className={` w-full`}
                inputStyle={{ width: "100%" }}
              />
            </div>

            <Button
              type="submit"
              label="Sign In"
              icon="pi pi-user"
              className="w-full mt-5"
            />
            <Button
              type="submit"
              label="Guest Sign In"
              icon="pi pi-user"
              className="w-full mt-1 p-button-secondary"
              onClick={() => {
                setForm({ username: "adarshbalika", password: "adarshBalika123" });
              }}
            />
          </form>
          <div className="text-center mt-5 ">
            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
            <Link
              to="/signup"
              className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              Create today!
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
