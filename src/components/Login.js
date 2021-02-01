import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {};

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: this.username,
            password: this.password
        }

        axios.post('login-admin', data).then(
            res => {
                if (res.data.status) {
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("userid", res.data.data.user.userid);

                    this.setState({
                        'user': res.data.data.user
                    });

                    this.props.setUser(res.data.data.user);
                }
                else {
                    this.setState({
                        message: "Wrong username/password"
                    });
                }
            }
        ).catch(
            err => {
                this.setState({
                    message: "Something went wrong"
                });
            }
        )
    }

    render() {
        let error;

        if (this.state.message) {
            error = (
                <div className='alert alert-danger' role='alert'>
                    {this.state.message}
                </div>
            );
        }

        if (this.state.user || this.props.user) {
            return <Redirect to={'/'} />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <hr></hr>
                {error}
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder="Username" required
                        onChange={(e) => this.username = e.target.value}></input>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" placeholder="Password" required
                        onChange={(e) => this.password = e.target.value}></input>
                </div>

                <button className="btn btn-primary btn-block float-end">Login</button>
            </form>
        )
    }
}
