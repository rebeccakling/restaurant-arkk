import React, { Component } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import "./home.scss"

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <h1>Home</h1>
          <button className="button-main">Test knapp</button>
        </div>
        <Footer />
      </>
    );
  }
}
