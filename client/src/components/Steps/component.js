import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Well2 from "../../components/ProcessStages/Well2/component";
import getWeb3 from "../../utils/getWeb3";
import RegistrationAndCertificateContractFactory from "../../contracts/RegistrationAndCertificateContractFactory.json";

const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../utils/sendTxContract');

class StepsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentAddress: null,
            collegeAddress: null,
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
        } = this.state;

        this.setState({ studentAddress: localStorage.getItem('studentAddress') });
        this.setState({ collegeAddress: localStorage.getItem('collegeAddress') });
        console.log("Steps student:", this.state.studentAddress);
        console.log("Steps college: ", this.state.collegeAddress);

        let stdAddress = localStorage.getItem('studentAddress');
        let clgAddress = localStorage.getItem('collegeAddress');

        //  if (this.state.studentAddress && this.state.collegeAddress) {
        const a = await contract.methods
            .getRegistrationStatus(
                // "0xB9b7034BEDebf594e1275E09aabFBfee44eA9C7c", "0x01482828B2EC7827C955985E7f14B8A111Bce48A"
                stdAddress, clgAddress
            )
            .call();
        // console.log("Value of a is : ", a);
        this.setState({ astate: a });
        console.log("Status is JJJJ ", this.state.astate);
        //  console.log("Props value is", this.props.reg);


        switch (a) {

            case "RequestforRegistration":
                this.setState({
                    index11: "btn-success",
                    index21: "btn-primary",
                    index31: "btn-default",
                    index41: "btn-default"
                });
                break;

            case "VerifyStudentProfile":
                this.setState({
                    index11: "btn-success",
                    index21: "btn-success",
                    index31: "btn-primary",
                    index41: "btn-default"
                });
                break;

            case "ApproveRegistration":
                this.setState({
                    index11: "btn-success",
                    index21: "btn-success",
                    index31: "btn-success",
                    index41: "btn-primary"
                });
                break;

            case "AcceptRegistration":
                this.setState({
                    index11: "btn-success",
                    index21: "btn-success",
                    index31: "btn-success",
                    index41: "btn-success"
                });
                break;

            default:
                this.setState({
                    index11: "btn-default",
                    index21: "btn-default",
                    index31: "btn-default",
                    index41: "btn-default"
                })
        }

        const b = await contract.methods

            .getCertificationStatus(
                // "0xB9b7034BEDebf594e1275E09aabFBfee44eA9C7c",
                // "0x01482828B2EC7827C955985E7f14B8A111Bce48A"
                stdAddress, clgAddress
            )
            .call();
        console.log("Value of b is : ", b);
        this.setState({ bstate: b });
        console.log("Status is ", this.state.bstate);

        switch (b) {

            case "AcceptingCertificateRequest":
                this.setState({
                    index51: "btn-success",
                    index61: "btn-primary",
                    index71: "btn-default",
                    index81: "btn-default"
                });
                break;

            case "RequestCertificate":
                this.setState({
                    index51: "btn-success",
                    index61: "btn-success",
                    index71: "btn-primary",
                    index81: "btn-default"
                });
                break;

            case "IssueCertificate":
                this.setState({
                    index51: "btn-success",
                    index61: "btn-success",
                    index71: "btn-success",
                    index81: "btn-primary"
                });
                break;

            case "acceptCertificate":
                this.setState({
                    index51: "btn-success",
                    index61: "btn-success",
                    index71: "btn-success",
                    index81: "btn-success"
                });
                break;

            default:
                this.setState({
                    index51: "btn-default",
                    index61: "btn-default",
                    index71: "btn-default",
                    index81: "btn-default"
                })
        }
        //    }

    };

    getStatus = async () => {
        let stdAddress = localStorage.getItem('studentAddress');
        let clgAddress = localStorage.getItem('collegeAddress');


        const { web3, accounts, contract } = this.state;
        const a = await contract.methods
            .getRegistrationStatus(
                // "0xB9b7034BEDebf594e1275E09aabFBfee44eA9C7c", "0x01482828B2EC7827C955985E7f14B8A111Bce48A"
                stdAddress, clgAddress
            )
            .call();
        this.setState({ astate: a });
        console.log("Status is JJJJ ", this.state.astate);
        // console.log("Value of a is : ", a);


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
        var index6 = "6";
        var index7 = "7";
        var index8 = "8";


        return (
            <div className="container">
                <div className="stepwizard">
                    <div className="stepwizard-row">
                        <Well2
                            stage={stage1}
                            index={index1}
                            status={this.state.index11}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage2}
                            index={index2}
                            status={this.state.index21}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage3}
                            index={index3}
                            status={this.state.index31}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage4}
                            index={index4}
                            status={this.state.index41}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage5}
                            index={index5}
                            status={this.state.index51}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage6}
                            index={index6}
                            status={this.state.index61}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage7}
                            index={index7}
                            status={this.state.index71}
                            stage_color="default"
                        />
                        <Well2
                            stage={stage8}
                            index={index8}
                            status={this.state.index81}
                            stage_color="default"
                        />
                    </div>
                </div>

            </div>
        );
    }
}

StepsComponent.propTypes = {
    studentAddress: PropTypes.string,
    collegeAddress: PropTypes.string,
    //  reg: PropTypes.string
}
export default StepsComponent;