import { ethers } from "ethers";
import { getContract } from ".";

export const getServiceId = async () => {
  const contract = await getContract();

  const res = await contract.serviceId();

  return res;
};

export const createNewService = async (price: string) => {
  const contract = await getContract();

  const parsedValue = ethers.utils.parseEther(price);

  try {
    console.log("price", price);
    const res = await contract.createService(parsedValue);
    await res.wait();

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
