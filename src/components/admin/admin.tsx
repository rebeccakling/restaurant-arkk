import React, { Component } from "react";
import "./admin.scss";
import { Link } from "react-router-dom";
import Data from "../../service/data";
import IBooking from "../../interfaces/ibooking";
import {
  FaTrash,
  FaChevronCircleUp,
  FaChevronCircleDown
} from "react-icons/fa";
import axios from "axios";

interface IAdminState {
  bookings: IBooking[];
}
class Admin extends Component<{}, IAdminState> {
  constructor(props: any) {
    super(props);

    this.state = {
      bookings: []
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
        // If there is NOT, set empty array instead
      } else {
        this.setState({ bookings: [] });
      }
    });
  }

  // Decrement state of number_of_guests in database
  decrement = (id: number) => {
    let tempBookings: IBooking[] = [...this.state.bookings];
    let bookingToUpdate = tempBookings.find(
      booking => booking.booking_id === id
    );

    // Decrement a number of guests only if it is more than 0, otherwise do nothing
    if (bookingToUpdate!.number_of_guests > 0) {
      bookingToUpdate!.number_of_guests--;
    }

    this.setState({
      bookings: [...tempBookings]
    });
  };

  // Increment state of number_of_guests
  increment = (id: number) => {
    let tempBookings: IBooking[] = [...this.state.bookings];
    let bookingToUpdate = tempBookings.find(
      booking => booking.booking_id === id
    );

    // Decrement a number of guests only if it is more than 0
    if (bookingToUpdate!.number_of_guests < 6) {
      bookingToUpdate!.number_of_guests++;
      // Otherwise show an error message
    } else {
      window.alert("max of number of guests at one booking is 6.");
    }

    this.setState({
      bookings: [...tempBookings]
    });
  };

  // Update a booking in database
  updateBooking = (id: number) => {
    let bookingToUpdate = this.state.bookings.find(
      booking => booking.booking_id === id
    );

    // Instantiate for api connection and run delete method
    let data = new Data();
    data.updateData(bookingToUpdate).then((result: any) => {
      // Read updated database
      this.getBooking();
      window.alert("A booking in database has been updated");
    });
  };

  // Remove a booking from database
  removeBooking = (booking_id: number) => {
    // Confirm if a user wants to delete
    let okToRemove = window.confirm("Are you sure?");

    if (okToRemove) {
      //Find the details of a selected booking and send a notification email of cancellation
      let bookingToDelete: any = this.state.bookings.find(
        booking => booking.booking_id === booking_id
      );
      axios
        .post(
          "http://localhost:3001/send",
          {
            name: bookingToDelete.name,
            email: bookingToDelete.email,
            date: bookingToDelete.date,
            time: bookingToDelete.time,
            bookingId: bookingToDelete.booking_id,
            subject: "Your booking has been cancelled",
            openingMessage: "We have cancelled the following booking.",
            closingMessage: "Tack!"
          }
          // { headers: { Accept: "application/json" } }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // Create parameter for delete method
    // Instantiate for api connection
    let delete_booking = {
      booking_id: booking_id
    };

    let data = new Data();
    // Run delete method
    data.deleteData(delete_booking).then(() => {
      // Read updated database
      this.getBooking();
    });
  };

  render() {
    const hasBooking = this.state.bookings.length;
    return (
      <main className="admin">
        <div className="container">
          <div className="title-container">
            <h1>Booking Lista/Admin</h1>
          </div>

          <div className="booking-list-container">
            {/* Show table if there is booking */}
            {hasBooking ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      {/* Table header */}
                      <th>ID</th>
                      <th>Datum</th>
                      <th>Tid</th>
                      <th>Namn</th>
                      <th>E-post</th>
                      <th>Antal</th>
                      <th>Ta bort</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {this.state.bookings.map(bookings => (
                      <tr key={bookings.booking_id}>
                        <td>{bookings.booking_id}</td>
                        <td>{bookings.date}</td>
                        <td>{bookings.time}</td>
                        <td>{bookings.name}</td>
                        <td>{bookings.email}</td>
                        <td className="list-center">
                          <FaChevronCircleDown
                            className="react-icon admin-icon decrement"
                            onClick={() => this.decrement(bookings.booking_id)}
                          />
                          {bookings.number_of_guests}
                          <FaChevronCircleUp
                            className="react-icon admin-icon increment"
                            onClick={() => this.increment(bookings.booking_id)}
                          />

                          <button
                            onClick={() =>
                              this.updateBooking(bookings.booking_id)
                            }
                          >
                            UPPDATERA
                          </button>
                        </td>
                        <td className="list-center">
                          <FaTrash
                            className="react-icon admin-icon booking-button"
                            onClick={() =>
                              this.removeBooking(bookings.booking_id)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Show message instead of table if there is no booking
              <p>
                Du saknar antingen database uppkoppling eller så finns ingen
                registrerade bokningar.
              </p>
            )}
          </div>

          <div className="link-container">
            <Link to="/" className="button-main">
              &#60;&#60;Startsida
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Admin;
