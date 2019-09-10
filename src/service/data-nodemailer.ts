const axios = require("axios");

class NodeMailer {
    sendMail(confirmation: any){
        return axios.post(
            "http://localhost:3001/send",confirmation
        )
        .catch((error: any) => {
            console.log(error);
        });
    }
}

export default NodeMailer;