import React from "react";
import { Route, Routes } from "react-router-dom";
import Bookmarks from "../pages/Bookmarks";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import SinglePost from "../pages/SinglePost";
import AuthWrapper from "./AuthWrapper";
import MockAPI from "./MockApi";
import NotFound from "./NotFound";

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
        path="/profile/:userName/:userId"
        element={<AuthWrapper children={<Profile />} />}
      />
      <Route
        path="/post/:postId"
        element={<AuthWrapper children={<SinglePost />} />}
      />
      <Route
        path="/*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default Routing;
