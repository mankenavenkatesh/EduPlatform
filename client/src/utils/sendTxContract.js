const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));

let param = {
  abi: `[
    {
      "constant": true,
      "inputs": [
        {
          "name": "_studentAddress",
          "type": "address"
        }
      ],
      "name": "getFirstCollege",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x9e5c196c"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getFirstStudent",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xacbe8cee"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getStudentData",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x5fd7b16a"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "phoneNumber",
          "type": "uint256"
        },
        {
          "name": "emailId",
          "type": "string"
        }
      ],
      "name": "createStudent",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xc12b577b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "instituteName",
          "type": "string"
        },
        {
          "name": "instituteCode",
          "type": "string"
        },
        {
          "name": "instituteAISHECode",
          "type": "string"
        }
      ],
      "name": "createCollege",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x85870a6f"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "collegeAddress",
          "type": "address"
        },
        {
          "name": "collegeRegNumber",
          "type": "string"
        },
        {
          "name": "collegeEmailId",
          "type": "string"
        },
        {
          "name": "collegeDoJ",
          "type": "uint256"
        },
        {
          "name": "collegeDateOfPassing",
          "type": "uint256"
        }
      ],
      "name": "startRegistration",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb7c2d050"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "studentAddress",
          "type": "address"
        }
      ],
      "name": "verifyStudentProfile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x18014d15"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "studentAddress",
          "type": "address"
        }
      ],
      "name": "approveRegistration",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x5179fc49"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "collegeAddress",
          "type": "address"
        }
      ],
      "name": "acceptRegistration",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb204e9f3"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "studentAddress",
          "type": "address"
        },
        {
          "name": "collegeAddress",
          "type": "address"
        }
      ],
      "name": "getRegistrationStatus",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x95d3113a"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "studentAddress",
          "type": "address"
        },
        {
          "name": "collegeAddress",
          "type": "address"
        }
      ],
      "name": "getCertificationStatus",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x92f0a140"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_collegeAddress",
          "type": "address"
        }
      ],
      "name": "startCertification",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x79554453"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_collegeAddress",
          "type": "address"
        }
      ],
      "name": "reqCertification",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xb08ab8ea"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_studentAddress",
          "type": "address"
        }
      ],
      "name": "issueCertification",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xa2ddb37c"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_studentAddress",
          "type": "address"
        },
        {
          "name": "_certid",
          "type": "uint256"
        },
        {
          "name": "_certContent",
          "type": "string"
        }
      ],
      "name": "addHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x4c787ef0"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "studentAddress",
          "type": "address"
        },
        {
          "name": "collegeAddress",
          "type": "address"
        }
      ],
      "name": "getHash",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf8cc1850"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_collegeAddress",
          "type": "address"
        }
      ],
      "name": "acceptCertification",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xcf14ae64"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_collegeAddress",
          "type": "address"
        }
      ],
      "name": "getCertContractAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x62efca38"
    }
  ]`,
  contractAddress: '0xE527345B8ba8aCa4440EE3723c6A61ad1C087d66',
  encodedCall: "instance.methods." + 'createStudent("saru",123,"saru@gmail.com")' + ".encodeABI()"
}


function doInteractionWithSC(privKey, accAddress, funcName) {
  let privateKey = privKey.substring(2, privKey.length)
  var abi = eval(param.abi);
  var contractAddress = param.contractAddress;

  var instance = new web3.eth.Contract(abi, contractAddress);
  let encodedCallParams = "instance.methods." + funcName + ".encodeABI()"
  var encodedCall = eval(encodedCallParams);
  var nonce, gasPrice;

  web3.eth.getTransactionCount(accAddress)
    .then((numberOfTxs) => {
      nonce = numberOfTxs;
      return web3.eth.getGasPrice();
    })
    .then((price) => {
      gasPrice = web3.utils.toBN(price);
      var gasLimit = 4000000;
      var txParams = {
        nonce: '0x' + nonce.toString(16),
        gasPrice: '0x' + gasPrice.toString(16),
        gasLimit: '0x' + gasLimit.toString(16),
        data: encodedCall,
        to: contractAddress
      };

      var tx = new EthereumTx(txParams);
      tx.sign(Buffer.from(privateKey, 'hex'));

      var strTx = '0x' + tx.serialize().toString('hex'); // PAY CLOSE ATENTION TO THE '0x'!!!!!

      web3.eth.sendSignedTransaction(strTx)
        .once('transactionHash', function (txid) {
          console.log('\n\ttxid: ' + txid + '\n');
        })
        .catch((ex) => {
          console.log(ex);
        })
    })
    .catch((ex) => {
      console.log(ex);
    })
}

// doInteractionWithSC(param);


module.exports = {
  doInteractionWithSC
}