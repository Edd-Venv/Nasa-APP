import React from "react";
import Link from "./Link.js";

function Nav() {
  const navStyle = {
    color: "lightgrey"
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <h1 style={{ color: "brown", fontSize: "1.7em" }}>
          <big>
            <i>Welcome</i>
          </big>
        </h1>
        <ul className="nav-links " style={{ fontSize: "1.2em" }}>
          <Link
            exact
            to="https://edwinushibantu.netlify.com/"
            style={navStyle}
            activeStyle={{ color: "#595959" }}
            target="_self"
          >
            Home
          </Link>

          <Link
            exact
            to="https://github.com/Edd-Venv/React_Apps/tree/master/src
            "
            style={navStyle}
            activeStyle={{ color: "brown" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </ul>
      </nav>
    </div>
  );
}
export default Nav;
