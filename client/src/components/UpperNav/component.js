import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import home_logo from "./certimy_home.png";
import "./UpperNav.css";


const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../utils/sendTxContract');


class upperNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      pwd: null,
      token: null,
      role: null
    };
    // this.addTransaction = this.props.addTransaction.bind(this);
  }

  handleLogin = event => {
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.pwd;

    if (username && password) {
      console.log('User logging in....');

      axios.post('http://localhost:5000/login', { "username": username, "password": password })
        .then((response) => {
          if (response.data.token) {
            console.log(response.data.token);
            axios.get('http://localhost:5000/home', { headers: { "Authorization": `Bearer ${response.data.token}` } })
              .then((response) => {
                if (response) {
                  console.log(response.data.wallet);
                  localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
                  localStorage.setItem('role', response.data.role);

                }
              })
            this.setState(() => {
              return {
                token: response.data.token,
                role: response.data.role
              }
            })
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('password', password);

          } else {
            console.log(`Incorrect Username or Password`);
          }
        })
    } else {
      console.log('Please Enter Username and Password');
    }

  }

  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  logOut = () => {
    this.setState(() => {
      return {
        token: undefined
      }
    })
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.pathname = '/home';
  }


  render() {

    if (this.props.token || this.state.token) {
      console.log(this.props.role);
      if (this.props.role == 'university' || this.state.role == 'university') {
        window.location.pathname = '/issuerprocess';
      }
      else {
        window.location.pathname = '/studentprocess';
      }
    }
    let login;

    login = <ul className="nav navbar-nav navbar-right">
      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-log-in"></span> Login </a>
        <ul className="dropdown-menu">
          <li>
            <form className="form-inline">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user" />
                </span>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="User name"
                  required
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock" />
                </span>
                <input
                  id="pwd"
                  type="password"
                  className="form-control"
                  name="pwd"
                  placeholder="Password"
                  required
                  onChange={this.handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-primary" onClick={this.handleLogin}> Log In </button>
            </form></li>
        </ul>

      </li>
    </ul>;




    return (
      <div className="upp">
        <nav>
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">
                <img className="img_home" src={home_logo} alt="Chicago" />
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/student">Home</Link>
              </li>
              <li className="active">
                <Link to="/student">Student Registration</Link>
              </li>
              <li>
                <Link to="/issuer">University Registration</Link>
              </li>
              <li>
                <Link to="/verifier">Verifier Registration</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? login : <ul className="nav navbar-nav navbar-right">
              <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" onClick={this.logOut}><span className="glyphicon glyphicon-log-in"></span>&nbsp; LogOut</a>
              </li>
            </ul>
            }
          </div>



        </nav>
      </div>
    );
  }
}

export default upperNav;
