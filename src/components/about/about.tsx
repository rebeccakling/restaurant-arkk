import React, { Component } from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

export default class About extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>
          <h1>About</h1>
        </div>
        <Footer />
      </>
    );
  }
}
