import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useAppContext } from "../context/AppContext";
import { useAuthentication } from "../context/AuthContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import { USER_LOGGED_IN } from "../reducers/AuthReducer";
import { getAllUsers, handSignUp } from "../services";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    customInfo: {
      tags: ["Future", "Things", "Live on", "Brave", "Finish", "Real", "Exist", "Soul"],
      bio: "Add your Awesome Bio here",
      portfolioUrl: "MyPortfolio.com",
      avatar:
        "https://source.boringavatars.com/beam/120/Mary%20Edwards?colors=a7cd2c,bada5f,cee891,e1f5c4,50c8c6",
    },
  });
  const { dispatch } = useAuthentication();
  const { dispatch: AppDispatch } = useAppContext();

  const toast = useRef();

  const Navigate = useNavigate();
  const location = useLocation();
  const updateAppState = (key, value) =>
    AppDispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });

  const submitHandler = async (e) => {
    e.preventDefault();

    const updateUserLogIn = (payload) => dispatch({ type: USER_LOGGED_IN, payload: payload });

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
      const signUpResponse = await handSignUp(form);
      if (signUpResponse?.status === 201) {
        updateUserLogIn({
          user: signUpResponse?.data?.createdUser,
          token: signUpResponse?.data?.encodedToken,
        });
        getAllUsers(updateAppState);
        Navigate(location?.state?.from ?? "/");
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

            <form
              onSubmit={submitHandler}
              className="form-grid grid">
              {[
                {
                  field: "firstName",
                  placeholder: "Enter you first name",
                  label: "First Name",
                  colWidth: 6,
                },
                {
                  field: "lastName",
                  placeholder: "Enter you last name",
                  label: "Last Name",
                  colWidth: 6,
                },
                {
                  field: "username",
                  placeholder: "Enter you user name",
                  label: "User Name",
                  colWidth: 12,
                },
              ]?.map(({ field, placeholder, label, colWidth }) => (
                <div className={`col-${colWidth}`}>
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
                </div>
              ))}
              <div className="col-12">
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
              </div>

              <div className="col-6">
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
              <div className="col-6">
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
                    ...form,
                    firstName: "Thousand",
                    lastName: "Sunny",
                    email: "thousandSunny@gmail.com",
                    password: "guest",
                    confirmPassword: "guest",
                    username: "Sunny",
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
