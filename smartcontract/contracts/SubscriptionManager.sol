// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract SubscriptionManager is Ownable, AccessControl {
    IERC20 public usdeToken;

    uint8 public serviceId;

    bytes32 public constant SERVICE_PROVIDER = keccak256("SERVICE_PROVIDER");

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
        uint256 nextPaymentDate;
        bool active;
        Duration duration;
    }

    mapping(uint8 => Service) public services;
    mapping(address => mapping(uint8 => Subscription)) public subscriptions;

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
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        usdeToken = _usdeToken;
    }

    function createService(uint128 price) external onlyRole(SERVICE_PROVIDER) {
        require(price > 0, "Price must be greater than 0");
        require(!services[serviceId].active, "Service already exists");

        serviceId++;

        services[serviceId] = Service({
            serviceProvider: msg.sender,
            price: price,
            active: true
        });

        emit ServiceCreated(serviceId, msg.sender, price);
    }

    function createSubscription(uint8 _serviceId, Duration duration) external {
        require(services[_serviceId].active, "Service is inactive");
        Service storage service = services[_serviceId];
        Subscription storage sub = subscriptions[msg.sender][_serviceId];

        require(!sub.active, "Subscription already exists");

        uint128 subscriptionAmount = calculateSubscriptionAmount(
            _serviceId,
            duration
        );

        require(
            usdeToken.transferFrom(
                msg.sender,
                service.serviceProvider,
                subscriptionAmount
            ),
            "Payment failed"
        );

        sub.subscriber = msg.sender;
        sub.price = subscriptionAmount;
        sub.nextPaymentDate =
            block.timestamp +
            (duration == Duration.Monthly ? 30 days : 365 days);
        sub.active = true;
        sub.duration = duration;

        emit SubscriptionCreated(msg.sender, _serviceId, service.price);
    }

    function cancelSubscription(uint8 _serviceId) external {
        Subscription storage sub = subscriptions[msg.sender][_serviceId];
        require(sub.active, "Subscription is inactive");

        sub.active = false;

        emit SubscriptionCancelled(msg.sender, _serviceId);
    }

    function executePayment(uint8 _serviceId) external {
        Subscription storage sub = subscriptions[msg.sender][_serviceId];
        require(sub.active, "Subscription is inactive");
        require(block.timestamp >= sub.nextPaymentDate, "Payment not due yet");

        Service storage service = services[_serviceId];
        require(
            usdeToken.transferFrom(
                msg.sender,
                service.serviceProvider,
                sub.price
            ),
            "Payment failed"
        );

        sub.nextPaymentDate =
            block.timestamp +
            (sub.duration == Duration.Monthly ? 30 days : 365 days);

        emit PaymentExecuted(msg.sender, _serviceId, sub.price);
    }

    function calculateSubscriptionAmount(
        uint8 _serviceId,
        Duration duration
    ) public view returns (uint128) {
        Service memory service = services[_serviceId];
        require(service.active, "Service is not active");

        if (duration == Duration.Monthly) {
            return service.price;
        } else if (duration == Duration.Yearly) {
            return (service.price * 12 * 7) / 10;
        } else {
            revert("Invalid duration type");
        }
    }

    function addServiceProvider(address user) public onlyOwner {
        _grantRole(SERVICE_PROVIDER, user);
    }
}
