import React, { Component } from "react";
import Data from "../../service/data";
import IBooking from "../../interfaces/ibooking";

interface IConfirmationState{
  bookings: IBooking[];
}

class Confirmation extends Component <{}, IConfirmationState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bookings: [],

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
        // Get the latest booking

        // If there is NOT, set empty array instead
      } else {
        this.setState({ bookings: [] });
      }
    });
  }

  // latestBooking() {
  //   const latestBookingObject : IBooking[] = this.state.bookings.splice(-1).pop()
  //   const bookingId = latestBookingObject.booking_id 
  //   console.log(bookingId);

  // }

  test () {
  }
  
  render() {
    let bookings = this.state.bookings
    let latestBooking = bookings.pop();
    console.log(latestBooking);
    
    return (
      <div>
        {/* <button onCLick={this.latestBooking}> hejhej</button> */}
        {/* {this.state.bookings.map((bookings, index) => (
          <h1 key={index}>{bookings}</h1>
        ))} */}
        <h1>{latestBooking}</h1>
      </div>
    )
  }
}

export default Confirmation;