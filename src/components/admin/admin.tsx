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
      // Create parameter for delete method
      let delete_booking = {
        booking_id: booking_id
      };

      // Instantiate for api connection and run delete method
      let data = new Data();
      data.deleteData(delete_booking);

      // Read updated database
      this.getBooking();
    }
  };

  render() {
    const hasBooking = this.state.bookings.length > 0;
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
                      <th className="list-header">ID</th>
                      <th className="list-header">Datum</th>
                      <th className="list-header">Tid</th>
                      <th className="list-header">Namn</th>
                      <th className="list-header">E-post</th>
                      <th className="list-header">Antal</th>
                      <th className="list-header">Ta bort</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {this.state.bookings.map(bookings => (
                      <tr key={bookings.booking_id}>
                        <td className="list-header">{bookings.booking_id}</td>
                        <td className="list-header">{bookings.date}</td>
                        <td className="list-data">{bookings.time}</td>
                        <td className="list-data">{bookings.name}</td>
                        <td className="list-data">{bookings.email}</td>
                        <td className="list-center">
                          <FaChevronCircleDown
                            className="react-icon admin-icon"
                            onClick={() => this.decrement(bookings.booking_id)}
                          />
                          {bookings.number_of_guests}
                          <FaChevronCircleUp
                            className="react-icon admin-icon"
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
                There is no booking yet or you have database connection problem.
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
