import axios from 'axios';
import React, { Component } from 'react'

export default class Login extends Component {
    
    urlLogin = "http://localhost:8183/web/login-admin";

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: this.username,
            password: this.password
        }

        axios.post(this.urlLogin, data).then(
            res => {
                alert(res.data.message);
                console.log(res.data.data.token);
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userid", res.data.data.user.userid);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <hr></hr>
                
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
