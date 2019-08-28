import React, { Component } from "react";
import "./booking.scss"
import Calendar from 'react-calendar'

import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

class Booking extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="box1">
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="box2">
            <select>
              <option value="18:00:00">18:00</option>
              <option value="21:00:00">21:00</option>
            </select>
          </div>
          <div className="box3">
            <Calendar />
          </div>
          <div className="box4">
            <form>
              <label>
                Name:<br/>
              <input type="text" name="name" />
              </label><br/>
              <label>
                Email:<br/>
              <input type="text" name="name" />
              </label><br/>
              <label>
                Phonenumber:<br/>
              <input type="text" name="name" />
              </label><br/>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default Booking;