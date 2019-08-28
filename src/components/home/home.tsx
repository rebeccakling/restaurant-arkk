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
          <h1>ARKK</h1>
          <h4>En unik smakupplevelse</h4>
          <button className="button-main">Meny</button>
        </div>
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse eos voluptate soluta minima praesentium tenetur in, nobis cum porro quisquam, hic harum aspernatur neque perferendis enim nihil veritatis facere nostrum.
          </p>
        </div>
        <Footer />
      </>
    );
  }
}
