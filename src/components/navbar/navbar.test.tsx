import React from "react";
// import ReactDOM from "react-dom";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Navbar from "./navbar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props: any = {}, state: any = null) => {
  // Use the spread operator to thake this object and turn it into individual props
  const wrapper = shallow(<Navbar {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

it("renders without error", () => {
  const wrapper = setup();
  const navbarComponent = wrapper.find("nav");
  expect(navbarComponent.length).toBe(1);
});

it("toggle state for navbar starts with true", () => {
  const wrapper = setup();
  const initialMenuBarOpenState = wrapper.state("isOpen");
  expect(initialMenuBarOpenState).toBe(true);
});

it("hamburger button toggle true and false", () => {
  const wrapper = setup();
  //   const wrapper = setup(null, false);

  const initialMenuBarOpenState = wrapper.state("isOpen");

  // find button and click
  expect(initialMenuBarOpenState).toBe(true);
  const button = wrapper.find(".react-icon");
  expect(button).toHaveLength(1);
  button.simulate("click");
  // Check if state changed
  expect(wrapper.state("isOpen")).toBe(false);

  // const ulClassName = wrapper.find(".navbar").hasClass("show");
  // expect(ulClassName).toEqual(false);

  // //   // find display and test value
  // expect(ulClassName).toEqual(true);
});
