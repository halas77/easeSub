// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SubscriptionManager.sol";

contract DynamicPricing is SubscriptionManager {


    function setServicePrice(uint256 serviceId, uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");

        services[serviceId].price = newPrice;
    }

    function applyDiscount(uint256 serviceId, address user) public view returns (uint256) {
        Subscription memory sub = subscriptions[user][serviceId];
        require(sub.active, "Subscription is inactive");

        uint256 discount;

        
        if (block.timestamp >= sub.nextPaymentDate - (6 * 30 days)) {
            discount = (sub.amount * 5) / 100;
        }

        return sub.amount - discount;
    }

    function adjustPrice(uint256 serviceId) public onlyOwner {
        Service storage service = services[serviceId];

        uint256 newPrice = service.price + (service.price * 2) / 100;
        service.price = newPrice;
    }

    function getDynamicPrice(uint256 serviceId, address user) public view returns (uint256) {
        Subscription memory sub = subscriptions[user][serviceId];

        uint256 finalPrice = sub.amount;

        finalPrice = applyDiscount(serviceId, user);

        return finalPrice;
    }
}
