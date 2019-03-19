import React, { Component } from "react";
import Uppernav from "../UpperNav/component";
import Carousel from "../Carousel/component";
import Profile from "../Landing/Student/component";
import StartCert from "../Landing/Student/StartCert/component";
import TabBar from "../SectionBar/component";
import Steps from "../Steps/component";


import "./conveyance.css";
import StudentProfile from "../ProcessStages/StudentProfile/component";

class conveyance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStatus: true, /* Property In Process Hide/Show flag */
    };
  }


  render() {

    if (this.props.role == "university") {
      window.location.pathname = '/issuerprocess';
    }
    var taraTimeline1 = "Registration";
    var taraTimeline2 = "Certification";
    var taraTimeline3 = "Acceptance";
    var buckets = {
      timeLine: ["Registration", "Certification", "Acceptance"]
    };

    //if (this.state.redirect) {
    //  return (<Redirect to="/student" />);
    // }
    return (
      <div>
        <Uppernav />
        <Carousel />
        <br />
        <br />
        <div className="container">
          <Profile />

          <br></br>

          <br />
          <br />
          <div className="flow">
            <span className="legend-label">
              <i className="fas in_complete fa-circle notranslate" />
              Incomplete
            </span>
            <span className="legend-label">
              <i className="fas in_progress fa-circle notranslate" />
              In Progress
            </span>
            <span className="legend-label">
              <i className="fas fa-check-circle done notranslate" />
              Done
            </span>
            <span className="legend-label">
              <i className="fas fa-arrow-alt-circle-right done notranslate" />
              Automatic
            </span>
          </div>


          <div className="process-title">
            <h2> Process Stages </h2>
          </div>


          <br />
          <br />
          <Steps />
          <TabBar />
          <br />

          <StudentProfile />
          <br />
          <StartCert />
        </div>
      </div>
    );
  }
}


export default conveyance;
