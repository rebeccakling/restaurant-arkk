import React from "react";
import "./booking.scss"
import Calendar from 'react-calendar'
import moment from 'moment';
import Data from '../../service/data';


import Footer from "../footer/footer";

interface IBooking {
  number_of_guests: number;
  date: moment.Moment;
  time: string;
  name: string;
  email: string;
  phone_number: string;
}

interface State {
  date: Date,
  data: Data,
  booking: any;
}

class Booking extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      data: new Data(),
      booking: {
        number_of_guests: 0,
        date: moment(),
        time: '',
        name: '',
        email: '',
        phone_number: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.completeBooking = this.completeBooking.bind(this);
  }


  handleDateChange = (date: any) => {this.setState({ date })
  this.setState(prevState => {
    let booking = Object.assign({}, prevState.booking);
    booking.date = moment(this.state.date);
    return { booking };
  })
}

//   handleNameChange = (event: any) => {
//     let name = event.target.value;
//     this.setState(prevState => {
//       let booking = Object.assign({}, prevState.booking);
//       booking.name = name;
//       return { booking };
//     })
//   }

//   handleMailChange = (event: any) => {
//     let email = event.target.value;
//     this.setState(prevState => {
//       let booking = Object.assign({}, prevState.booking);
//       booking.email = email;              
//       return { booking };
//     })
//   }

//   handlePhoneChange = (event: any) => {
//     let phone = event.target.value;
//     this.setState(prevState => {
//       let booking = Object.assign({}, prevState.booking);
//       booking.phone_number = phone;
//       return { booking };
//     })
//   }

//   handleGuestChange = (event: any) => {
//     let guest = parseInt(event.target.value);
//     this.setState(prevState => {
//       let booking = Object.assign({}, prevState.booking);
//       booking.number_of_guests = guest;
//       return { booking };
//     })
//   }

//   handleTimeChange = (event: any) => {
//     let time = event.target.value;
//     this.setState(prevState => {
//       let booking = Object.assign({}, prevState.booking);
//       booking.time = time;
//       return { booking };
//     })
//   }


  handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const newName = target.name;

    this.setState(prevState => {
      let booking = Object.assign({}, prevState.booking);
      booking[newName] = value;
      return { booking };
    })
  }


  completeBooking(event: any) {
    event.preventDefault();

    let create_booking = {
      "number_of_guests": this.state.booking.number_of_guests,
      "date": this.state.booking.date.format('YYYY-MM-DD'),
      "time": this.state.booking.time,
      "name": this.state.booking.name,
      "email": this.state.booking.email,
      "phone_number": this.state.booking.phone_number
    }
    this.state.data.createData(create_booking);
  }

  render() {
    console.log(this.state.booking.name)
    console.log(this.state.booking.email)
    console.log(this.state.booking.phone_number)
    console.log(this.state.booking.time)
    console.log(this.state.booking.date)
    console.log(this.state.booking.number_of_guests)

    
    return (
      <>
      <main className="booking">
        <div className="wrapper">
          <div className="container">
            <div className="box1">
              <select value={this.state.booking.number_of_guests}
                  onChange={this.handleInputChange}>
                <option disabled selected hidden>Guests</option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
                <option value="6">6 guests</option>
              </select>
            </div>
            <div className="box2">
              <select value={this.state.booking.time}
                  onChange={this.handleInputChange}>
                <option disabled selected>Time</option>
                <option value="18:00:00">18:00</option>
                <option value="21:00:00">21:00</option>
              </select>
            </div>
            <div className="box3">
              <h3>Date</h3>
              <Calendar
                onChange={this.handleDateChange}
                value={this.state.date}
              />
            </div>
            <div className="box4">
              <h3>Contacts</h3>
              <form>
                <label>
                  Name:<br />
                  <input type="text" name="name" 
                  value={this.state.booking.name}
                  onChange={this.handleInputChange} />
                </label><br />
                <label>
                  Email:<br />
                  <input type="email" name="email" 
                  value={this.state.booking.email}
                  onChange={this.handleInputChange} />
                </label><br />
                <label>
                  Phonenumber:<br />
                  <input type="text" name="phone_number" 
                  value={this.state.booking.phone_number}
                  onChange={this.handleInputChange} />
                </label><br />
                <button onClick={this.completeBooking}>click</button>
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