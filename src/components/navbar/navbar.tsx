import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { INavbar } from "../../interfaces/inavbar";

class Navbar extends Component<{}, INavbar> {
  constructor(props: any) {
    super(props);

    this.state = {
      isClosed: true
    };
  }

  toggleNavbar = () => {
    this.setState({ isClosed: !this.state.isClosed });
  };

  render() {
    const display = this.state.isClosed;
    const navbarDisplay = display ? `hide` : `show`;

    return (
      <header>
        <nav>
          <FaBars className="react-icon" onClick={this.toggleNavbar} />
          <ul className={`navbar ${navbarDisplay}`}>
            <li>
              <NavLink to="/" exact>HOME</NavLink>
            </li>
            <li>
              <NavLink to="/booking">BOKA BORD</NavLink>
            </li>
            <li>
              <NavLink to="/about">OM OSS</NavLink>
            </li>
            <li>
              <NavLink to="/admin">KONTAKT</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Navbar;
