import React, { Component } from "react";
import Data from "../../service/data";
import IBooking from "../../interfaces/ibooking";

interface IConfirmationState{

}

interface IConfirmationProps{
  bookingId: string;
}

class Confirmation extends Component <IConfirmationProps, IConfirmationState> {
  constructor(props: IConfirmationProps) {
    super(props);

    this.state = {
    };

  }
  
  render() {
    
    return (
      <div>
        <h1>{this.props.bookingId}</h1>
      </div>
    )
  }
}

export default Confirmation;