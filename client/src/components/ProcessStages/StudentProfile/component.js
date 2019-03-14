import React, { Component } from "react";
import "./StudentProfile.css";
import getWeb3 from "../../../utils/getWeb3";
import { contractInstance, accounts } from "../../../utils/getContract";
import RegistrationAndCertificateContractFactory from "../../../contracts/RegistrationAndCertificateContractFactory.json";

const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../../utils/sendTxContract');

class StudentProfile extends Component {
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            accounts: null,
            contract: null,
            instance: null
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
            this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };


    handleVerify = event => {
        var stdAddress = "0x7cda55A222b72281eb5214d0Cfa154cfac0782e6";

        event.preventDefault();

        let wallet = JSON.parse(localStorage.getItem('wallet'));
        let password = localStorage.getItem('password');
        let walletRead = Wallet.fromV3(wallet, password)
        let privKey = walletRead.getPrivateKeyString();
        console.log(walletRead.getPrivateKeyString());
        const { web3, accounts, contract } = this.state;
        Transaction.doInteractionWithSC(privKey, wallet.address,
            `verifyStudentProfile('${stdAddress}')`);
        window.confirm("You have successfully verified the Student's Profile");

        /*const { accounts, contract } = this.state;
        contract.methods
          .verifyStudentProfile(stdAddress)
          .send({ from: accounts[1], gas: 1330000 })
          .then(function (result) {
            console.log(result);
            window.confirm("You have successfully verified the Student's Profile");
          })
          .catch(function (e) {
            console.log(e);
          }); */
    };

    handleApprove = event => {
        var stdAddress = "0x7cda55A222b72281eb5214d0Cfa154cfac0782e6";

        event.preventDefault();
        let wallet = JSON.parse(localStorage.getItem('wallet'));
        let password = localStorage.getItem('password');
        let walletRead = Wallet.fromV3(wallet, password)
        let privKey = walletRead.getPrivateKeyString();
        console.log(walletRead.getPrivateKeyString());
        const { web3, accounts, contract } = this.state;
        Transaction.doInteractionWithSC(privKey, wallet.address,
            `approveRegistration('${stdAddress}')`);
        window.confirm("You have successfully approved the Student Registration");

        /*const { accounts, contract } = this.state;
        contract.methods
          .approveRegistration(stdAddress)
          .send({ from: accounts[1], gas: 1330000 })
          .then(function (result) {
            console.log(result);
            window.confirm("You have successfully approved the Student Registration");
          })
          .catch(function (e) {
            console.log(e);
          }); */
    };

    handleAccept = event => {
        var clgAddress = accounts[1];

        event.preventDefault();
        const { accounts, contract } = this.state;
        contract.methods
            .acceptRegistration(clgAddress)
            .send({ from: accounts[0], gas: 330000 })
            .then(function (result) {
                console.log(result);
            })
            .catch(function (e) {
                console.log(e);
            });
    };

    handleDeny = event => {
        event.preventDefault();
        const { accounts, contract } = this.state;
        contract.methods
            .getFirstStudent()
            .send({ from: accounts[0], gas: 330000 })
            .then(function (result) {
                console.log(result);
            })
            .catch(function (e) {
                console.log(e);
            })
    };

    render() {
        return (
            <div>
                <div className="iprofile">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="control-label col-sm-2">College Name</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="clgAddress"
                                    name="clgAddress"
                                    placeholder="Enter College Name"
                                    value="IIIT"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">
                                Registration Number
              </label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="clgRegNum"
                                    name="clgRegNum"
                                    placeholder="Enter your Registration/Roll Number/Student Identification Number"
                                    value="10251A0494"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">College Email ID</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="clgEmailID"
                                    name="clgEmailID"
                                    placeholder="Enter the email ID used while registering for the college"
                                    value="mani.maukthika@gmail.com"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Year of Joining</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="clgYOJ"
                                    name="clgYOJ"
                                    placeholder="Enter the year you joined the college"
                                    value="2018"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Year of Passing</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="clgYOP"
                                    name="clgYOP"
                                    placeholder="Enter your year of Passing"
                                    value="2019"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Course:</label>
                            <div className="col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="course"
                                    placeholder="Enter the course pursued"
                                    value="Post Graduation"
                                    readOnly
                                />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default StudentProfile;
