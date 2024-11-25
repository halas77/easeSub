const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SubscriptionManagerModule = buildModule(
  "SubscriptionManagerModule",
  (m) => {
    const USDe = m.contract("ERC20Mock");

    const SubscriptionManager = m.contract("SubscriptionManager", [USDe]);

    return { USDe, SubscriptionManager };
  }
);

module.exports = SubscriptionManagerModule;
