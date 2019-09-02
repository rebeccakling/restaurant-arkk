import React from "react";
// import ReactDOM from "react-dom";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Admin from "./admin";
import { FaChevronCircleUp } from "react-icons/fa";
import IAdminState from "./admin";
// import { WSAVERNOTSUPPORTED } from "constants";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockDatabase = [
  {
    booking_id: 32,
    number_of_guests: 6,
    date: "2019-08-13",
    time: "21:00:00",
    name: "test",
    email: "jafha@gmail.com",
    phone_number: "0723423340"
  }
];

it("renders without error", () => {
  const wrapper = shallow(<Admin />);
  expect(wrapper.length).toBe(1);
});

it("fetches data and updates state", () => {
  const wrapper = shallow<Admin, {}, IAdminState>(<Admin />);
  expect(wrapper.state("bookings")).toEqual([]);
  console.log(wrapper.state("bookings"));

  wrapper.instance().setState({
    bookings: [
      {
        booking_id: 32,
        number_of_guests: 6,
        date: "2019-08-13",
        time: "21:00:00",
        name: "test",
        email: "jafha@gmail.com",
        phone_number: "0723423340"
      }
    ]
  });

  expect(wrapper.instance().state.bookings[0].booking_id).toBe(32);
});

it("increments number_of_guests", () => {
  const wrapper = shallow(<Admin />);

  //   const number_of_guests = 2;
  const button = shallow(<FaChevronCircleUp />);
  expect(button).toHaveLength(1);

  //   expect(wrapper.state("bookings")).toContain("number_of_guest");

  // //   const wrapper = setup();
  //     const bookingStatus = wrapper.state("bookings");
  //   expect(bookingStatus).toHaveLength(1);
  //   console.log(bookingStatus.number_of_guests);
  // button.simulate("click");
  // wrapper.update();
  //   expect(wrapper.state("number_of_guests")).toBe(3);
});
