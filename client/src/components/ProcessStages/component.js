import React, { Component } from "react";
import Uppernav from "../UpperNav/component";
import Carousel from "../Carousel/component";
import TabBar from "../SectionBar/component";
import IssuerProfile from "./IssuerProfile/component";
import UploadCertificate from "./Upload/component";
import getWeb3 from "../../utils/getWeb3";
import Steps from "../Steps/component";
import RegistrationAndCertificateContractFactory from "../../contracts/RegistrationAndCertificateContractFactory.json";

class ProcessStages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleStatus: true,/* Property In Process Hide/Show flag */
      studentAddress: null,
      collegeAddress: null,
      regStatus: null
    };
  }
  state = {};

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
      .cRegistrationContract()
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
  }

  runExample = event => {
    event.preventDefault();
    const {
      accounts,
      contract,
    } = this.state;
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    contract.methods
      .cRegistrationContract()
      .call({ from: wallet.address })
      .then(function (result1) {
        console.log("Result 1 is: ", result1);
        contract.methods
          .regStuCollAddress(result1).call({ from: wallet.address })
      }).then(function (result2) {
        console.log("Result 2 is:", result2);
        /*contract.methods
          .getRegistrationStatus(result2[0], result2[1]
          )
          .call(); */
      }).then(function (result3) {
        console.log("Result 2 is: ", result3);
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  render() {

    if (this.props.role == "student") {
      window.location.pathname = '/studentprocess';
    }


    return (
      <div>
        <Uppernav />
        <Carousel />
        <br />
        <br />
        <br />
        <br />
        <button onClick={this.runExample}> Run Example</button>

        <div className="container">
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
          <Steps
          /*studentAddress={this.state.studentAddress} collegeAddress={this.state.collegeAddress}/*reg={this.state.regStatus} */ />
          <br />
          <br />
          <TabBar />
          <br />
          <IssuerProfile />
          <br />
          <br />
          <UploadCertificate />
          <br />
          <br />

        </div>
      </div >
    );
  }
}

export default ProcessStages;
