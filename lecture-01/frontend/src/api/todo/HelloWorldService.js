import axios from "axios";

class HelloWorldService {
    executeHellowService() {
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHellowBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHellowPathVariableService(name) {
        // const username = 'user';
        // const password = 'password';

        // const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);

        return axios.get(`http://localhost:8080/hello-world-bean-variables/${name}`
        // , {
        //     headers: {
        //         authorization: basicAuthHeader
        //     }
        // }
        );
    }
}

export default new HelloWorldService();