import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Booking from "./booking";

Enzyme.configure({ adapter: new EnzymeAdapter() });

it("should render without error", () => {
  const wrapper = shallow(<Booking />);
  expect(wrapper.length).toBe(1);
});


it("should change Gdpr state", () => {
  const wrapper = shallow(<Booking />);

  //Check default state
  expect(wrapper.state("gdpr")).toBe(false);
  expect(wrapper.state("isShown")).toBe(false);

  //Change isShown state to true to display contact input field
  wrapper.instance().setState({
    isShown: true
  });
  //Check if state is updated
  expect(wrapper.state("isShown")).toBe(true);

  //Find checkbox 
  const toggle = wrapper.find('input[type="checkbox"]');
  expect(toggle).toHaveLength(1);

  //Change value of checkbox
  toggle.simulate("change", { target: { value: true } });

  //Check if state changed 
  expect(wrapper.state("gdpr")).toBe(true);
});