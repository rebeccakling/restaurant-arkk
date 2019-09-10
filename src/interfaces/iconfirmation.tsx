import { RouteComponentProps } from "react-router";
import { IBooking } from "./ibooking";


export interface IConfirmationProps extends RouteComponentProps< {bookingId: string}>{
}

export interface IConfirmationState{
    bookingId: any;
    booking: any;
    bookings: IBooking[];
  }
