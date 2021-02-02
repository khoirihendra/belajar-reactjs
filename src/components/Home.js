import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Home extends Component {

    render() {

        if (this.props.user) {
            return (
                <div>
                    <h2 className="text-center">Welcome "{this.props.user.fullname}"</h2>
                    <hr></hr>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>

            );
        }

        return (
            <Redirect to={"/login"} />
        )
    }
}