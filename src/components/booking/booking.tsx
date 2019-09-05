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

interface State {
  data: Data;
  date: Date;
  gdpr: boolean;
  booking: any;
  bookings: any;
  nameError: string;
  emailError: string;
  phone_numberError: string;
  gdprError: string;
  isShown: boolean;
  isDisable: boolean;
  bookingId: any;
  isFullyBooked: boolean;
}

interface IProps {
  bookingId: any;
}

class Booking extends React.Component<IProps, State> {
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
      gdprError: "",
      isShown: false,
      isDisable: true,
      bookingId: "0",
      isFullyBooked: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeBooking = this.completeBooking.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setDate = this.setDate.bind(this);
    this.validateDate = this.validateDate.bind(this);
  }

  handleDateChange = (date: any) => {
    if (
      this.state.booking.time === "0" ||
      this.state.booking.number_of_guests === "0"
    ) {
      alert("välj tid och gäster");
    } else {
      // Clear state
      this.setState({ isShown: false });

      this.setState({ date });
      this.setDate(date);
      this.validateDate();
    }
  };

  setDate(date: any) {
    this.setState(prevState => {
      let booking = Object.assign({}, prevState.booking);
      booking.date = moment(date).format("YYYY-MM-DD");
      return { booking };
    });
  }

  validateDate() {
    // Check if chosen date is later than today
    this.state.data.readData().then((result: any) => {
      if (this.state.booking.date < moment().format("YYYY-MM-DD")) {
        alert("Boka senare än idag");
      } else {
        if (result) {
          this.setState({ bookings: result.data.bookings });
          // If there is NOT, set empty array instead
        } else {
          this.setState({ bookings: [] });
        }

        this.isTableAvaiable();
      }
    });
  }

  isTableAvaiable = () => {
    const object = [];
    for (let i = 0; i < this.state.bookings.length; i++) {
      console.log(this.state.bookings.length);
      const element = this.state.bookings[i];

      if (
        element.date === this.state.booking.date &&
        element.time === this.state.booking.time
      ) {
        object.push(element);
      }
    }
    if (object.length < 1) {
      // Change isShown state to true to display input field
      this.setState({ isShown: true });
      // alert("tid finns");
    } else {
      this.setState({ isShown: false });
    }
  };

  handleInputChange(event: any) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const newName = target.name;

    this.setState(prevState => {
      let booking = Object.assign({}, prevState.booking);
      booking[newName] = value;
      return { booking };
    });

    this.setDate(this.state.date);
  }

  handleTimeChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const newName = target.name;

    this.setState(
      prevState => {
        let booking = Object.assign({}, prevState.booking);
        booking[newName] = value;
        return { booking };
      },
      () => {
        // Check if number of bookings is less than 15
        this.validateDate();
      }
    );
  };

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
        gdprError: "",
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

          // If there is NOT, set empty array instead
        } else {
          this.setState({ bookings: [] });
        }

        const object = [];

        for (let i = 0; i < this.state.bookings.length; i++) {
          console.log(this.state.bookings.length);
          const element = this.state.bookings[i];

          if (
            element.date === this.state.booking.date &&
            element.time === this.state.booking.time
          ) {
            object.push(element);
          }
        }
        if (object.length < 15 && this.state.gdpr === true) {
          this.state.data.createData(create_booking).then((result: any) => {
            console.log(result);
            this.setState({ bookingId: result.data.message });
            console.log(this.state.bookingId);
          });
          console.log(this.state.data);
        } else {
          console.log("error");
        }

        return <Redirect to="/confirmation" />;
      });
    }
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
    let gdprErrorToUpdate = "";

    // Name validation
    if (!this.state.booking.name.match(nameValidationPattern)) {
      nameErrorToUpdate = "Name måste.....";
    }

    // Email validation
    if (!this.state.booking.email.match(emailValidationPattern)) {
      emailErrorToUpdate = "Email måste.....";
    }

    // Phone_number validation
    if (!this.state.booking.phone_number.match(phone_numberValidationPattern)) {
      phone_numberErrorToUpdate = "Phone number måste.....";
    }

    // GDPR validation
    if (!this.state.gdpr === true) {
      gdprErrorToUpdate = "GDPR måste";
    }

    // Update states
    if (
      nameErrorToUpdate ||
      emailErrorToUpdate ||
      phone_numberErrorToUpdate ||
      gdprErrorToUpdate
    ) {
      this.setState({
        nameError: nameErrorToUpdate,
        emailError: emailErrorToUpdate,
        phone_numberError: phone_numberErrorToUpdate,
        gdprError: gdprErrorToUpdate
      });
      return false;
    }

    return true;
  };

  render() {
    console.log(this.state.bookingId);

    return (
      <>
        <main className="booking">
          <Navbar />
          <div className="wrapper">
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
                />
              </div>

              <div className="contacts">
                {this.state.isShown ? <p>Finns bordet</p> : null}
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
                    />
                  </label>
                  <br />
                  <label>
                    GDPR: <br />
                    <span className="error-message">
                      {this.state.gdprError}
                    </span>
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
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
export default Booking;
