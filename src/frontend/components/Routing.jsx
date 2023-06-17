import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import MockAPI from "./MockApi";
import Signup from "../pages/Signup";
import NotFound from "./NotFound";

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
        path="/*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default Routing;
