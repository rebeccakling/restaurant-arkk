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

  render() {
    // Instantiate for api connection
    const data = new Data();

    const read = data.readData();
    console.log(read);

    return (
      <main className="admin">
        <div className="container">
          <div className="title-container">
            <h1>Booking Lista/Admin</h1>
          </div>
          {/* List header */}
          {/* <div className="list-headers">
            <div className="list-header">
              <p className="header-title">ID</p>
            </div>
            <div className="list-header">
              <p className="header-title">Datum</p>
            </div>
            <div className="list-header">
              <p className="header-title">Tid</p>
            </div>
            <div className="list-header">
              <p className="header-title">Namn</p>
            </div>
            <div className="list-header">
              <p className="header-title">E-post</p>
            </div>
            <div className="list-header">
              <p className="header-title">Antal</p>
            </div>
            <div className="list-header">
              <p className="header-title">Update</p>
            </div>
            <div className="list-header">
              <p className="header-title">Ta bort</p>
            </div> */}
          <div className="booking-list-container">
            <table>
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
