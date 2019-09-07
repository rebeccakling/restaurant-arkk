import React, { Component } from "react";
import "./confirmation.scss";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { RouteComponentProps } from "react-router-dom";


interface IConfirmationState{
  bookingId: any;
}

interface IConfirmationProps extends RouteComponentProps< {bookingId: string}>{
}

class Confirmation extends Component <IConfirmationProps, IConfirmationState> {
  constructor(props: IConfirmationProps) {
    super(props);
 
    //Parse the query from URL
    const params = new URLSearchParams(this.props.location.search)
    //Get the value so it can be used in state
    const bookingId = params.get("bookingId")
    
    this.state = {
      bookingId : bookingId,
    };
    
  }
  
  render() {
    
    return (
      <>
        <main className="confirmation">
          <div className="hero-img"></div>
          <Navbar />
          <div className="container">
            <h1>Ditt bokningnr är genomförd!</h1>
            <h1></h1>
          </div>
          <Footer />
        </main>
      </>
    )
  }
}

export default Confirmation;