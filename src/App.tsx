import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Data from "./service/data";

import "./App.scss";
import Home from "./components/home/home";

import Admin from "./components/admin/admin";
import About from "./components/about/about";
import Booking from "./components/booking/booking";
import Confirmation from "./components/confirmation/confirmation";

let create_booking = {
  number_of_guests: 6,
  date: "2019-08-13",
  time: "18:00:00",
  name: "test",
  email: "jafha@gmail.com",
  phone_number: "0723423340"
};

let update_booking = {
  booking_id: 32,
  number_of_guests: 6,
  date: "2019-08-13",
  time: "21:00:00",
  name: "test",
  email: "jafha@gmail.com",
  phone_number: "0723423340"
};

let delete_booking = {
  booking_id: 32
};

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const data = new Data();

    //data.readData();

    //data.createData(create_booking);

    //data.updateData(update_booking);

    //data.deleteData(delete_booking);

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/booking" component={Booking} />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
