import React, { Component } from "react";
import "./confirmation.scss";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { RouteComponentProps } from "react-router-dom";
import IBooking from "../../interfaces/ibooking";
import Data from "../../service/data";
import moment from "moment";


interface IConfirmationState{
  bookingId: any;
  booking: any;
  bookings: IBooking[];
}

interface IConfirmationProps extends RouteComponentProps< {bookingId: string}>{
}

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
        phone_number: ""
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
            <h1>Tack {this.state.booking.name} din bokning är nu genomförd!</h1>
            <p>Ni är välkommna till oss den {this.state.booking.date} kl: {this.state.booking.time}</p>
            <h2>Vid avbokning eller ändring av bokning vänligen kontakta oss och ange ditt bokningsnr: {this.state.bookingId}</h2>
          </div>
          <Footer />
        </main>
      </>
    )
  }
}

export default Confirmation;