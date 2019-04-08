pragma solidity ^0.5.0;

contract RegistrationAndCertificateContractFactory {

    struct Student {
        string fullName;
        uint phoneNumber;
        string emailId;
        address[] registrationContracts;
        mapping(address => address) registrationContractByCollege;
        address[] certificationContracts;
        mapping(address=>address) certificateContractsByCollege;
    }
    
    struct College {
        string instituteName;
        string instituteCode;
        string instituteAISHECode;
        address[] registrationContracts; // if the status is "Accept Registration" we need not show it under verify profile(other operations)
        mapping(address => address) registrationContractByStudent;
        address[] certificationContracts;
        mapping(address=>address) certificateContractsByStudent;
    }
    
    Student[]  studentList;
    mapping(address => Student) studentsInfo;
    
    College[]  collegeList;
    mapping(address => College) collegesInfo;
    
    function getFirstCollege(address _studentAddress) public view returns(address){
        return collegesInfo[msg.sender].registrationContractByStudent[_studentAddress];
    }
    function getFirstStudent() public view returns(address){
        return studentsInfo[msg.sender].registrationContracts[0];
    }

    function cRegistrationContract() public view returns(address){
        return collegesInfo[msg.sender].registrationContracts[0];
    }

    function sCertificationContract() public view returns(address){
        return studentsInfo[msg.sender].certificationContracts[0];
    }

    function cCertificationContract() public view returns(address){
        return collegesInfo[msg.sender].certificationContracts[0];
    }

    function getStudentData() public view returns(string memory,uint,string memory){
        string memory _name = studentsInfo[msg.sender].fullName;
        uint _phoneNumber = studentsInfo[msg.sender].phoneNumber;
        string memory _emailId = studentsInfo[msg.sender].emailId;  
        return(_name,_phoneNumber,_emailId);
    }

    function getCollegeData() public view returns(string memory, string memory, string memory){
        
        string memory _instituteName=collegesInfo[msg.sender].instituteName;
        string memory _instituteCode=collegesInfo[msg.sender].instituteCode;
        string memory _instituteAISHECode=collegesInfo[msg.sender].instituteAISHECode;
        return(_instituteName,_instituteCode,_instituteAISHECode);
    }

    function regStuCollAddress(address _regContractAddress) public view returns(address, address){
        RegistrationContract registrationContract = RegistrationContract(_regContractAddress);
        address studentAddress = registrationContract.getStudentAddress();
        address collegeAddress = registrationContract.getCollegeAddress();
        return(studentAddress,collegeAddress);

    }

    function certStuCollAddress(address _certContractAddress) public view returns(address, address){
        CertificateContract certificateContract = CertificateContract(_certContractAddress);
        address studentAddress = certificateContract.getStudentAddress();
        address collegeAddress = certificateContract.getCollegeAddress();
        return(studentAddress,collegeAddress);

    }
    /*function getSample(string memory _value) public view returns(string memory){
         return(_value);
     }  */
    /*function getRegisteredStudentData(address _studentAddress) public view returns(string memory,string memory,uint,uint){
        
    }  */

   /* function regCollegeList() public view returns(College[] memory){
        return(collegeList);
    } */
    
    function createStudent( string memory name, uint phoneNumber,  string memory emailId) public doesStudentExist(msg.sender){
        Student memory newStudent = Student(name, phoneNumber,emailId, new address[](0),  new address[](1) );
        studentList.push(newStudent);
        studentsInfo[msg.sender] = newStudent;
    }
    
    
    function createCollege(string memory instituteName, string memory instituteCode, string memory instituteAISHECode) public {
        College memory newCollege = College(instituteName, instituteCode, instituteAISHECode, new address[](0),  new address[](1));
        collegeList.push(newCollege);
        collegesInfo[msg.sender] = newCollege;
    }
    
    modifier doesStudentExist(address studentAddress) {
        // check if studentAddress is present in studentList or not.
        _;
    }
    
    modifier doesCollegeExist(address collegeAddress) {
        // check if collegeAddress is present in collegeList or not
        _;
    }
    
    modifier notAlreadyRegistered(address studentAddress, address collegeAddress) {
        // check if collegeStudentRegistrationContracts[collegeAddress][studentAddress] is empty or notAlreadyRegistered
        _;
    }
    
    function startRegistration(
        address collegeAddress, string memory collegeRegNumber, string memory collegeEmailId, uint collegeDoJ, uint collegeDateOfPassing) doesStudentExist(msg.sender) doesCollegeExist(collegeAddress) notAlreadyRegistered(msg.sender, collegeAddress) public{
        RegistrationContract newRegistrationContract = new 
        RegistrationContract(msg.sender, collegeAddress, collegeRegNumber, collegeEmailId, collegeDoJ, collegeDateOfPassing);
        studentsInfo[msg.sender].registrationContracts.push(address(newRegistrationContract));
        studentsInfo[msg.sender].registrationContractByCollege[collegeAddress] = address(newRegistrationContract);
        collegesInfo[collegeAddress].registrationContracts.push(address(newRegistrationContract));
        collegesInfo[collegeAddress].registrationContractByStudent[msg.sender] = address(newRegistrationContract);
    }
    
    function verifyStudentProfile(address studentAddress) public{
        //address registrationContractAddress = collegesInfo[msg.sender].registrationContractByStudent[studentAddress];
        RegistrationContract registrationContract = RegistrationContract(collegesInfo[msg.sender].registrationContractByStudent[studentAddress]);
        registrationContract.verifyStudentProfile();
    }
    
    
    function approveRegistration(address studentAddress) public
    {
        address registrationContractAddress = collegesInfo[msg.sender].registrationContractByStudent[studentAddress];
        RegistrationContract registrationContract = RegistrationContract(registrationContractAddress);
        registrationContract.approveRegistration();
    }
    
    function acceptRegistration(address collegeAddress) public
    {
        address registrationContractAddress = studentsInfo[msg.sender].registrationContractByCollege[collegeAddress];
        RegistrationContract registrationContract = RegistrationContract(registrationContractAddress);
        registrationContract.acceptRegistration();
    }
    
    function getRegistrationStatus(address studentAddress, address collegeAddress) public view returns (string memory) {
        address registrationContractAddress = studentsInfo[studentAddress].registrationContractByCollege[collegeAddress];
        RegistrationContract registrationContract = RegistrationContract(registrationContractAddress);
        return registrationContract.getRegistrationStatus();
    }

    function getCertificationStatus(address studentAddress, address collegeAddress) public view returns (string memory) {
        address certificateContractAddress = studentsInfo[studentAddress].certificateContractsByCollege[collegeAddress];
        CertificateContract certificateContract = CertificateContract(certificateContractAddress);
        return certificateContract.getCertificationStatus();
        
    }
    
    function startCertification(address _collegeAddress) public{
        CertificateContract certContract = new CertificateContract(_collegeAddress);
        studentsInfo[msg.sender].certificationContracts.push(address(certContract));
        studentsInfo[msg.sender].certificateContractsByCollege[_collegeAddress] = address(certContract) ;
    
        collegesInfo[_collegeAddress].certificationContracts.push(address(certContract));
        collegesInfo[_collegeAddress].certificateContractsByStudent[msg.sender] = address(certContract);

        // reqCertification
        address regContract = studentsInfo[msg.sender].registrationContractByCollege[_collegeAddress];
        certContract.requestCertification(_collegeAddress,regContract);
    }
    
    function reqCertification(address _collegeAddress) public{
        CertificateContract certContract = CertificateContract(studentsInfo[msg.sender].certificateContractsByCollege[_collegeAddress]);
        address regContract = studentsInfo[msg.sender].registrationContractByCollege[_collegeAddress];
        certContract.requestCertification(_collegeAddress,regContract);
        
    }
    function issueCertification(address _studentAddress /*, uint _certid, string memory _certContent*/) public{
        CertificateContract certContract = CertificateContract(collegesInfo[msg.sender].certificateContractsByStudent[_studentAddress]);
        certContract.issueCertificate();  
        
        // Add Hash
       // certContract.setCertificate(_certid,_certContent); 
    }

    function addHash(address _studentAddress,uint _certid, string memory _certContent) public {
        CertificateContract certContract = CertificateContract(collegesInfo[msg.sender].certificateContractsByStudent[_studentAddress]);
        certContract.setCertificate(_certid,_certContent);
    } 


    function getHash(address studentAddress, address collegeAddress) public view returns (string memory) {
        address certificateContractAddress = studentsInfo[studentAddress].certificateContractsByCollege[collegeAddress];
        CertificateContract certificateContract = CertificateContract(certificateContractAddress);
        return certificateContract.getCertificate();
        
    }
    function acceptCertification(address _collegeAddress) public{
        CertificateContract certContract = CertificateContract(studentsInfo[msg.sender].certificateContractsByCollege[_collegeAddress]);
        certContract.acceptCertificate();
        
    }
    function getCertContractAddress(address _collegeAddress) public view returns(address){
        return studentsInfo[msg.sender].certificateContractsByCollege[_collegeAddress];
    } 
    
}

