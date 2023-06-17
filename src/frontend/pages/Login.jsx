import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const setFormField = (e, field) => setForm({ ...form, [field]: e.target.value });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post("/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      alert("success");
      if (status === 200) {
        console.log("data: ", data);
        localStorage.setItem("socialToken", JSON.stringify(data?.encodedToken));
        localStorage.setItem("socialUser", JSON.stringify(data?.foundUser));
      }
    } catch (error) {
      console.log("error: ", error);
      alert("error");
    }
  };

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
          <form onSubmit={submitHandler}>
            <label
              htmlFor="username"
              className="block text-900  mb-2 text-left">
              Username
            </label>
            <InputText
              value={form.email}
              id="username"
              type="text"
              onChange={(e) => setFormField(e, "email")}
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
