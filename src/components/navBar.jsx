import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user, darkMode, setDarkMode }) => {
  return (
    // <div className={darkMode ? "navbar navbar-expand-sm navbar navbar-darj bg-dark" : "navbar navbar-expand-sm navbar navbar-light bg-light"}>
    <nav className={darkMode ? "navbar navbar-expand-sm navbar navbar-darj bg-dark" : "navbar navbar-expand-sm navbar navbar-light bg-light"}>
      <div className="toggle-container">
        <Link className="navbar-brand" to="/">
          PROJECT-MOVIES
        </Link>
        <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
        <span className="toggle">
          <input
            checked={darkMode}
            onChange={() => setDarkMode(prevMode => !prevMode)}
            id="checkbox"
            className="checkbox"
            type="checkbox"
          />
          <label htmlFor="checkbox" />
        </span>
        <span style={{ color: darkMode ? "slateblue" : "grey" }}>☾</span>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          {user && (
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
          )}
          {user && (
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
          )}
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav >
  );
};

export default NavBar;
