import React, { Component } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <h1>Home</h1>
        </div>
        <Footer />
      </>
    );
  }
}
