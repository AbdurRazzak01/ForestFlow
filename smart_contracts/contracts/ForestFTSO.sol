// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {TestFtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {IFtsoFeedIdConverter} from "@flarenetwork/flare-periphery-contracts/coston2/IFtsoFeedIdConverter.sol";
import {IFastUpdatesConfiguration} from "@flarenetwork/flare-periphery-contracts/coston2/IFastUpdatesConfiguration.sol";

contract FlareUSDToFLRConverter {
    TestFtsoV2Interface internal ftsoV2;
    IFtsoFeedIdConverter internal feedIdConverter;
    
    bytes21 public flrUsdId = 0x01464c522f55534400000000000000000000000000; // USD/FLR feed ID

    constructor() {
        ftsoV2 = ContractRegistry.getTestFtsoV2();
        feedIdConverter = ContractRegistry.getFtsoFeedIdConverter();
    }

    // 🔥 Get the latest USD/FLR price
    function getFlrUsdPrice() public view returns (uint256, uint8, uint64) {
        (uint256 feedValue, int8 decimals, uint64 timestamp) = ftsoV2.getFeedById(flrUsdId);
        return (feedValue, uint8(decimals), timestamp);
    }

    // 🔥 Convert a given USD amount to FLR
    function convertUsdToFlr(uint256 usdAmount) public view returns (uint256) {
        (uint256 feedValue, uint8 decimals, ) = getFlrUsdPrice();
        
        require(feedValue > 0, "Invalid price feed data");

        // Convert USD to FLR using the price feed: usdAmount / (feedValue / 10^decimals)
        uint256 flrAmount = (usdAmount * (10 ** decimals)) / feedValue;
        return flrAmount;
    }

    // 🔥 Get any feed price using its feedId
    function getFeedPrice(bytes21 feedId) external view returns (uint256, uint8, uint64) {
        (uint256 feedValue, int8 decimals, uint64 timestamp) = ftsoV2.getFeedById(feedId);
        return (feedValue, uint8(decimals), timestamp);
    }

    // 🔥 Get price feed by name (e.g., "CARBON", "BTC/USD", etc.)
    function getFeedPriceByName(string memory feedName) external view returns (uint256, uint8, uint64) {
        bytes21 feedId = feedIdConverter.getFeedId(1, feedName); // 01 for crypto feeds
        (uint256 feedValue, int8 decimals, uint64 timestamp) = ftsoV2.getFeedById(feedId);
        return (feedValue, uint8(decimals), timestamp);
    }

    // 🔥 Get all available price feeds (feedIds)
    function getAvailablePriceFeeds() public view returns (bytes21[] memory) {
        IFastUpdatesConfiguration fastUpdatesConfiguration = ContractRegistry.getFastUpdatesConfiguration();
        IFastUpdatesConfiguration.FeedConfiguration[] memory feedConfigurations = fastUpdatesConfiguration.getFeedConfigurations();
        
        bytes21[] memory result = new bytes21[](feedConfigurations.length);
        for (uint256 i = 0; i < feedConfigurations.length; i++) {
            result[i] = feedConfigurations[i].feedId;
        }
        return result;
    }

    // 🔥 Get available price feed names
    function getAvailablePriceFeedNames() public view returns (string[] memory feedNames) {
        bytes21[] memory feedIds = getAvailablePriceFeeds();
        feedNames = new string[](feedIds.length);
        for (uint256 i = 0; i < feedIds.length; i++) {
            feedNames[i] = string(abi.encodePacked(feedIds[i]));
        }
    }
}
