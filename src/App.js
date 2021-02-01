import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

export default class App extends Component {

  state = {};

  componentDidMount = () => {

    let userId = localStorage.getItem('userid');

    //check if user is log in or not
    if (userId) {
      const config = {
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      axios.get("profile/" + userId, config).then(
        res => {
          if (res.data.status) 
            this.setUser(res.data.data);
        }
      ).catch(
        err => {
          console.log(err);
        }
      )
    }

  }

  setUser = (user) => {
    this.setState({ user: user });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} setUser={this.setUser} />

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user} />}></Route>
                <Route exact path="/login" component={() => <Login user={this.state.user} setUser={this.setUser} />}></Route>
                <Route exact path="/register" component={() => <Register user={this.state.user} setUser={this.setUser} />}></Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  };
}
