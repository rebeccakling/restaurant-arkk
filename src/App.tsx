import React from 'react';
import './App.scss';
import Data from './service/data';

let create_booking = {
  "number_of_guests": 6,
  "date": "2019-08-13",
  "time": "18:00:00",
  "name": "test",
  "email": "jafha@gmail.com",
  "phone_number": "0723423340"
}

let update_booking = {
  "booking_id": 32,
  "number_of_guests": 6,
  "date": "2019-08-13",
  "time": "21:00:00",
  "name": "test",
  "email": "jafha@gmail.com",
  "phone_number": "0723423340"
}

let delete_booking = {
  "booking_id": 32
}

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
      <div>
        {/* <button onClick={d}>click</button> */}
      </div>
    );
  }
}

export default App;