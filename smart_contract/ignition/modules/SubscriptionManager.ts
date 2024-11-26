const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SubscriptionManagerModule = buildModule(
  "SubscriptionManagerModule",
  (m) => {
    const SubscriptionManager = m.contract("SubscriptionManager");

    return { SubscriptionManager };
  }
);

module.exports = SubscriptionManagerModule;
