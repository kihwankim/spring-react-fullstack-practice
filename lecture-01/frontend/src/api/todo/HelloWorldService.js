import axios from "axios";

class HelloWorldService {
    executeHellowService() {
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHellowBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHellowPathVariableService(name) {
        return axios.get(`http://localhost:8080/hello-world-bean-variables/${name}`);
    }
}

export default new HelloWorldService();