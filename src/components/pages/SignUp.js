import React, {Component} from 'react';
// import {browserHistory as history} from 'react-router';
import auth from '../../auth'
import './SignUp.css';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

        console.log("UserName " + this.refs.email.value, "Password " + this.refs.password.value);
        // fetch(`https://private-aa273-dashboardlyfrontend1.apiary-mock.com/auth/users`, {

        let {email: {value: email}, password: {value: password}} = this.refs;
        if (email && password) {
            auth.signup(email, password)
                .then(res => this.props.router.push('/login'))
                .catch(console.error)
        }
        else {
            this.setState({error: "Please enter an email and password"})
        }
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit}>
                <input ref="email" type="text"></input>
                <input ref="password" type="password"></input>
                <button>SignUp</button>
            </form>
        );
    }
}
