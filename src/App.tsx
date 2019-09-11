import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Home from "./components/home/home";
import Admin from "./components/admin/admin";
import About from "./components/about/about";
import Booking from "./components/booking/booking";
import Confirmation from "./components/confirmation/confirmation";

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {

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
