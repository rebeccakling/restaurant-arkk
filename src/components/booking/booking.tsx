import React from "react";
import "./booking.scss";
import Calendar from "react-calendar";
import moment from "moment";
import Data from "../../service/data";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { FaThemeisle } from "react-icons/fa";
import { throwStatement } from "@babel/types";
import Confirmation from "../confirmation/confirmation";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NodeMailer from "../../service/data-nodemailer";
import { IBookingState } from "./../../interfaces/ibooking";

class Booking extends React.Component<{}, IBookingState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: new Data(),
      date: new Date(),
      gdpr: false,
      booking: {
        number_of_guests: "0",
        date: moment().format("YYYY-MM-DD"),
        time: "0",
        name: "",
        email: "",
        phone_number: ""
      },
      bookings: [],
      nameError: "",
      emailError: "",
      phone_numberError: "",
      isShown: false,
      isDisable: true,
      bookingId: "0",
      isAvaiable: "",
      showConfirmation: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeBooking = this.completeBooking.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setDate = this.setDate.bind(this);
    this.validateDate = this.validateDate.bind(this);
    this.sendConfirmationMail = this.sendConfirmationMail.bind(this);
  }

  handleDateChange = (date: any) => {
    if (
      this.state.booking.time === "0" ||
      this.state.booking.number_of_guests === "0"
    ) {
      alert("välj tid och gäster");
    } else {
      this.setState({ date });
      this.setDate(date);
      this.validateDate();
    }
  };

  handleTimeChange = (event: any) => {
    this.setState(
      {
        booking: {
          ...this.state.booking,
          time: event.target.value
        }
      },
      () => {
        // Check if number of bookings is less than 15
        this.validateDate();
      }
    );
  };

  setDate(date: any) {
    this.setState(prevState => {
      let booking = Object.assign({}, prevState.booking);
      booking.date = moment(date).format("YYYY-MM-DD");
      return { booking };
    });
  }

  validateDate() {
    // Clear message
    this.setState({
      isAvaiable: ""
    });
    // Check if chosen date is later than today
    this.state.data.readData().then((result: any) => {
      if (result) {
        this.setState({ bookings: result.data.bookings });
        this.isTableAvaiable();
      } else {
        // If result is empty or error, set empty array instead
        this.setState({ bookings: [] });
        // // Show contact div
        this.setState({ isShown: true });
      }
    });
  }

  isTableAvaiable = () => {
    const object = [];
    for (let i = 0; i < this.state.bookings.length; i++) {
      const element = this.state.bookings[i];

      if (
        element.date === this.state.booking.date &&
        element.time === this.state.booking.time
      ) {
        object.push(element);
      }
    }
    if (object.length < 15) {
      // Change isShown state to true to display input field
      this.setState({ isShown: true });
    } else {
      // Hide contact div and show message
      this.setState({ isShown: false });
      this.setState({
        isAvaiable: "Fullbokat, vänligen kolla annan tid eller datum."
      });
      this.setState({ isDisable: true });
    }
  };

  handleInputChange(event: any) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => {
      let booking = Object.assign({}, prevState.booking);
      booking[name] = value;
      return { booking };
    });

    this.setDate(this.state.date);
  }

  handleGdprChange = (event: any) => {
    // Toggle button
    this.setState({ isDisable: !this.state.isDisable });

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ gdpr: value });
  };

  completeBooking(event: any) {
    event.preventDefault();

    const isValid = this.validate();

    if (isValid) {
      // Clear error state
      this.setState({
        nameError: "",
        emailError: "",
        phone_numberError: "",
        isDisable: false
      });

      let create_booking = {
        number_of_guests: parseInt(this.state.booking.number_of_guests),
        date: this.state.booking.date,
        time: this.state.booking.time,
        name: this.state.booking.name,
        email: this.state.booking.email,
        phone_number: this.state.booking.phone_number
      };

      this.state.data.readData().then((result: any) => {
        if (result) {
          this.setState({ bookings: result.data.bookings });
        } else {
          // If result is empty or error, set empty array instead
          this.setState({ bookings: [] });
        }

        const object = [];

        for (let i = 0; i < this.state.bookings.length; i++) {
          const element = this.state.bookings[i];
          if (
            element.date === this.state.booking.date &&
            element.time === this.state.booking.time
          ) {
            object.push(element);
          }
        }

        if (object.length < 15 && this.state.gdpr === true) {
          this.state.data
            .createData(create_booking)
            .then((result: any) => {
              this.setState({ bookingId: result.data.message });

              this.setState({ showConfirmation: true });

              this.sendConfirmationMail();
            })
            .catch((error: any) => {
              alert("Vänligen kontakta restaurang\nError:" + error);
            });
        }
      });
    }
  }

  sendConfirmationMail() {
    //Send a notification email of the new booking
    const confirmation = {
      name: this.state.booking.name,
      email: this.state.booking.email,
      date: this.state.booking.date,
      time: this.state.booking.time,
      bookingId: this.state.bookingId,
      subject: "Orderbekräftelse ARKK",
      openingMessage: "Tack för din bokning!",
      closingMessage: "Varmt Välkommen!"
    };

    const nodemailer = new NodeMailer();
    nodemailer.sendMail(confirmation);
  }

  // Form validation
  validate = () => {
    // Regex patterns
    const nameValidationPattern = /\w{2,}/;
    const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phone_numberValidationPattern = /^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/;

    // Define variables for error messages
    let nameErrorToUpdate = "";
    let emailErrorToUpdate = "";
    let phone_numberErrorToUpdate = "";

    // Name validation
    if (!this.state.booking.name.match(nameValidationPattern)) {
      nameErrorToUpdate = "Du måste ange ditt namn.";
    }

    // Email validation
    if (!this.state.booking.email.match(emailValidationPattern)) {
      emailErrorToUpdate = "E-mailadressen du angav verkar vara felaktig.";
    }

    // Phone_number validation
    if (!this.state.booking.phone_number.match(phone_numberValidationPattern)) {
      phone_numberErrorToUpdate = "Du måste ange ditt telefonnummer.";
    }

    // Update states
    if (nameErrorToUpdate || emailErrorToUpdate || phone_numberErrorToUpdate) {
      this.setState({
        nameError: nameErrorToUpdate,
        emailError: emailErrorToUpdate,
        phone_numberError: phone_numberErrorToUpdate
      });
      return false;
    }
    return true;
  };

  render() {
    if (this.state.showConfirmation) {
      return (
        <Redirect to={`/confirmation?bookingId=${this.state.bookingId}`} />
      );
    }

    return (
      <>
        <main className="booking">
          <div className="heroImageBooking"></div>
          <Navbar />
          <div className="wrapper">
            <h1>Boka bord här</h1>
            <div className="container">
              <div className="guests">
                <select
                  name="number_of_guests"
                  value={this.state.booking.number_of_guests}
                  onChange={this.handleInputChange}
                >
                  <option value="0" disabled selected>
                    GÄSTER
                  </option>
                  <option value="1">1 gäst</option>
                  <option value="2">2 gäster</option>
                  <option value="3">3 gäster</option>
                  <option value="4">4 gäster</option>
                  <option value="5">5 gäster</option>
                  <option value="6">6 gäster</option>
                </select>
              </div>
              <div className="time">
                <select
                  name="time"
                  value={this.state.booking.time}
                  onChange={this.handleTimeChange}
                >
                  <option value="0" disabled selected>
                    TID
                  </option>
                  <option value="18:00:00">18:00</option>
                  <option value="21:00:00">21:00</option>
                </select>
              </div>
              <div className="calendar">
                <h3>DATUM</h3>
                <Calendar
                  onChange={this.handleDateChange}
                  value={this.state.date}
                  minDate={new Date()}
                />
                <p className="error-message">{this.state.isAvaiable}</p>
              </div>

              {this.state.isShown ? (
                <div className="contacts">
                  <h3>KONTAKTUPPGIFTER</h3>
                  <form>
                    <label>
                      NAMN:
                      <br />
                      <span className="error-message">
                        {this.state.nameError}
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={this.state.booking.name}
                        onChange={this.handleInputChange}
                        placeholder="Namn"
                      />
                    </label>
                    <br />
                    <label>
                      E-POSTADRESS:
                      <br />
                      <span className="error-message">
                        {this.state.emailError}
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={this.state.booking.email}
                        onChange={this.handleInputChange}
                        placeholder="arkk@arkk.se"
                      />
                    </label>
                    <br />
                    <label>
                      MOBILTELEFON:
                      <br />
                      <span className="error-message">
                        {this.state.phone_numberError}
                      </span>
                      <input
                        type="text"
                        name="phone_number"
                        value={this.state.booking.phone_number}
                        onChange={this.handleInputChange}
                        placeholder="+4676XXXXXXX"
                      />
                    </label>
                    <br />
                    <label>
                      GDPR: <br />
                      <input
                        className="gdprCheckbox"
                        name="gdpr"
                        type="checkbox"
                        checked={this.state.booking.gdpr}
                        onChange={this.handleGdprChange}
                      />
                    </label>
                    <br />
                    <button
                      onClick={this.completeBooking}
                      disabled={
                        this.state.isDisable ||
                        !this.state.booking.name.length ||
                        !this.state.booking.email.length ||
                        !this.state.booking.phone_number
                      }
                    >
                      BOKA
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
export default Booking;
