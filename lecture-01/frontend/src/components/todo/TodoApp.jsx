import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <> <Switch>
                        <Route path="/" exact="exact" component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                </>
            </Router>
        </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>Welcome {this.props.match.params.name}</div>
    }
}

function ErrorComponent() {
    return <div>An Error Occured. I don't know this URL</div>
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this
            .handleChange
            .bind(this);

        this.loginClicked = this
            .loginClicked
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        // dummy, dummy
        if (this.state.username === 'dummy' && this.state.password === 'dummy') {
            this
                .props
                .history
                .push(`/welcome/${this.state.username}`); // change the page
            // this.setState({showSuccessMessage: true, hasLoginFailed: false});
        } else {
            this.setState({showSuccessMessage: false, hasLoginFailed: true});
        }
    }

    render() {
        return (
            <div>
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name:
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}/>
                Password:
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }
}

export default TodoApp;