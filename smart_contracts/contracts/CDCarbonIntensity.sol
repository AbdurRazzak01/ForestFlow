// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ContractRegistry } from "@flarenetwork/flare-periphery-contracts/coston/ContractRegistry.sol";
import { IJsonApiVerification } from "@flarenetwork/flare-periphery-contracts/coston/IJsonApiVerification.sol";
import { IJsonApi } from "@flarenetwork/flare-periphery-contracts/coston/IJsonApi.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct CarbonIntensityRecord {
    uint256 timestamp;
    uint256 intensity;
    bool verified;
}

contract FCDCarbonIntensity is Ownable {
    mapping(uint256 => CarbonIntensityRecord[]) public intensityRecords;
    uint256[] public recordTimestamps;

    event CarbonIntensityAdded(uint256 timestamp, uint256 intensity, bool verified);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function isJsonApiProofValid(IJsonApi.Proof calldata _proof) public view returns (bool) {
        return ContractRegistry.auxiliaryGetIJsonApiVerification().verifyJsonApi(_proof);
    }

    function addCarbonIntensity(IJsonApi.Proof calldata proof) public onlyOwner {
        require(isJsonApiProofValid(proof), "Invalid proof");

        (uint256 _timestamp, uint256 _intensity) = abi.decode(
            proof.data.responseBody.abi_encoded_data,
            (uint256, uint256)
        );

        CarbonIntensityRecord memory record = CarbonIntensityRecord({
            timestamp: _timestamp,
            intensity: _intensity,
            verified: true
        });

        intensityRecords[_timestamp].push(record);
        recordTimestamps.push(_timestamp);

        emit CarbonIntensityAdded(_timestamp, _intensity, true);
    }

    function getLatestCarbonIntensity(uint256 count) public view returns (CarbonIntensityRecord[] memory) {
        uint256 fetchCount = recordTimestamps.length < count ? recordTimestamps.length : count;

        CarbonIntensityRecord[] memory latestRecords = new CarbonIntensityRecord[](fetchCount);
        for (uint256 i = 0; i < fetchCount; i++) {
            latestRecords[i] = intensityRecords[recordTimestamps[recordTimestamps.length - 1 - i]][0];
        }
        return latestRecords;
    }

    function getVerificationHub() external view returns (IJsonApiVerification) {
        return ContractRegistry.auxiliaryGetIJsonApiVerification();
    }
}