contract RegistrationContract {
    address public studentAddress;
    address public collegeAddress;
        
    uint a = 0;
    struct StudentInfo {
        string collegeRegNumber;
        string collegeEmailId;
        uint collegeDoJ;
        uint collegeDateOfPassing;
    }
        
    StudentInfo studentInfo;
         
    constructor(
        address _studentAddress, address _collegeAddress, string memory collegeRegNumber, string memory collegeEmailId, uint collegeDoJ, uint collegeDateOfPassing) public{
        studentAddress = _studentAddress;
        collegeAddress = _collegeAddress;
        studentInfo = StudentInfo(collegeRegNumber, collegeEmailId, collegeDoJ, collegeDateOfPassing);
    }
        
        
    enum Stages {
        RequestforRegistration,
        VerifyStudentProfile,
        ApproveRegistration,
        AcceptRegistration
    }
        
    Stages public stage = Stages.RequestforRegistration;
    uint public creationTime = now;
        
    modifier atStage(Stages _stage) {
        require(
            stage == _stage,
            "Error atStage modifier");
        _;
    }
        //  // This modifier goes to the next stage
        // // after the function is done.
    modifier transitionNext(){
        _;
        nextStage();
    }
    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }
        
      
    modifier isStudent(address addr) {
        require(
            addr == studentAddress,
            "Error modifier isStudent");
        _;
    }
      
    modifier isCollege(address addr) {
        require(
            addr == collegeAddress,
            "Error modifier isCollege");
        _;
    }
        
    function getRegistrationStatus() public view returns (string memory) {
        if(Stages.RequestforRegistration == stage){
            return "RequestforRegistration";
        }
        if(Stages.VerifyStudentProfile == stage){
            return "VerifyStudentProfile";
        }
        if(Stages.ApproveRegistration == stage){
            return "ApproveRegistration";
        }
        if(Stages.AcceptRegistration == stage){
            return "AcceptRegistration";
        }
    }
        
        
    function verifyStudentProfile() public atStage(Stages.RequestforRegistration) isCollege(tx.origin) transitionNext
    {
            
    }
        
    function approveRegistration() public atStage(Stages.VerifyStudentProfile) isCollege(tx.origin) transitionNext
    {
            
    }
        
    function acceptRegistration() public atStage(Stages.ApproveRegistration) isStudent(tx.origin) transitionNext
    {
            
    }
        
    function getStudentAddress() public view returns(address){
        return studentAddress;
    }
    function getCollegeAddress() public view returns(address){
        return collegeAddress;
    }
    function getStage() public view returns(uint){
        return uint(stage);
    }
        
}

