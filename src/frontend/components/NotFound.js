import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Link
      to="/"
      className="w-full cursor-pointer">
      <img
        src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Page-and-a-Long-Walk.gif"
        alt="error-gif"
        className="w-full"
      />
    </Link>
  );
}

export default NotFound;
