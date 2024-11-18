// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionManager is Ownable {
    IERC20 public usdeToken;
    enum Duration {
        Monthly,
        Yearly
    }

    struct Service {
        address serviceProvider;
        uint128 price;
        bool active;
    }

    struct Subscription {
        address subscriber;
        uint128 price;
        uint64 nextPaymentDate;
        bool active;
        Duration duration;
    }

    mapping(uint256 => Service) public services;
    mapping(address => mapping(uint256 => Subscription)) public subscriptions;

    event ServiceCreated(
        uint64 indexed serviceId,
        address indexed provider,
        uint128 price
    );
    event SubscriptionCreated(
        address indexed subscriber,
        uint64 indexed serviceId,
        uint128 amount
    );
    event SubscriptionUpdated(
        address indexed subscriber,
        uint64 indexed serviceId,
        uint128 amount
    );
    event SubscriptionCancelled(
        address indexed subscriber,
        uint64 indexed serviceId
    );
    event PaymentExecuted(
        address indexed subscriber,
        uint64 indexed serviceId,
        uint128 amount
    );

    constructor(IERC20 _usdeToken) Ownable(msg.sender) {
        usdeToken = _usdeToken;
    }

    function createService(uint64 serviceId, uint128 price) external onlyOwner {
        require(price > 0, "Price must be greater than 0");
        require(!services[serviceId].active, "Service already exists");

        services[serviceId] = Service({
            serviceProvider: msg.sender,
            price: price,
            active: true
        });

        emit ServiceCreated(serviceId, msg.sender, price);
    }

    function createSubscription(uint64 serviceId, Duration duration) external {
        require(services[serviceId].active, "Service is inactive");
        Service storage service = services[serviceId];
        Subscription storage sub = subscriptions[msg.sender][serviceId];

        require(!sub.active, "Subscription already exists");

        uint128 subscriptionAmount = calculateSubscriptionAmount(
            serviceId,
            duration
        );

        sub.subscriber = msg.sender;
        sub.amount = subscriptionAmount;
        sub.nextPaymentDate =
            block.timestamp +
            (duration == Duration.Monthly ? 30 days : 365 days);
        sub.active = true;
        sub.duration = duration;

        emit SubscriptionCreated(msg.sender, serviceId, service.price);
    }

    function cancelSubscription(uint256 serviceId) external {
        Subscription storage sub = subscriptions[msg.sender][serviceId];
        require(sub.active, "Subscription is inactive");

        sub.active = false;

        emit SubscriptionCancelled(msg.sender, serviceId);
    }

    function executePayment(uint256 serviceId) external {
        Subscription storage sub = subscriptions[msg.sender][serviceId];
        require(sub.active, "Subscription is inactive");
        require(block.timestamp >= sub.nextPaymentDate, "Payment not due yet");

        Service storage service = services[serviceId];
        require(
            usdeToken.transferFrom(
                msg.sender,
                service.serviceProvider,
                sub.amount
            ),
            "Payment failed"
        );

        sub.nextPaymentDate =
            block.timestamp +
            (sub.duration == Duration.Monthly ? 30 days : 365 days);

        emit PaymentExecuted(msg.sender, serviceId, sub.amount);
    }

    function isSubscriptionActive(
        address user,
        uint64 serviceId
    ) external view returns (bool) {
        return subscriptions[user][serviceId].active;
    }

    function calculateSubscriptionAmount(
        uint64 serviceId,
        Duration duration
    ) public view returns (uint128) {
        Service memory service = services[serviceId];
        require(service.active, "Service is not active");

        if (duration == Duration.Monthly) {
            return service.price;
        } else if (duration == Duration.Yearly) {
            return (service.price * 12 * 7) / 10;
        } else {
            revert("Invalid duration type");
        }
    }
}
