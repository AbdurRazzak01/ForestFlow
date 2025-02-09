// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

// Define structure for storing Carbon Intensity Data
struct CarbonIntensityRecord {
    uint256 timestamp;
    uint256 intensity; // gCO₂/kWh
}

contract FCDCarbonIntensity is Ownable {
    mapping(uint256 => CarbonIntensityRecord) public intensityRecords;
    uint256[] public recordTimestamps;

    event CarbonIntensityAdded(uint256 timestamp, uint256 intensity);

    // 🔥 Constructor: Passes `msg.sender` as initial owner
    constructor(address initialOwner) Ownable(initialOwner) {}

    // 🔥 Add Carbon Intensity from API
    function addCarbonIntensity(uint256 _timestamp, uint256 _intensity) public onlyOwner {
        require(intensityRecords[_timestamp].timestamp == 0, "Record already exists");

        CarbonIntensityRecord memory record = CarbonIntensityRecord({
            timestamp: _timestamp,
            intensity: _intensity
        });

        intensityRecords[_timestamp] = record;
        recordTimestamps.push(_timestamp);

        emit CarbonIntensityAdded(_timestamp, _intensity);
    }

    // 🔥 Get Latest N Carbon Intensity Records
    function getLatestCarbonIntensity(uint256 count) public view returns (CarbonIntensityRecord[] memory) {
        uint256 recordsCount = recordTimestamps.length;
        uint256 fetchCount = recordsCount < count ? recordsCount : count;

        CarbonIntensityRecord[] memory latestRecords = new CarbonIntensityRecord[](fetchCount);
        for (uint256 i = 0; i < fetchCount; i++) {
            latestRecords[i] = intensityRecords[recordTimestamps[recordsCount - 1 - i]];
        }
        return latestRecords;
    }
}
