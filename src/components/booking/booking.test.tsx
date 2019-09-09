import React from "react";
// import ReactDOM from "react-dom";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Booking from "./booking";
import State from "./booking";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockDatabase = [
    {
      number_of_guests: 1,
      date: "2019-08-13",
      time: "21:00:00",
      name: "test",
      email: "jafha@gmail.com",
      phone_number: "0723423340"
    }
  ];

  it("renders without error", () => {
    const wrapper = shallow(<Booking />);
    expect(wrapper.length).toBe(1);
  });

  it("should change Gdpr", () => {
    const wrapper = shallow(<Booking />);
    
  // find button and click
  expect(wrapper.state("gdpr")).toBe(false);
  const input = wrapper.find('input[type="checkbox"]');
  console.log(input);
  expect(input).toHaveLength(1);
  input.simulate("change");
  // Check if state changed
  expect(wrapper.state("gdpr")).toBe(true);
  });


