import React from "react";
import "./booking.scss"
import Calendar from 'react-calendar'
import moment from 'moment';
import Data from '../../service/data';
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

interface State {
  data: Data;
  date: Date;
  gdpr: boolean;
  booking: any;
  bookings: any;
}

class Booking extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      data: new Data(),
      date: new Date(),
      gdpr: false,
      booking: {
        number_of_guests: '0',
        date: moment(),
        time: '0',
        name: '',
        email: '',
        phone_number: '',
      },

      bookings: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeBooking = this.completeBooking.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setDate = this.setDate.bind(this);
  }


  handleDateChange = (date: any) => {
    this.setState({ date })
    this.setDate(date);
  }

  setDate(date: any) {
    this.setState(prevState => {
      let booking = Object.assign({}, prevState.booking);
      booking.date = moment(date).format('YYYY-MM-DD');
      return { booking };
    })
  }


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

  handleGdprChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ gdpr: value })
  }


  completeBooking(event: any) {
    event.preventDefault();

    let create_booking = {
      "number_of_guests": parseInt(this.state.booking.number_of_guests),
      "date": this.state.booking.date,
      "time": this.state.booking.time,
      "name": this.state.booking.name,
      "email": this.state.booking.email,
      "phone_number": this.state.booking.phone_number
    }

    this.state.data.readData().then((result: any) => {

      if (result) {
        this.setState({ bookings: result.data.bookings });
        // If there is NOT, set empty array instead
      } else {
        this.setState({ bookings: [] });
      }

      const object = [];

      for (let i = 0; i < this.state.bookings.length; i++) {
        console.log(this.state.bookings.length)
        const element = this.state.bookings[i];

        if(element.date === this.state.booking.date && element.time === this.state.booking.time){
          object.push(element)
        }
      }
      if(object.length < 15 && this.state.gdpr === true){
        this.state.data.createData(create_booking);
      }else{
        console.log("error")
      }
    });
  }

  render() {

    return (
      <>
        <main className="booking">
          <Navbar />
          <div className="wrapper">
            <div className="container">
              <div className="guests">
                <select name="number_of_guests" value={this.state.booking.number_of_guests}
                  onChange={this.handleInputChange}>
                  <option value="0" disabled selected>GÄSTER</option>
                  <option value="1">1 gäst</option>
                  <option value="2">2 gäster</option>
                  <option value="3">3 gäster</option>
                  <option value="4">4 gäster</option>
                  <option value="5">5 gäster</option>
                  <option value="6">6 gäster</option>
                </select>
              </div>
              <div className="time">
                <select name="time" value={this.state.booking.time}
                  onChange={this.handleInputChange}>
                  <option value="0" disabled selected>TID</option>
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
                <h3>KONTAKTUPPGIFTER</h3>
                <form>
                  <label>
                    NAMN:<br />
                    <input type="text" name="name"
                      value={this.state.booking.name}
                      onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    E-POSTADRESS:<br />
                    <input type="email" name="email"
                      value={this.state.booking.email}
                      onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    MOBILTELEFON:<br />
                    <input className="inp" type="text" name="phone_number"
                      value={this.state.booking.phone_number}
                      onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    GDPR: <br />
                    <input
                      className="gdprCheckbox"
                      name="gdpr"
                      type="checkbox"
                      checked={this.state.booking.gdpr}
                      onChange={this.handleGdprChange} />
                  </label><br />
                  <button onClick={this.completeBooking}>BOKA</button>
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