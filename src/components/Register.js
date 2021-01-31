import axios from 'axios';
import React, { Component } from 'react'

export default class Register extends Component {
    name = "";
    username = "";
    password = "";
    confirmPassword = "";
    urlRegister = "http://localhost:8183/web/register-admin";
    
    handleSubmit = (e) => {
        e.preventDefault();

        //validate confirm password
        let isValid = this.isPasswordMatched(this.password, this.confirmPassword);

        if(!isValid) {
            return false;
        }

        //submit data
        const data = {
            fullname: this.name,
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword
        }

        axios.post(this.urlRegister, data).then(
            res => {
                alert(res.data.message);
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userid", res.data.data.user.userid);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    isPasswordMatched = (password, confirmPassword) => {
        if(password !== confirmPassword) {
            alert("Confirm password not matched!");
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>
                <hr></hr>

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
