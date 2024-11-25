import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  return contract;
};