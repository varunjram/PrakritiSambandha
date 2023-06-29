import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import MockAPI from "./MockApi";
import Signup from "../pages/Signup";
import NotFound from "./NotFound";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Bookmarks from "../pages/Bookmarks";
import Profile from "../pages/Profile";
import AuthWrapper from "./AuthWrapper";

function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={<AuthWrapper children={<Home />} />}
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
      /
      <Route
        path="/explore"
        element={<AuthWrapper children={<Explore />} />}
      />
      <Route
        path="/bookmark"
        element={<AuthWrapper children={<Bookmarks />} />}
      />
      <Route
        path="/profile/:userName"
        element={<AuthWrapper children={<Profile />} />}
      />
      <Route
        path="/*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default Routing;
