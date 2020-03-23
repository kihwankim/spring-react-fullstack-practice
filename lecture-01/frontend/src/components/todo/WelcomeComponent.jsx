import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);
        this.retrieveWelcomeMessage = this
            .retrieveWelcomeMessage
            .bind(this);

        this.handleSuccessfulResponse = this
            .handleSuccessfulResponse
            .bind(this);
        this.state = {
            welcomeMessage: ''
        };
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. You can mange your todos.
                    <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Chick here to get a customized welcome message.
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div className='container'>
                    {this.state.welcomeMessage}
                </div>
            </div>
        );
    }

    retrieveWelcomeMessage() {
        HelloWorldService
            .executeHellowService()
            .then(response => this.handleSuccessfulResponse(response));
    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage: response.data});
    }
}

export default WelcomeComponent;