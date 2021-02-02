import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }

    render() {
        let home;
        let menu;

        if (this.props.user) {
            
            home = (<Link className="navbar-brand" to={"/"}>FC Admin Panel</Link>);
            menu = (
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link" onClick={this.handleLogout}>Logout</Link>
                    </li>
                </ul>
            );
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        {home}
                        {menu}
                    </div>
                </nav>
            </div>
        )
    }
}
