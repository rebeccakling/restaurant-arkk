import React, { Component } from "react";
import "./admin.scss";
import { Link } from "react-router-dom";
import Data from "../../service/data";

interface IState {}

class Admin extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      // isOpen: true
    };
  }

  componentDidMount() {
    // this.getBooking();
  }

  getBooking = async () => {
    // Instantiate for api connection
    let data = new Data();

    let Kevin = data.readData();

    Kevin.then((result: any) => {
      console.log("From KEvin: ", result);
    });
  };

  render() {
    this.getBooking();
    return (
      <main className="admin">
        <div className="container">
          <div className="title-container">
            <h1>Booking Lista/Admin</h1>
          </div>
          {/* List header */}
          <div className="booking-list-container">
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
                <tr>
                  <td className="list-header">ID</td>
                  <td className="list-header">Datum</td>
                  <td className="list-data">Tid</td>
                  <td className="list-data">Namn</td>
                  <td className="list-data">E-post</td>
                  <td className="list-data">Antal</td>
                  <td className="list-data">Update</td>
                  <td className="list-data">Ta bort</td>
                </tr>
              </tbody>
            </table>
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
