import { IBooking } from "./ibooking";

export interface IConfirmationProps {
  location: any;
}

export interface IConfirmationState {
  booking: IBooking;
  showConfirmation: boolean;
}
