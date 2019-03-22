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

  /* componentDidMount = async () => {
     try {
       // Get network provider and web3 instance.
       const web3 = await getWeb3();
 
       // Use web3 to get the user's accounts.
       const accounts = await web3.eth.getAccounts();
 
       // Get the contract instance.
       const networkId = await web3.eth.net.getId();
       const deployedNetwork =
         RegistrationAndCertificateContractFactory.networks[networkId];
       const instance = new web3.eth.Contract(
         RegistrationAndCertificateContractFactory.abi,
         deployedNetwork && deployedNetwork.address
       );
 
       // Set web3, accounts, and contract to the state, and then proceed with an
       // example of interacting with the contract's methods.
       this.setState({ web3, accounts, contract: instance }, this.getAddresses);
     } catch (error) {
       // Catch any errors for any of the above operations.
       alert(
         `Failed to load web3, accounts, or contract. Check console for details.`
       );
       console.error(error);
     }
   };
 
   runExample = async () => {
     const a = await contract.methods
       .getRegistrationStatus(
         "0x7cda55A222b72281eb5214d0Cfa154cfac0782e6",
         "0x5446640647e082be1c7003A467C09dc8eA5A0532"
       )
       .call();
     // console.log("Value of a is : ", a);
     this.setState({ astate: a });
     console.log("Status is ", this.state.astate);
 
 
   } */


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
