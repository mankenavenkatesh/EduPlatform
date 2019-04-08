import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OneStep from "../StuSteps/OneStep/component.js";
import StudentProfile from "../ProcessStages/StudentProfile/component";
import Profile from "../Landing/Student/component";
import StartCert from "../Landing/Student/StartCert/component";
import getWeb3 from "../../utils/getWeb3";
import RegistrationAndCertificateContractFactory from "../../contracts/RegistrationAndCertificateContractFactory.json";

const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../utils/sendTxContract');

class StuSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentAddress: null,
            collegeAddress: null,
            allowUpload: true,
            acceptReg: "disabled",
            startCert: "disabled",
            acceptCert: "disabled",
            nextAction: null,
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

    runExample = async () => {

        this.interval = setInterval(() => {

            this.setState({ time: Date.now() });
            console.log("Time now is:", this.state.time);


            const {
                accounts,
                contract,
                astate,
                bstate,
                index11,
                index21,
                index31,
                index41,
                index51,
                index61,
                index71,
                index81,
                studentAddress,
                collegeAddress,
                nextAction,
                //  allowUpload = ".disabled",
            } = this.state;

            this.setState({ studentAddress: localStorage.getItem('studentAddress') });
            this.setState({ collegeAddress: localStorage.getItem('collegeAddress') });
            //console.log("Steps student:", this.state.studentAddress);
            // console.log("Steps college: ", this.state.collegeAddress);

            let stdAddress = localStorage.getItem('studentAddress');
            let clgAddress = localStorage.getItem('collegeAddress');

            if (this.state.studentAddress != null && this.state.collegeAddress != null) {
                contract.methods
                    .getRegistrationStatus(
                        stdAddress, clgAddress
                    )
                    .call().then((response) => {
                        this.setState({ astate: response });
                        //   console.log("Status is JJJJ ", this.state.astate);
                    });

                let regStatus = this.state.astate;

                switch (regStatus) {

                    case "RequestforRegistration":
                        this.setState({
                            index11: "btn-success",
                            index21: "btn-primary",
                            index31: "btn-default",
                            index41: "btn-default",
                            nextAction: "No Action Pending. University is verifying your profile",
                            acceptReg: "disabled",
                            startCert: "disabled",
                            acceptCert: "disabled",

                        });
                        break;

                    case "VerifyStudentProfile":
                        this.setState({
                            index11: "btn-success",
                            index21: "btn-success",
                            index31: "btn-primary",
                            index41: "btn-default",
                            nextAction: "No Action Pending. University is yet to approve your profile",
                            acceptReg: "disabled",
                            startCert: "disabled",
                            acceptCert: "disabled",
                        });
                        break;

                    case "ApproveRegistration":
                        this.setState({
                            index11: "btn-success",
                            index21: "btn-success",
                            index31: "btn-success",
                            index41: "btn-primary",
                            nextAction: "Please accept the registration given by the University",
                            acceptReg: "",
                            startCert: "disabled",
                            acceptCert: "disabled",
                        });
                        break;

                    case "AcceptRegistration":
                        this.setState({
                            index11: "btn-success",
                            index21: "btn-success",
                            index31: "btn-success",
                            index41: "btn-success",
                            nextAction: "Please select the required certificate and submit the certification request",
                            acceptReg: "disabled",
                            startCert: "",
                            acceptCert: "disabled",
                        });
                        break;

                    default:
                        this.setState({
                            index11: "btn-default",
                            index21: "btn-default",
                            index31: "btn-default",
                            index41: "btn-default",
                            nextAction: "Please fill the form to register yourself to the University",
                            verify: "disabled",
                            approve: "disabled",
                            upload: "disabled",
                            view: "disabled"
                        })
                }
            }

            if (this.state.studentAddress != null && this.state.collegeAddress != null && this.state.astate == "AcceptRegistration") {
                contract.methods

                    .getCertificationStatus(
                        stdAddress, clgAddress
                    )
                    .call().then((response) => {
                        this.setState({ bstate: response });
                    });


                let certStatus = this.state.bstate;
                switch (certStatus) {

                    case "AcceptingCertificateRequest":
                        this.setState({
                            index51: "btn-success",
                            index61: "btn-primary",
                            index71: "btn-default",
                            index81: "btn-default",
                            nextAction: "Please select the required certificate and submit the certification request",
                            acceptReg: "",
                            startCert: "dis",
                            acceptCert: "disabled",

                        });
                        break;

                    case "RequestCertificate":
                        this.setState({
                            index51: "btn-success",
                            index61: "btn-success",
                            index71: "btn-primary",
                            index81: "btn-default",
                            nextAction: "No Pending Action. University is issuing you a ceritificate",
                            acceptReg: "disabled",
                            startCert: "disabled",
                            acceptCert: "disabled",
                        });
                        break;

                    case "IssueCertificate":
                        this.setState({
                            index51: "btn-success",
                            index61: "btn-success",
                            index71: "btn-success",
                            index81: "btn-primary",
                            nextAction: "Please view and accept your certificate",
                            acceptReg: "disabled",
                            startCert: "disabled",
                            acceptCert: "",
                        });
                        break;

                    case "acceptCertificate":
                        this.setState({
                            index51: "btn-success",
                            index61: "btn-success",
                            index71: "btn-success",
                            index81: "btn-success",
                            nextAction: "No Pending Action",
                            acceptReg: "disabled",
                            startCert: "disabled",
                            acceptCert: "",
                        });
                        break;

                    default:
                        this.setState({
                            index51: "btn-default",
                            index61: "btn-default",
                            index71: "btn-default",
                            index81: "btn-default",
                            nextAction: "Please select the required certificate and submit the certification request ",
                            acceptReg: "disabled",
                            startCert: "",
                            acceptCert: "disabled",
                        })
                }
            }
        }, 500);

    };
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getStatus = async () => {
        let stdAddress = localStorage.getItem('studentAddress');
        let clgAddress = localStorage.getItem('collegeAddress');


        const { web3, accounts, contract } = this.state;
        const a = await contract.methods
            .getRegistrationStatus(
                stdAddress, clgAddress
            )
            .call();
        this.setState({ astate: a });



    };

    render() {
        console.log("Student Address:", this.props.studentAddress);
        console.log("College Address", this.props.collegeAddress);
        var stage1 = "Request Registration";
        var stage2 = "Verify Student Profile";
        var stage3 = "Approve Registration";
        var stage4 = "Accept Registration";
        var stage5 = "Start Certification Request";
        var stage6 = "Request Certificate";
        var stage7 = "Issue Certification";
        var stage8 = "Accept Certification";

        //  var stage_color = "success";

        var index1 = "1";
        var index2 = "2";
        var index3 = "3";
        var index4 = "4";
        var index5 = "5";
        // var index6 = "6";
        var index7 = "6";
        var index8 = "7";


        return (
            <div className="container">
                <div className="stepwizard">
                    <div className="stepwizard-row">
                        <OneStep
                            stage={stage1}
                            index={index1}
                            status={this.state.index11}
                            stage_color="default"
                        />
                        <OneStep
                            stage={stage2}
                            index={index2}
                            status={this.state.index21}
                            stage_color="default"
                        />
                        <OneStep
                            stage={stage3}
                            index={index3}
                            status={this.state.index31}
                            stage_color="default"
                        />
                        <OneStep
                            stage={stage4}
                            index={index4}
                            status={this.state.index41}
                            stage_color="default"
                        />
                        <OneStep
                            stage={stage5}
                            index={index5}
                            status={this.state.index51}
                            stage_color="default"
                        />

                        <OneStep
                            stage={stage7}
                            index={index7}
                            status={this.state.index71}
                            stage_color="default"
                        />
                        <OneStep
                            stage={stage8}
                            index={index8}
                            status={this.state.index81}
                            stage_color="default"
                        />
                    </div>

                </div>
                <br />
                <div className="next-action">
                    <h3> Next Action : &nbsp; {this.state.nextAction}</h3>
                </div>

                <br />
                <br />
                <Profile />
                <div className="student-profile">
                    <StudentProfile />
                    <br />
                    <StartCert
                        acceptReg={this.state.acceptReg}
                        startCert={this.state.startCert}
                        acceptCert={this.state.acceptCert} />
                    <br />
                </div>

            </div>
        );
    }
}

StuSteps.propTypes = {
    studentAddress: PropTypes.string,
    collegeAddress: PropTypes.string,
    acceptReg: PropTypes.string,
    startCert: PropTypes.string,
    acceptCert: PropTypes.string,
}
export default StuSteps;