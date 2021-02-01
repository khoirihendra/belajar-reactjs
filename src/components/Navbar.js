import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }

    render() {
        let menu;
        if (this.props.user) {
            menu = (
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link" onClick={this.handleLogout}>Logout</Link>
                    </li>
                </ul>
            );
        }
        else {
            menu = (
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/register"}>Sign up</Link>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to={"/"}>Home</Link>

                        {menu}
                    </div>
                </nav>
            </div>
        )
    }
}
