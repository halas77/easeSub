// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract SubscriptionManager is Ownable, AccessControl {
    uint8 public serviceId;
    bytes32 public constant SERVICE_PROVIDER = keccak256("SERVICE_PROVIDER");

    // duration
    enum Duration {
        Monthly,
        Yearly
    }

    // service struct
    struct Service {
        address serviceProvider;
        uint128 price;
        bool active;
    }

    // Subscription
    struct Subscription {
        address subscriber;
        uint128 price;
        uint256 nextPaymentDate;
        bool active;
        Duration duration;
    }

    // events
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
    event SubscriptionCancelled(
        address indexed subscriber,
        uint64 indexed serviceId
    );
    event PaymentExecuted(
        address indexed subscriber,
        uint64 indexed serviceId,
        uint128 amount
    );

    // mapping
    mapping(uint8 => Service) public services;
    mapping(address => mapping(uint8 => Subscription)) public subscriptions;

    constructor() Ownable(msg.sender) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // create service
    function createService(uint128 _price) public onlyRole(SERVICE_PROVIDER) {
        require(_price > 0 ether, "Price must be greater than 0");

        serviceId++;
        require(!services[serviceId].active, "Service already exists");

        services[serviceId] = Service({
            serviceProvider: msg.sender,
            price: _price,
            active: true
        });

        emit ServiceCreated(serviceId, msg.sender, _price);
    }

    // create subscription
    function createSubscription(uint8 _serviceId, Duration _duration)
        external
        payable
    {
        require(services[_serviceId].active, "Service is inactive");
        Service storage service = services[_serviceId];
        Subscription storage sub = subscriptions[msg.sender][_serviceId];
        require(!sub.active, "Subscription already exists");

        uint128 subscriptionAmount = calculateSubscriptionAmount(
            _serviceId,
            _duration
        );

        require(msg.value >= subscriptionAmount, "Insufficient Ether sent");
        payable(service.serviceProvider).transfer(subscriptionAmount);

        sub.subscriber = msg.sender;
        sub.price = subscriptionAmount;
        sub.nextPaymentDate =
            block.timestamp +
            (_duration == Duration.Monthly ? 30 days : 365 days);
        sub.active = true;
        sub.duration = _duration;

        emit SubscriptionCreated(msg.sender, _serviceId, service.price);
    }

    // cancel subscription
    function cancelSubscription(uint8 _serviceId) external {
        Subscription storage sub = subscriptions[msg.sender][_serviceId];
        require(sub.active, "Subscription is inactive");

        sub.active = false;

        emit SubscriptionCancelled(msg.sender, _serviceId);
    }

    // execute payment
    function executePayment(uint8 _serviceId) external payable {
        Subscription storage sub = subscriptions[msg.sender][_serviceId];
        require(sub.active, "Subscription is inactive");
        require(block.timestamp >= sub.nextPaymentDate, "Payment not due yet");

        Service storage service = services[_serviceId];
        payable(service.serviceProvider).transfer(sub.price);

        sub.nextPaymentDate =
            block.timestamp +
            (sub.duration == Duration.Monthly ? 30 days : 365 days);

        emit PaymentExecuted(msg.sender, _serviceId, sub.price);
    }

    // calculate subscription amount
    function calculateSubscriptionAmount(uint8 _serviceId, Duration _duration)
        public
        view
        returns (uint128)
    {
        Service memory service = services[_serviceId];
        require(service.active, "Service is not active");

        if (_duration == Duration.Monthly) {
            return service.price;
        } else if (_duration == Duration.Yearly) {
            return (service.price * 12 * 70) / 100;
        } else {
            revert("Invalid duration type");
        }
    }

    // add service provider role
    function addServiceProvider(address user) public onlyOwner {
        _grantRole(SERVICE_PROVIDER, user);
    }
}