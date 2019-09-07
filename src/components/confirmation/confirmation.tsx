import React, { Component } from "react";
import "./confirmation.scss";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { RouteComponentProps } from "react-router-dom";
import IBooking from "../../interfaces/ibooking";
import Data from "../../service/data";


interface IConfirmationState{
  bookingId: any;
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
      bookings : [],
    };
    
  }

  componentDidMount() {
    this.getBooking();
    console.log(this.state.bookings)
  }

  // Fetch bookings from database
  getBooking() {
    // Instantiate for api connection and run read method
    let data = new Data();
    data.readData().then((result: any) => {
      // If there is a result from database update setate with the result
      if (result) {
        this.setState({ bookings: result.data.bookings });
        // If there is NOT, set empty array instead
      } else {
        this.setState({ bookings: [] });
      }
    });
  }
  
  render() {
    
    return (
      <>
        <main className="confirmation">
          <div className="hero-img"></div>
          <Navbar />
          <div className="container">
            <h1>Din bokning är nu genomförd!</h1>

            <p>Ni är välkommna till oss den {} </p>
          </div>
          <Footer />
        </main>
      </>
    )
  }
}

export default Confirmation;