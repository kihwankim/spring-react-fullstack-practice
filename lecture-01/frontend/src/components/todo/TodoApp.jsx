import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <> <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact="exact" component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route path="/todos" component={ListTodosComponent}/>
                        <Route path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </>
            </Router>
        </div>
        );
    }
}

class WelcomeComponent extends Component {
    render() {
        return <div>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}. You can mange your todos.
                <Link to="/todos">here</Link>
            </div>
        </div>
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    description: 'Learn React1',
                    done: false,
                    targetDate: new Date()
                }, {
                    id: 2,
                    description: 'Learn React2',
                    done: false,
                    targetDate: new Date()
                }, {
                    id: 3,
                    description: 'Learn React3',
                    done: false,
                    targetDate: new Date()
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this
                                    .state
                                    .todos
                                    .map(
                                        todo => <tr>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{
                                                    todo
                                                        .done
                                                        .toString()
                                                }</td>
                                            <td>
                                                {
                                                    todo
                                                        .targetDate
                                                        .toString()
                                                }
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function ErrorComponent() {
    return <div>An Error Occured. I don't know this URL</div>
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href="https://github.com/kihwankim" className="navbar-brand">kkh page</a>
                    </div>
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/welcome/dummy" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/todos" className="nav-link">Todos</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li>
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li>
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2020 kkh</span>
            </footer>
        );
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You are logout</h1>
                <div className="container">
                    Thank You for Using Our Application
                </div>
            </div>
        )
    }
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
            AuthenticationService.registerSuccessfulLogin(this.state.username);
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
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
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
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

export default TodoApp;