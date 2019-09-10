import Data from "../service/data";

export interface IBooking {
  booking_id: number;
  number_of_guests: number;
  date: string;
  email: string;
  time: string;
  name: string;
  phone_number: string;
}

export interface IBookingState {
    data: Data;
    date: Date;
    gdpr: boolean;
    booking: any;
    bookings: any;
    nameError: string;
    emailError: string;
    phone_numberError: string;
    isShown: boolean;
    isDisable: boolean;
    bookingId: any;
    isAvaiable: string;
    showConfirmation: boolean;
  }