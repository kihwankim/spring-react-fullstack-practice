import axios from 'axios';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get('http://localhost:8080/basicauth', {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        });
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        });
    }


    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password);
    }

    createJWTToken(token) {
        console.log('Bearer ' + token);
        return 'Bearer ' + token;
    } // token 형성


    registerSuccessfulLogin(username, password) {
        //const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosIntercepters(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosIntercepters(this.createJWTToken(token));
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) {
            return false;
        }

        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user === null) {
            return '';
        }

        return user;
    }

    setupAxiosIntercepters(token) {
        axios
            .interceptors
            .request
            .use((config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }

                return config;
            })
    }
}

export default new AuthenticationService();