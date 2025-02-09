// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ForestToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("ForestToken", "FTK") Ownable(initialOwner) {
        _mint(initialOwner, 1000000 * 10**18); // Initial Supply of 1M FTK
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

contract ForestFlow is Ownable {
    struct User {
        string name;
        string email;
        bool registered;
    }

    struct ReforestationProject {
        string projectName;
        string projectLocation;
        uint256 estimatedCO2;
        uint256 minInvestment;
        address payable owner;
    }

    ForestToken public forestToken;
    uint256 public projectCounter;
    uint256 public carbonTokenPrice = 2 * 10**18; // 1 Carbon Token = 2 C2FLR
    uint256 public registrationReward = 10 * 10**18; // 10 FTK reward on first registration

    mapping(address => User) public users;
    mapping(uint256 => ReforestationProject) public projects;
    mapping(address => uint256) public carbonTokenBalance;

    event UserRegistered(address indexed user, string name, string email);
    event ProjectListed(uint256 indexed projectId, string projectName, string projectLocation, uint256 estimatedCO2, uint256 minInvestment);
    event InvestmentMade(uint256 indexed projectId, address indexed investor, uint256 amount);
    event CarbonTokenBought(address indexed buyer, uint256 tokenAmount);

    constructor(address _forestToken) Ownable(msg.sender) {
        forestToken = ForestToken(_forestToken);
    }

    function registerUser(string memory name, string memory email) external {
        require(!users[msg.sender].registered, "Already registered");

        users[msg.sender] = User({ name: name, email: email, registered: true });
        forestToken.mint(msg.sender, registrationReward); // Reward 10 FTK

        emit UserRegistered(msg.sender, name, email);
    }

    function listProject(string memory projectName, string memory projectLocation, uint256 estimatedCO2, uint256 minInvestment) external {
        projects[projectCounter] = ReforestationProject({
            projectName: projectName,
            projectLocation: projectLocation,
            estimatedCO2: estimatedCO2,
            minInvestment: minInvestment,
            owner: payable(msg.sender)
        });

        emit ProjectListed(projectCounter, projectName, projectLocation, estimatedCO2, minInvestment);
        projectCounter++;
    }

    function investInProject(uint256 projectId) external payable {
        require(msg.value >= projects[projectId].minInvestment, "Investment below minimum");

        projects[projectId].owner.transfer(msg.value); // Send C2FLR directly to the project owner

        emit InvestmentMade(projectId, msg.sender, msg.value);
    }

    function buyCarbonToken(uint256 tokenAmount) external payable {
        uint256 cost = tokenAmount * carbonTokenPrice;
        require(msg.value >= cost, "Not enough C2FLR sent");

        carbonTokenBalance[msg.sender] += tokenAmount;
        emit CarbonTokenBought(msg.sender, tokenAmount);
    }
}
