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
      this.setAdminStates(result);
    });
  }

  // Set states
  setAdminStates = (bookings: any) => {
    this.setState({ bookings: bookings.data.bookings });
    console.log(this.state.bookings);
  };

  removeBooking = (booking_id: number) => {
    // Create parameter for delete method
    let delete_booking = {
      booking_id: booking_id
    };

    // Instantiate for api connection and run delete method
    let data = new Data();
    data.deleteData(delete_booking);

    // Read updated database
    this.getBooking();
  };

  render() {
    const hasBooking = this.state.bookings;
    return (
      <main className="admin">
        <div className="container">
          <div className="title-container">
            <h1>Booking Lista/Admin</h1>
          </div>

          <div className="booking-list-container">
            {/* Show table if there is booking */}
            {hasBooking ? (
              <table>
                <tbody>
                  <tr>
                    {/* Table header */}
                    <th className="list-header">ID</th>
                    <th className="list-header">Datum</th>
                    <th className="list-header">Tid</th>
                    <th className="list-header">Namn</th>
                    <th className="list-header">E-post</th>
                    <th className="list-header">Antal</th>
                    <th className="list-header">Update</th>
                    <th className="list-header">Ta bort</th>
                    {/* Table row */}
                  </tr>
                  {this.state.bookings.map(bookings => (
                    <tr key={bookings.booking_id}>
                      <td className="list-header">{bookings.booking_id}</td>
                      <td className="list-header">{bookings.date}</td>
                      <td className="list-data">{bookings.time}</td>
                      <td className="list-data">{bookings.name}</td>
                      <td className="list-data">{bookings.email}</td>
                      <td className="list-data">
                        <FaChevronCircleUp />
                        {bookings.number_of_guests}
                        <FaChevronCircleDown />
                      </td>
                      <td className="list-data"></td>
                      <td className="list-data">
                        <FaTrash
                          className="admin-icon"
                          onClick={() =>
                            this.removeBooking(bookings.booking_id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Show message instead of table if there is no booking
              <p>There is no booking yet.</p>
            )}
          </div>

          <div className="link-container">
            <Link to="/" className="button-main backToHome">
              back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

export default Admin;
