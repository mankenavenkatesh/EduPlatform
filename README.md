# Education Platform

This repo comes with everything you need to start for education platform using smart contracts from a react app. 

## Setting Up

### Setting up blockchain and deploying smart contracts
1. Installation
 you can install Truffle globally 
    ```javascript
    npm install -g truffle  
    Install and start Ganache
    ```

2. Clone the repo.
   ```
   git clone https://github.com/mankenavenkatesh/EduPlatform.git
   git checkout NodeIntegration
   ```

4. Compile and migrate the smart contracts. 
    ```javascript
    truffle compile
    truffle migrate --reset
    ```

### Start IPFS daemon locally.
https://github.com/mankenavenkatesh/ipfs-file-upload-download

### Running the backend

5. In the `backend` directory, we run the node app. 
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd backend
    npm install
    node server.js
    ```

### Running frontend
5. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm install
    npm run start
    open http://localhost:3000/student
    ```

#### Updating Smartcontracts and Testing
6. Truffle can run tests written in Solidity or JavaScript against your smart contracts.
    ```javascript
    truffle test
    ```

7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

8. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```
