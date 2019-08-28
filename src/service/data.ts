const axios = require("axios");

class Data {

    readData() {
        axios.get("http://localhost:8888/crud/read.php").then((result: any) => {
            console.log(result);
            return result;
        }).catch((error: any) => {
            console.log(error);
        })
    }

    createData(createData: any) {
        axios.post("http://localhost:8888/crud/create.php", createData, {
          headers: { 'Content-Type': 'text/plain' 
        }}).then((result: any) => {
          console.log(result);
          return result;
        }).catch((error: any) => {
          console.log(error);
        });
      }

    updateData(updateData: any) {
        axios.post("http://localhost:8888/crud/update.php", updateData, {
          headers: { 'Content-Type': 'text/plain' 
        }}).then((result: any) => {
          console.log(result);
          return result;
        }).catch((error: any) => {
          console.log(error);
        });
    }

    deleteData(deleteData: any) {
        axios.post("http://localhost:8888/crud/delete.php", deleteData, {
            headers: { 'Content-Type': 'text/plain' 
          }}).then((result: any) => {
            console.log(result);
            return result;
          }).catch((error: any) => {
            console.log(error);
          });
    }
}

export default Data;