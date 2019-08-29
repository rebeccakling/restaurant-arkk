import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import "./navbar.scss";

interface IState {
  menuBarOpen: boolean;
}
class Navbar extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      menuBarOpen: true
    };
  }

  toggleNavbar = () => {
    this.setState({ menuBarOpen: !this.state.menuBarOpen });
  };

  closeNavbar = () => {
    if (this.state.menuBarOpen === true) {
      this.toggleNavbar();
    }
  };

  render() {
    const display = this.state.menuBarOpen;
    const navbarDisplay = display ? `hide` : `show`;

    return (
      <header>
        <nav>
          <FaBars className="react-icon" onClick={this.toggleNavbar} />
          <ul className={`navbar ${navbarDisplay}`}>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/booking">BOKA BORD</a>
            </li>
            <li>
              <a href="/about">OM OSS</a>
            </li>
            <li>
              <a href="#">KONTAKT</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
export default Navbar;
