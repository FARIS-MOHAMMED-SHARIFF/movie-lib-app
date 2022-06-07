import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    // nav("/login");
    window.location.replace("/login");
  };
  return (
    <div className="navbar">
      <div className="app_name">Movie Library</div>
      <div className="items">
        <NavLink className="link" exact activeClassName="active_class" to="/">
          Home
        </NavLink>
        <NavLink
          className="link"
          exact
          activeClassName="active_class"
          to="/search"
        >
          Search
        </NavLink>
        <NavLink
          className="link"
          exact
          activeClassName="active_class"
          to="/playlist"
        >
          Playlist
        </NavLink>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
