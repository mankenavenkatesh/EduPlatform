import React, { Component } from 'react';
import Uppernav from "../UpperNav/component";
import Carousel from "../Carousel/component";

class VerifyCertficate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipfsHash: "",
        };
        // this.handleInputChange = this.handleInputChange.bind(this);
        //this.viewCertificate = this.viewCertificate.bind(this);

    }
    viewCertificate = event => {
        event.preventDefault();
        console.log("Hash is", this.state.ipfsHash);
    };
    handleInputChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("Hash is now:", this.state.ipfsHash);
    }


    render() {
        return (
            <div>
                <Uppernav />
                <Carousel />
                <br />
                <br />
                <div className="container">
                    <h2>Verify the Certificate</h2>
                    <br />
                    <br />
                    <form className="form-inline">
                        <div className="form-group">
                            <label>Enter Hash</label> &nbsp; &nbsp;
                            <input type="text" className="form-control" name="ipfsHash" id="ipfsHash" onChange={this.handleInputChange} />
                            &nbsp;
                            <button className="btn btn-primary" onClick={this.viewCertificate}> View Certificate</button>
                            <br />
                            <br />
                            <img
                                src={`http://127.0.0.1:8080/ipfs/${this.state.ipfsHash}`}
                                alt="Image Loads Here"
                            />
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default VerifyCertficate;