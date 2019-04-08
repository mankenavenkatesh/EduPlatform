import React, { Component } from 'react';
//import { StyleSheet, Test, Image, View } from 'react-native';
import NotifyTable from "./Notifications/component.js";
import UpperNav from "../UpperNav/component.js";
import LoginNav from "../LoginNav/component.js";

import "./styles.css"

class UniProfile extends Component {
    state = {}
    render() {
        return (
            <div className="uni-profile">
                <UpperNav />
                <br />
                <h1> Notifications</h1>
                <br />
                <div className="container">
                    <NotifyTable />
                </div>
            </div>);
    }
}

export default UniProfile;