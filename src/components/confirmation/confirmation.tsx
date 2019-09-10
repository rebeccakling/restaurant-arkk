import React, { Component } from "react";
import "./confirmation.scss";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Data from "../../service/data";
import moment from "moment";
import {IConfirmationProps,IConfirmationState} from "./../../interfaces/iconfirmation"


class Confirmation extends Component <IConfirmationProps, IConfirmationState> {
  constructor(props: IConfirmationProps) {
    super(props);
 
    //Parse the query from URL
    const params = new URLSearchParams(this.props.location.search)
    //Get the value so it can be used in state
    const bookingId = params.get("bookingId")
    
    this.state = {
      bookingId : bookingId,
      booking: {
        number_of_guests: "0",
        date: moment().format("YYYY-MM-DD"),
        time: "0",
        name: "",
        email: "",
      },
      bookings : [],
    };
    
  }

  componentDidMount() {
    this.getBooking();
  }

  // Fetch bookings from database
  getBooking() {
    // Instantiate for api connection and run read method
    let data = new Data();
    data.readData().then((result: any) => {
      // If there is a result from database update setate with the result
      if (result) {
        this.setState({ bookings: result.data.bookings });
        this.getLatestBooking();
        // If there is NOT, set empty array instead
      } else {
        this.setState({ bookings: [] });
      }
    });
  }

  getLatestBooking () {
    let latestBooking = this.state.bookings.pop();
    let bookings = this.setState({ booking: latestBooking})

    return bookings
  }
  
  render() {
    
    return (
      <>
        <main className="confirmation">
          <div className="hero-img"></div>
          <Navbar />
          <div className="container">
          <div className="info-confirm">
            <h1>Tack {this.state.booking.name} för din bokning.</h1>

            <p>Det har nu skickats en orderbekräftelse till <strong>{this.state.booking.email}</strong></p>
            <p>Ert bokningsnummer: {this.state.bookingId}</p>
            <p>Ni har bokat bord för {this.state.booking.number_of_guests} pers.</p>
            <p>Varm välkoman till oss {this.state.booking.date} kl: {this.state.booking.time}.</p>
           
            <h3>Vid avbokning eller ändring av bokningen vänligen kontakta oss på mail <a href="eat@restaurangarkk.se">eat@restaurangarkk.se</a> eller på telefon 08-121 421 60</h3>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }
}

export default Confirmation;