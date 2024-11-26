// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SubscriptionManager.sol";

contract DynamicPricing is SubscriptionManager {
    function setServicePrice(uint8 _serviceId, uint128 newPrice) external {
        Service storage service = services[_serviceId];
        require(
            service.serviceProvider != address(0),
            "Service does not exist"
        );

        // Only the service provider can update the price
        require(
            service.serviceProvider == msg.sender,
            "Only service owner can update the price"
        );

        // Update the price
        service.price = newPrice;
    }

    function applyDiscount(
        uint8 _serviceId,
        address user
    ) public view returns (uint128) {
        Subscription memory sub = subscriptions[user][_serviceId];
        require(sub.active, "Subscription is inactive");

        uint128 discount;

        if (block.timestamp >= sub.nextPaymentDate - (6 * 30 days)) {
            discount = (sub.price * 5) / 100;
        }

        return sub.price - discount;
    }

    function adjustPrice(uint8 _serviceId) public {
        Service storage service = services[_serviceId];

        require(
            service.serviceProvider == msg.sender,
            "Only service owner can update the price."
        );

        uint128 newPrice = service.price + (service.price * 2) / 100;
        service.price = newPrice;
    }

    function getDynamicPrice(
        uint8 _serviceId,
        address user
    ) public view returns (uint128) {
        Subscription memory sub = subscriptions[user][_serviceId];

        uint128 finalPrice = sub.price;

        finalPrice = applyDiscount(_serviceId, user);

        return finalPrice;
    }
}
