import React from "react";
// import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Admin from "./admin";
import IAdminState from "./admin";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockDatabase = [
  {
    booking_id: 32,
    number_of_guests: 1,
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

  wrapper.instance().setState({
    bookings: mockDatabase
  });

  expect(wrapper.instance().state.bookings[0].booking_id).toBe(32);
});

it("increments number_of_guests", () => {
  const wrapper = shallow<Admin, {}, IAdminState>(<Admin />);
  wrapper.instance().setState({
    bookings: mockDatabase
  });

  const button = wrapper.find(".increment");
  expect(button).toHaveLength(1);

  expect(wrapper.instance().state.bookings[0].number_of_guests).toBe(1);
  button.simulate("click");
  expect(wrapper.instance().state.bookings[0].number_of_guests).toBe(2);
});

it("decrements number_of_guests", () => {
  const wrapper = shallow<Admin, {}, IAdminState>(<Admin />);
  wrapper.instance().setState({
    bookings: [
      {
        booking_id: 32,
        number_of_guests: 1,
        date: "2019-08-13",
        time: "21:00:00",
        name: "test",
        email: "jafha@gmail.com",
        phone_number: "0723423340"
      }
    ]
  });

  const button = wrapper.find(".decrement");
  expect(button).toHaveLength(1);

  console.log(wrapper.state("bookings"));
  expect(wrapper.instance().state.bookings[0].number_of_guests).toBe(1);
  button.simulate("click");
  expect(wrapper.instance().state.bookings[0].number_of_guests).toBe(0);
});

it("fetches data", () => {
  const response = { bookings: mockDatabase };

  jest.fn().mockResolvedValue(() => Promise.resolve(response));

  expect(response.bookings).toEqual(mockDatabase);
});
