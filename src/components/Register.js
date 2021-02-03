import axios from 'axios';
import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';

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
                    alert("Your account has been created.");
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
                <img className="mb-2 mx-auto" style={{display:"block"}} src="https://bppt.go.id/images/icons/logo-bppt20.png" />
                <br />
                {error}
                <div className="form-floating mb-3">
                    <label className="form-label" htmlFor="fullname">Name</label>
                    <input type="text" className="form-control" id="fullname" placeholder="Name" required autoFocus
                        onChange={(e) => this.name = e.target.value}></input>
                </div>
                
                <div className="form-floating mb-3">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" required
                        onChange={(e) => this.username = e.target.value}></input>
                </div>
                
                <div className="form-floating mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required
                        onChange={(e) => this.password = e.target.value}></input>
                </div>
                
                <div className="form-floating mb-3">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required
                        onChange={(e) => this.confirmPassword = e.target.value}></input>
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-block float-end">Sign up</button>
                    
                    <p className="text-center">
                        You have account? <Link to={"/login"} >Login here</Link>
                    </p>
                </div>
            </form>
        )
    }
}
