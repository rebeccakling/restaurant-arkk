import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

interface IState {
  isOpen: boolean;
}
class Navbar extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: true
    };
  }

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  closeNavbar = () => {
    if (this.state.isOpen === true) {
      this.toggleNavbar();
    }
  };

  render() {
    const display = this.state.isOpen;
    const navbarDisplay = display ? `hide` : `show`;

    return (
      <header>
        <nav>
          <FaBars className="react-icon" onClick={this.toggleNavbar} />
          <ul className={`navbar ${navbarDisplay}`}>
            <li>
              <NavLink to="/" exact>
                HOME
              </NavLink>
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
