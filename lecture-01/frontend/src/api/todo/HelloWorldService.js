import axios from "axios";

class HelloWorldService {
    executeHellowService() {
        return axios.get('http://localhost:8080/hello-world');
    }
}

export default new HelloWorldService();