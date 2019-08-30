import React, { Component } from "react";
import "./footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer" role="footerInfo">

        <div className="box1">
          <h2>ÖPPETTIDER</h2>
          <p>Mon-Thu: <time>18.:00 - 23:00</time></p>
          <p>Wed-Sun: <time>18:00 - 00:00</time></p>
          <hr />
        </div>
        <div className="box2">
          <h2>ADRESS</h2>
          <address>Humlegårdsgatan 17</address>
          <address>113 53 Stockholm,Sweden </address>
          <hr />
        </div>
        <div className="box3">
          <h2>KONTAKT</h2>
          <address>08-121 421 60</address>
          <address><a href="info@malina.se">eat@restaurangarkk.se</a></address>
          <hr />
        </div>
        <div className="box4">
          <h2>FÖLJ OSS</h2>
          <p><a href="facebook.com">Facebook</a></p>
          <p><a href="instagram.com">Instagram</a></p>
          <hr />
        </div>
        <div className="box5">
          <p>&copy;ARKK 2019</p>
        </div>

      </footer>
    );
  }
}
