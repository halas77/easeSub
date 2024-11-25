import { ethers } from "hardhat"

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const getContractInstance = async () => {
  const campaign = await ethers.getContractFactory("SubscriptionManager");
  return campaign.attach(contractAddress);
};


const main = async () => {
    const [owner, address1, address2] = await ethers.getSigners();
    const campaignManager = await getContractInstance();

    console.log('campaignManager', campaignManager)
  };
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });