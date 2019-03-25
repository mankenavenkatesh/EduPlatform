import React, { Component } from "react";
import "./style.css";
import profile from "./profile.png";
import RegFactoryContract from "../../../../contracts/RegistrationAndCertificateContractFactory.json";
import getWeb3 from "../../../../utils/getWeb3";
import axios from 'axios';


const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../../../utils/sendTxContract');


class studSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      instance: null,

      regContractAddress: null,
      userAddress: null,
      studentName: null,
      clgAddress: null,
      clgRegNum: null,
      clgEmailID: null,
      clgYOJ: null,
      clgYOP: null,
      CollegeList: []
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
      const deployedNetwork = RegFactoryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RegFactoryContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }


    axios.get('http://localhost:5000/getAllCollege')
      .then((response) => {
        if (response.data) {
          var len = response.data.length;
          this.setState({ CollegeList: response.data });
          console.log(response.data);
          console.log(response.data[5].name);
          console.log(len);
        }
        else {
          console.log("No Data");
        }
      })

  };

  runExample = async () => {
    const { accounts, contract, astate } = this.state;

    /* const a = await contract.methods
       .getStudentData()
       .call();
     //this.setState({ studentName: a[0] });
     console.log("Status is ", a); */

  };


  handleSubmit = event => {
    var clgAddress = this.state.clgAddress;
    // var patt = /\(([^)]+)\)/;
    // var clgVal = patt.match(clgAddress);
    console.log(clgAddress);
    //var clgAddress = "0x5446640647e082be1c7003A467C09dc8eA5A0532";
    var clgRegNum = this.state.clgRegNum;
    var clgEmailID = this.state.clgEmailID;
    var clgYOJ = this.state.clgYOJ;
    var clgYOP = this.state.clgYOP;

    event.preventDefault();
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let password = localStorage.getItem('password');
    let walletRead = Wallet.fromV3(wallet, password)
    let privKey = walletRead.getPrivateKeyString();
    console.log(walletRead.getPrivateKeyString());
    const { web3, accounts, contract } = this.state;
    Transaction.doInteractionWithSC(privKey, wallet.address,
      `startRegistration('${clgAddress}','${clgRegNum}','${clgEmailID}','${clgYOJ}','${clgYOP}')`);
    window.confirm("You have successfully submitted your Registration Request Form");

    this.setState({ walletAddress: wallet.address });


    console.log(wallet.address);
    var asd = this.state.clgAddress;
    // var sname = document.getElementById("sname").value;
    console.log("Value of sname is ", asd);
  };

  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
      //  sname: event.target.value
    });


    /*  var clgAdd = this.state.clgAddress;
      var patt = /\(([^)]+)\)/;
      var clgVal = patt.exec(clgAdd);
      console.log(clgVal, "Colge Address"); */
  };

  getData = event => {
    event.preventDefault();
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let password = localStorage.getItem('password');
    let walletRead = Wallet.fromV3(wallet, password)
    let privKey = walletRead.getPrivateKeyString();
    console.log(walletRead.getPrivateKeyString());
    const { web3, accounts, contract } = this.state;
    let abc = Transaction.doInteractionWithSC(privKey, wallet.address,
      `getStudentData()`);
    console.log(" Data is: ", abc);

  }

  getDataABC = async () => {
    const { accounts, contract } = this.state;
    let wallet = JSON.parse(localStorage.getItem('wallet'));
    const a = await contract.methods
      .getStudentData()
      .call({ from: wallet.address });

    console.log("Student Data is ", a);

    const b = await contract.methods.getFirstStudent().call({ from: wallet.address });
    console.log("Registration Contract Address is", b);
    this.setState({ regContractAddress: b });

    console.log(this.state.regContractAddress);

    /* const c = await contract.methods.regStuCollAddress("b").call({ from: wallet.address });
     console.log("Student Address", c[0]);
     console.log("College Address", c[1]); */

  }

  render() {
    return (
      <div>
        <div className="row profile">
          <div className="col-md-3">
            <div className="profile-sidebar">
              <div className="profile-userpic">
                <img src={profile} alt="Chicago" />
              </div>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">Mani</div>
                <div className="profile-usertitle-job">India</div>
              </div>

              <div className="profile-usermenu">
                <ul className="nav">
                  <li className="active">
                    <a href="">
                      <i className="glyphicon glyphicon-home" />
                      Overview{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="glyphicon glyphicon-user" />
                      Account Settings{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="glyphicon glyphicon-ok" />
                      Tasks{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="glyphicon glyphicon-flag" />
                      Help{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="profile-content">
              <h4> Registration Request Form </h4>
              <br />
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="control-label col-sm-2">College Name</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="clgAddress1"
                      name="clgAddress1"
                      placeholder="Enter College Name"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Colleges List
                  </label>
                  <div className="col-sm-10">
                    <select className="form-control" onChange={this.handleInputChange} id="clgAddress" name="clgAddress">
                      {this.state.CollegeList.map((collegeDetail, index) => {
                        return (<option key={index} value={collegeDetail.address}>
                          {collegeDetail.name} ({collegeDetail.address})
                        </option>)
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Registration Number
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="clgRegNum"
                      name="clgRegNum"
                      placeholder="Enter your Registration/Roll Number/Student Identification Number"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                    College Email ID
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="clgEmailID"
                      name="clgEmailID"
                      placeholder="Enter the email ID used while registering for the college"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Year of Joining
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="clgYOJ"
                      name="clgYOJ"
                      placeholder="Enter the year you joined the college"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Year of Passing
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="clgYOP"
                      name="clgYOP"
                      placeholder="Enter your year of Passing"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Course:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="course"
                      placeholder="Enter the course pursued"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default">
                      Submit
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default studSideNav;