contract CertificateContract {
    
    uint public test = 0;
    address public issuerAddress;
    address public recipientAddress;
        
    uint256 public certId;
    string public certContent;

    enum CertificateStages {
        AcceptingCertificateRequest,
        RequestCertificate,
        IssueCertificate,
        acceptCertificate
    }

    CertificateStages public stage = CertificateStages.AcceptingCertificateRequest;

    function setCertificate(uint _certid, string memory _certContent) public {
        certId = _certid;
        certContent = _certContent;
    }

    function getCertificate() public view returns (string memory){
        return certContent;
    }


    modifier isApproved(address _collegeAddress,address _studentAddress,address _regAddress){
        RegistrationContract regContract = RegistrationContract(_regAddress);
        require(_collegeAddress == regContract.getCollegeAddress());
        require(_studentAddress == regContract.getStudentAddress());
        require(2 < regContract.getStage());
        _;
    }
    modifier atStage(CertificateStages _stage) {
        require(stage == _stage);
        _;
    }
    modifier isStudent(address addr) {
        require(addr == recipientAddress);
        _;
    }
    modifier isCollege(address addr) {
        require(addr == issuerAddress);
        _;
    }
    modifier transitionNext(){
        _;
        nextStage();
    }
    function nextStage() internal {
        stage = CertificateStages(uint(stage) + 1);
    }


    constructor(address _collegeAddress) public{
        issuerAddress = _collegeAddress;
        recipientAddress = tx.origin;
    
    }

    
// issue certificate only to registered students in a particular college
    function issueCertificate() 
    atStage(CertificateStages.RequestCertificate)
    isCollege(tx.origin)
    transitionNext
    public{
     
    }
 // can be called by student of partical college
    function requestCertification(address _collegeAddress,address _regAddress) 
        atStage(CertificateStages.AcceptingCertificateRequest)
        isApproved(_collegeAddress,tx.origin,_regAddress) 
        transitionNext
    public{
     
    }

// can be accepted by student
    function acceptCertificate() 
        atStage(CertificateStages.IssueCertificate)
        isStudent(tx.origin)
        transitionNext
        public{
    
    }    

    function getCertificationStatus() public view returns (string memory) {
        if(CertificateStages.AcceptingCertificateRequest == stage){
            return "AcceptingCertificateRequest";
            }
        if(CertificateStages.RequestCertificate == stage){
            return "RequestCertificate";
        }
        if(CertificateStages.IssueCertificate == stage){
            return "IssueCertificate";
        }
        if(CertificateStages.acceptCertificate == stage){
            return "acceptCertificate";
        }
    }

    function getStudentAddress() public view returns(address){
        return recipientAddress;
    }
    function getCollegeAddress() public view returns(address){
        return issuerAddress;
    }

}