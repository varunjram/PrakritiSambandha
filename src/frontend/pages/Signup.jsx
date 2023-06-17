import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useContext, useState, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import { LOGIN } from "../reducers/userReducer";
import { Toast } from "primereact/toast";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useRef();

  const Navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const isFormFilled = Object.values(form).map((param) => Boolean(param));
    if (isFormFilled.some((param) => param === false)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "All fields are required to SignUp",
        life: 1000,
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password and Confirm-Password does not match",
        life: 1000,
      });
      return;
    }
    try {
      delete form.confirmPassword;
      const { status, data } = await axios.post("/api/auth/signup", form, {
        headers: { "Content-Type": "application/json" },
      });
      if (status === 201) {
        localStorage.setItem("userToken", JSON.stringify(data?.encodedToken));
        localStorage.setItem("foundUser", JSON.stringify(data?.createdUser));
        Navigate(location?.state?.from ?? "/products");
      }
    } catch (error) {
      console.error("data.foundUser - error: ", error);
    }
  };

  const setFormField = (field, e) => setForm({ ...form, [field]: e.target.value });
  return (
    <>
      <Toast
        ref={toast}
        // position="bottom-right"
      />
      <div className="flex w-full h-screen">
        <div className="flex align-items-center justify-content-center flex-grow-1 ">
          <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
            <div className="text-center mb-5">
              <img
                src="https://www.clipartkey.com/mpngs/m/196-1969111_yoga-green-png.png"
                alt="logo"
                height={100}
                className="mb-3"
              />
              <div className="text-900 text-3xl font-medium mb-3">Register Now!</div>
              <span className="text-600 font-medium line-height-3">Do you have an account?</span>

              <Link
                to="/login"
                className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                Login here!
              </Link>
            </div>

            <form onSubmit={submitHandler}>
              {[
                { field: "firstName", placeholder: "Enter you first name", label: "First Name" },
                { field: "lastName", placeholder: "Enter you last name", label: "Last Name" },
              ]?.map(({ field, placeholder, label }) => (
                <>
                  <label
                    htmlFor={field}
                    className="block text-900  mb-2">
                    {label}
                  </label>
                  <InputText
                    value={form[field]}
                    id={field}
                    type="text"
                    onChange={(e) => setFormField(field, e)}
                    placeholder={placeholder}
                    className="w-full "
                    required
                  />
                </>
              ))}
              <label
                htmlFor="email"
                className="block text-900 ">
                Email
              </label>
              <InputText
                value={form.email}
                id="email"
                type="text"
                onChange={(e) => setFormField("email", e)}
                placeholder="Email address"
                className="w-full mb-3"
                required
              />

              <div className="">
                <label
                  htmlFor="password"
                  className={`block text-900 `}>
                  Password
                </label>

                <Password
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={(e) => setFormField("password", e)}
                  toggleMask
                  feedback={false}
                  className={` w-full`}
                  inputStyle={{ width: "100%" }}
                />
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className={`block text-900 `}>
                  Confirm Password
                </label>

                <Password
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={(e) => setFormField("confirmPassword", e)}
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
                className="w-full mt-3"
                onClick={() => {
                  setForm({
                    firstName: "Thousand",
                    lastName: "Sunny",
                    email: "thousandSunny@gmail.com",
                    password: "guest",
                    confirmPassword: "guest",
                  });
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
