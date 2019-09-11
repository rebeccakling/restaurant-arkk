import React, { Component } from "react";
import "./confirmation.scss";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Data from "../../service/data";
import {IConfirmationProps,IConfirmationState} from "./../../interfaces/iconfirmation";
import { IBooking } from "../../interfaces/ibooking";
import { Redirect } from "react-router-dom";

class Confirmation extends Component<IConfirmationProps, IConfirmationState> {
  constructor(props: IConfirmationProps) {
    super(props);

    this.state = {
      booking: {
        booking_id: 0,
        number_of_guests: 0,
        date: "",
        email: "",
        time: "",
        name: "",
        phone_number: ""
      },
      showConfirmation: true
    };
  }

  componentDidMount() {
    this.getBooking();
  }

  // Fetch all bookings from database
  getBooking() {
    //Parse the query from URL
    const params = new URLSearchParams(this.props.location.search);
    //Get the value so it can be used in state
    const bookingId = params.get("bookingId");

    // Check if there is booking ID. If no ID update state to redirect, otherwise fetch booking data and store in state.
    if (!bookingId) {
      this.setState({ showConfirmation: false });
    } else {
      // Instantiate for api connection and run read method
      let data = new Data();
      data.readData().then((result: any) => {
        const booking: IBooking = result.data.bookings.find(
          (booking: any) => booking.booking_id === bookingId
        );
        if (!booking) {
          // If booking ID does not match any of booking in database update state to redirect
          this.setState({ showConfirmation: false });
        }
        this.setState({ booking: booking });
      });
    }
  }

  render() {
    // Redirect to home if there is no booking ID
    if (!this.state.showConfirmation) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <main className="confirmation">
          <div className="hero-image"></div>
          <Navbar />
          <div className="container">
            <div className="info-confirm">
              <h1>Tack {this.state.booking.name} för din bokning.</h1>

              <p>
                Det har nu skickats en orderbekräftelse till{" "}
                <strong>{this.state.booking.email}</strong>
              </p>
              <p>Ert bokningsnummer: {this.state.booking.booking_id}</p>
              <p>
                Ni har bokat bord för {this.state.booking.number_of_guests}{" "}
                pers.
              </p>
              <p>
                Varm välkoman till oss {this.state.booking.date} kl:{" "}
                {this.state.booking.time}.
              </p>

              <h3>
                Vid avbokning eller ändring av bokningen vänligen kontakta oss
                på mail{" "}
                <a href="mailto: eat@restaurangarkk.se">
                  eat@restaurangarkk.se
                </a>{" "}
                eller på telefon 08-121 421 60
              </h3>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Confirmation;
