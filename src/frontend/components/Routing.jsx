import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import MockAPI from "./MockApi";
import Signup from "../pages/Signup";
import NotFound from "./NotFound";
import Home from "../pages/Home";

function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
        path="/mockman"
        element={<MockAPI />}
      />
      <Route
        path="/home"
        element={<Home />}
      />
      <Route
        path="/*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default Routing;
