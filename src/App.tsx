import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";

import Admin from "./components/admin/admin";
import About from "./components/about/about";
import Booking from "./components/booking/booking";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/booking" component={Booking} />
        <Route component={Home} />
      </Switch>
    </>
  );
}

export default App;
