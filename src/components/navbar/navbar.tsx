import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import "./navbar.scss";

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
