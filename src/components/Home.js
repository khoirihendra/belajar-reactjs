import axios from 'axios'
import React, { Component } from 'react'

export default class Home extends Component {

    isLogin = false;
    urlGetProfile = "http://localhost:8183/web/profile/" + localStorage.getItem("userid");

    componentDidMount() {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.get(this.urlGetProfile, config).then(
            res => {
                if(res.data.status) {
                    this.isLogin = true;
                    alert("You are logged in");
                }
                else {
                    alert("Access denied");
                }
                
            }
        ).catch(
            err => {
                this.isLogin = false;
                console.log(err);
                alert("Access denied");
            }
        )
    }

    render() {
        return (
            <h2>You are not logged in</h2>
        )
    }
}