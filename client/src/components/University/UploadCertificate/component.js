import React, { Component } from 'react';
import ipfs from "./ipfs";
import getWeb3 from "../../../utils/getWeb3";
import RegistrationAndCertificateContractFactory from "../../../contracts/RegistrationAndCertificateContractFactory.json";

const Wallet = require('ethereumjs-wallet');
const Transaction = require('../../../utils/sendTxContract');

class UploadCertificate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ipfsHash: "",
            web3: null,
            buffer: null,
            account: null
        };
        this.captureFile = this.captureFile.bind(this);
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

    captureFile(event) {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) });
            console.log("buffer", this.state.buffer);
        };
    }

    addCertificate = event => {
        let stdAddress = localStorage.getItem('studentAddress');
        event.preventDefault();
        let wallet = JSON.parse(localStorage.getItem('wallet'));
        let password = localStorage.getItem('password');
        let walletRead = Wallet.fromV3(wallet, password)
        let privKey = walletRead.getPrivateKeyString();
        console.log(walletRead.getPrivateKeyString());
        const { web3, accounts, contract } = this.state;

        Transaction.doInteractionWithSC(privKey, wallet.address, `addHash('${stdAddress}',1,'${this.state.ipfsHash}')`);
        console.log("IPFS Added");
        window.confirm("Hash Added");

    }

    getHash = event => {
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

        console.log("Status is ", this.state.ipfsHash);
    }

    issueCertificate = event => {
        let stdAddress = localStorage.getItem('studentAddress');
        event.preventDefault();

        ipfs.add(this.state.buffer, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            this.setState({ ipfsHash: result[0].hash });
            console.log("ipfsHash", this.state.ipfsHash);
        });

        let wallet = JSON.parse(localStorage.getItem('wallet'));
        let password = localStorage.getItem('password');
        let walletRead = Wallet.fromV3(wallet, password)
        let privKey = walletRead.getPrivateKeyString();
        console.log(walletRead.getPrivateKeyString());
        const { web3, accounts, contract } = this.state;
        Transaction.doInteractionWithSC(privKey, wallet.address,
            `issueCertification('${stdAddress}')`);
        window.confirm("You have successfully uploaded the Certificate");
    };
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="control-label col-sm-2">Upload Certificate: </label>
                    <div className="col-sm-4">
                        <input type="file" onChange={this.captureFile} />
                        <br />
                        <button onClick={this.issueCertificate} className="btn btn-primary" {...this.props.upload}> Upload Certificate</button>
                        &nbsp; &nbsp;
                        <button onClick={this.addCertificate} className="btn btn-primary" {...this.props.view}> Add Certificate </button>
                        &nbsp; &nbsp;
                        <button className="btn btn-primary" {...this.props.view} onClick={this.getHash} data-toggle="modal" data-target="#myModal" > View </button>


                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog">


                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">View Certificate</h4>
                                    </div>
                                    <div class="modal-body">
                                        <img
                                            src={`http://127.0.0.1:8080/ipfs/${this.state.ipfsHash}`}
                                            alt="Image Loads Here"
                                        />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>
                        </div>





                    </div>
                </div>
            </div >
        );
    }
}

export default UploadCertificate;