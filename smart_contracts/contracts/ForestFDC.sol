// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston/ContractRegistry.sol";
import {IFdcHub} from "@flarenetwork/flare-periphery-contracts/coston/IFdcHub.sol";
import {IFdcRequestFeeConfigurations} from "@flarenetwork/flare-periphery-contracts/coston/IFdcRequestFeeConfigurations.sol";
import {IJsonApiVerification} from "@flarenetwork/flare-periphery-contracts/coston/IJsonApiVerification.sol";
import {IJsonApi} from "@flarenetwork/flare-periphery-contracts/coston/IJsonApi.sol";

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// Define the structure for storing Carbon Sequestration Data
struct CarbonProject {
    string projectName;
    string location;
    uint256 estimatedSequestration; // In tons of CO₂
    uint256 apiUid;
    bool verified;
}

struct CarbonDataDTO {
    string projectName;
    string location;
    uint256 estimatedSequestration;
    uint256 apiUid;
}

contract FlareFDCCarbonSequestration {
    mapping(uint256 => CarbonProject) public carbonProjects;
    uint256[] public projectIds;

    function isJsonApiProofValid(IJsonApi.Proof calldata _proof) public view returns (bool) {
        return ContractRegistry.auxiliaryGetIJsonApiVerification().verifyJsonApi(_proof);
    }

    function addCarbonProject(IJsonApi.Proof calldata data) public {
        require(isJsonApiProofValid(data), "Invalid proof");

        // Decode data from the external API response
        CarbonDataDTO memory dto = abi.decode(
            data.data.responseBody.abi_encoded_data,
            (CarbonDataDTO)
        );

        require(carbonProjects[dto.apiUid].apiUid == 0, "Project already exists");

        // Store the carbon sequestration project
        CarbonProject memory project = CarbonProject({
            projectName: dto.projectName,
            location: dto.location,
            estimatedSequestration: dto.estimatedSequestration,
            apiUid: dto.apiUid,
            verified: true
        });

        carbonProjects[dto.apiUid] = project;
        projectIds.push(dto.apiUid);
    }

    function getAllCarbonProjects() public view returns (CarbonProject[] memory) {
        CarbonProject[] memory result = new CarbonProject[](projectIds.length);
        for (uint256 i = 0; i < projectIds.length; i++) {
            result[i] = carbonProjects[projectIds[i]];
        }
        return result;
    }

    function getFdcHub() external view returns (IFdcHub) {
        return ContractRegistry.getFdcHub();
    }

    function getFdcRequestFeeConfigurations() external view returns (IFdcRequestFeeConfigurations) {
        return ContractRegistry.getFdcRequestFeeConfigurations();
    }
}
