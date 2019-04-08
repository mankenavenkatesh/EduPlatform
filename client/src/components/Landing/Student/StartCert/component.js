import React, { Component } from "react";
import getWeb3 from "../../../../utils/getWeb3";
import "./contractInteraction";
import ipfs from "../../../ProcessStages/Upload/ipfs";
import "./style.css";
import RegistrationAndCertificateContractFactory from "../../../../contracts/RegistrationAndCertificateContractFactory.json";

const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../../../utils/sendTxContract');

class StartCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0,
      ipfsHash: "QmVvEXyFuj9EJwhkwNH7LaM41RGqLLw7MqLPo5qiUr8yG6",
      web3: null,
      accounts: null,
      contract: null,
      instance: null,
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
      const deployedNetwork = RegistrationAndCertificateContractFactory.networks[networkId];
      const instance = new web3.eth.Contract(
        RegistrationAndCertificateContractFactory.abi,
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
  };

  acceptRegsitration = event => {
    let clgAddress = localStorage.getItem('collegeAddress');
    event.preventDefault();

    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let password = localStorage.getItem('password');
    let walletRead = Wallet.fromV3(wallet, password)
    let privKey = walletRead.getPrivateKeyString();
    console.log(walletRead.getPrivateKeyString());
    const { web3, accounts, contract } = this.state;
    Transaction.doInteractionWithSC(privKey, wallet.address,
      `acceptRegistration('${clgAddress}')`);
    window.confirm("You have successfully accepted your Registration by the College");
  };

  startCertification = event => {
    let clgAddress = localStorage.getItem('collegeAddress');
    event.preventDefault();

    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let password = localStorage.getItem('password');
    let walletRead = Wallet.fromV3(wallet, password)
    let privKey = walletRead.getPrivateKeyString();
    console.log(walletRead.getPrivateKeyString());
    const { web3, accounts, contract } = this.state;
    Transaction.doInteractionWithSC(privKey, wallet.address,
      `startCertification('${clgAddress}')`)

    window.confirm("Your request for Certificate has been initiated");

  };

  requestCertification = event => {
    let clgAddress = localStorage.getItem('collegeAddress');
    event.preventDefault();

    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let password = localStorage.getItem('password');
    let walletRead = Wallet.fromV3(wallet, password)
    let privKey = walletRead.getPrivateKeyString();
    console.log(walletRead.getPrivateKeyString());
    const { web3, accounts, contract } = this.state;
    Transaction.doInteractionWithSC(privKey, wallet.address,
      `startCertification('${clgAddress}')`);
    /*Transaction.doInteractionWithSC(privKey, wallet.address,
      `reqCertification('${clgAddress}')`); */
    window.confirm("You have successfully requested the College for Certification");

  };

  acceptCertification = event => {
    let clgAddress = localStorage.getItem('collegeAddress');
    event.preventDefault();

    let wallet = JSON.parse(localStorage.getItem('wallet'));
    let password = localStorage.getItem('password');
    let walletRead = Wallet.fromV3(wallet, password)
    let privKey = walletRead.getPrivateKeyString();
    console.log(walletRead.getPrivateKeyString());
    const { web3, accounts, contract } = this.state;
    Transaction.doInteractionWithSC(privKey, wallet.address,
      `acceptCertification('${clgAddress}')`);
    window.confirm("You have successfully accepted the Certificate given by the College");



  };

  getCertHash = event => {
    let stdAddress = localStorage.getItem('studentAddress');
    let clgAddress = localStorage.getItem('collegeAddress');
    event.preventDefault();
    const { accounts, contract } = this.state;
    const a = contract.methods
      .getHash(
        stdAddress, clgAddress
      )
      .call().then((response) => {
        console.log(response);
        this.setState({ ipfsHash: response });
      })
    // console.log("Value of a is : ", a);

    console.log("Status is ", this.state.ipfsHash);
  }

  render() {
    return (
      <div className='modals-group'>
        <div className="modal-1">
          <button type="button" className="btn btn-info btn-lg" disabled={this.props.acceptReg}

            onClick={this.acceptRegsitration}>Accept Registration</button>
          &nbsp; &nbsp;
          &nbsp; &nbsp;
          <button type="button" disabled={this.props.startCert} className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">Start Certification Request</button>
          &nbsp; &nbsp;
          <button type="button" disabled={this.props.acceptCert} className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal3">Accept Certification</button>
          <div className="modal fade" id="myModal1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Start Certification Form</h4>
                </div>
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="form-group">

                      <div className="form-group">
                        <label>Select a College:</label> &nbsp;
                      <select className="form-control" id="sel1">
                          <option>IIIT</option>
                          <option>University 101</option>
                          <option>NIT</option>
                          <option>IIM</option>
                        </select>
                      </div>
                      <br>
                      </br>
                    </div>

                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.startCertification}>Submit</button>
                </div>
              </div>
            </div>
          </div>


          <div className="modal fade" id="myModal2" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Request Certification Form</h4>
                </div>
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="form-group">
                      <label>Select a College:</label> &nbsp;
                      <select className="form-control" id="sel1">
                        <option>IIIT</option>
                        <option>University 101</option>
                        <option>NIT</option>
                        <option>IIM</option>
                      </select>
                    </div>
                    <br>
                    </br>
                    <br></br>
                    <div className="form-group">
                      <label>Enter Course Name:</label> &nbsp;
                    <input type="text" className="form-control" />
                    </div>
                    <br></br>
                    <br />
                    <div className="form-group">
                      <label>Enter Registration Number:</label> &nbsp;
                    <input type="text" className="form-control" />
                    </div>
                    <br></br>
                    <br />
                    <div className="form-group">
                      <label>Select the Certificate Required:</label> &nbsp;
                      <select className="form-control" id="sel1">
                        <option>Original Degree</option>
                        <option>Final Marks Memo</option>
                        <option>Marks Memo of each Semester</option>
                      </select>
                    </div>

                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.requestCertification}>Submit</button>
                </div>
              </div>
            </div>
          </div>



          <div className="modal fade" id="myModal3" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Accept Certification Form</h4>
                </div>
                <div className="modal-body">
                  <form className="form-inline">
                    <div className="form-group">
                      <div className="col-sm">
                        <button
                          className="btn btn-primary"
                          onClick={this.getCertHash}
                        >
                          View Certificate
                            </button>
                        <p>This image is stored on IPFS & The Ethereum Blockchain! </p>
                        <p>IPFS Hash : {this.state.ipfsHash}</p>
                        <img
                          src={`http://127.0.0.1:8080/ipfs/${this.state.ipfsHash}`}
                          alt="Image Loads Here"
                        />
                      </div>
                    </div>

                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.acceptCertification}>Submit</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div >

    );
  }
}

export default StartCert;
