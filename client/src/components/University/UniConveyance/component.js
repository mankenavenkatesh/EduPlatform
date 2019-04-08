import React, { Component } from 'react';
import "./styles.css";
import LoginNav from "../../LoginNav/component.js";
import UniSteps from "../UniSteps/component.js";
import StudentData from "../StudentData/component.js"
import UploadCertificate from "../UploadCertificate/component.js"
class uniConveyance extends Component {
    state = {}
    render() {
        return (<div className="uni-conveyance">
            <LoginNav />
            <div >
                <div className="uni-overlay">
                    <div className="uni-flow">
                        <h1> University 101 </h1>
                        <br />
                        <h2>Process Stages</h2>
                        <br />
                        <UniSteps />
                        <br />
                    </div>
                </div>
            </div>

        </div>);
    }
}

export default uniConveyance;