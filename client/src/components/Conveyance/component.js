import React, { Component } from "react";
import Uppernav from "../UpperNav/component";
import Carousel from "../Carousel/component";
import Profile from "../Landing/Student/component";
import StartCert from "../Landing/Student/StartCert/component";
import TabBar from "../SectionBar/component";
import Steps from "../Steps/component";
import getWeb3 from "../../utils/getWeb3";
import RegistrationAndCertificateContractFactory from "../../contracts/RegistrationAndCertificateContractFactory.json";


import "./conveyance.css";
import StudentProfile from "../ProcessStages/StudentProfile/component";

class conveyance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStatus: true,
      regContractAddress: null,
      certContractAddress: null,
      studentAddress: null,
      collegeAddress: null /* Property In Process Hide/Show flag */
    };
  }

  componentDidMount = async () => {
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
      this.setState({ web3, accounts, contract: instance }, this.getData);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  getData = async () => {
    const { accounts, contract } = this.state;
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    console.log(wallet.address);
    const a = await contract.methods
      .getFirstStudent()
      .call({ from: wallet.address });

    console.log("Registration Contract address is ", a);
    this.setState({ regContractAddress: a });
    console.log(this.state.regContractAddress);

    const c = await contract.methods.regStuCollAddress(a).call({ from: wallet.address });
    console.log("Student Address", c[0]);
    console.log("College Address", c[1]);
    this.setState({ studentAddress: c[0] });
    this.setState({ collegeAddress: c[1] });

    localStorage.setItem('regContractAddress', a);
    localStorage.setItem('studentAddress', c[0]);
    localStorage.setItem('collegeAddress', c[1]);

    const regstatus = await contract.methods
      .getRegistrationStatus(c[0], c[1]
      )
      .call();
    // console.log("Value of a is : ", a);
    this.setState({ regStatus: regstatus });
    console.log("Status is ", this.state.regStatus);

    if (this.state.regStatus != null || this.state.regStatus != "RequestforRegistration" || this.state.regStatus != "VerifyStudentProfile" || this.state.regStatus != "ApproveRegistration") {
      const a = await contract.methods
        .sCertificationContract()
        .call({ from: wallet.address });

      console.log("Certification Contract address is ", a);
      this.setState({ certContractAddress: a });
      console.log(this.state.certContractAddress);

      const c = await contract.methods.certStuCollAddress(a).call({ from: wallet.address });
      console.log("Student Address", c[0]);
      console.log("College Address", c[1]);
      this.setState({ studentAddress: c[0] });
      this.setState({ collegeAddress: c[1] });

      localStorage.setItem('certContractAddress', a);
      localStorage.setItem('studentAddress', c[0]);
      localStorage.setItem('collegeAddress', c[1]);

      const certstatus = await contract.methods
        .getCertificationStatus(c[0], c[1]
        )
        .call();
      // console.log("Value of a is : ", a);
      this.setState({ certStatus: certstatus });
      console.log("Status is ", this.state.certStatus);
    }
  }



  render() {

    if (this.props.role == "university") {
      window.location.pathname = '/issuerprocess';
    }

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
