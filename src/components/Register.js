import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
    name = "";
    username = "";
    password = "";
    confirmPassword = "";
    state = {};
    
    handleSubmit = (e) => {
        e.preventDefault();

        //validate confirm password
        let isValid = this.isPasswordMatched(this.password, this.confirmPassword);

        if(!isValid) {
            this.setState({
                message: "Confirm password not matched!"
            });
            return false;
        }

        //submit data
        const data = {
            fullname: this.name,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword
        }

        axios.post("register-admin", data).then(
            res => {
                if(res.data.status) {
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("userid", res.data.data.user.userid);
                    this.setState({
                        user: res.data.data.user
                    });
                    this.props.setUser(res.data.data.user);
                }
                else {
                    this.setState({
                        message: "Something went wrong"
                    });
                }
            }
        ).catch(
            err => {
                console.log(err);
                this.setState({
                    message: "Something went wrong"
                });
            }
        )
    }

    isPasswordMatched = (password, confirmPassword) => {
        if(password !== confirmPassword) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        let error;

        if(this.state.user || this.props.user) {
            return <Redirect to={'/'}/>
        }

        if(this.state.message) {
            error = (
                <div className='alert alert-danger' role='alert'>
                    {this.state.message}
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <hr></hr>
                {error}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Name" required
                        onChange={(e) => this.name = e.target.value}></input>
                </div>
                
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
                
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" required
                        onChange={(e) => this.confirmPassword = e.target.value}></input>
                </div>

                <button className="btn btn-primary btn-block float-end">Sign up</button>
            </form>
        )
    }
}
