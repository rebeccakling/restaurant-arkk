import React, { Component } from "react";
import "./navbar.scss";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">HOME</a>
            </li>
            <li className="pointer">BOKA BORD</li>
            <li>
              <a href="/about">OM OSS</a>
            </li>
            <li>
              <a href="/">KONTAKT</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
