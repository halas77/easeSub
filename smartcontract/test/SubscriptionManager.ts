const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Subscription manager contract deployed.", () => {
  const deployContract = async () => {
    const [owner, addr1] = await ethers.getSigners();

    const usdeToken = await ethers.deployContract("ERC20Mock");

    const SubscriptionManager = await ethers.deployContract(
      "SubscriptionManager",
      [usdeToken]
    );

    await SubscriptionManager.addServiceProvider(addr1.address);

    await SubscriptionManager.connect(addr1).createService(1);

    return { SubscriptionManager, usdeToken, owner, addr1 };
  };

  it("should be deployed successfully", async () => {
    const { SubscriptionManager } = await loadFixture(deployContract);

    const serviceId = await SubscriptionManager.serviceId();

    expect(serviceId).to.equal(1);
  });

  it("should create service and subscription", async () => {
    const { SubscriptionManager, owner } = await loadFixture(deployContract);
    const serviceId = await SubscriptionManager.serviceId();

    const Duration = {
      Monthly: 0,
      Yearly: 1,
    };

    console.log("owner", owner);

    await SubscriptionManager.connect(owner).createSubscription(serviceId, Duration.Monthly);

    const sub = await SubscriptionManager.subscriptions(owner, serviceId);

    console.log("sub", sub);

    expect(sub.active).to.equal(true);
  });
});
