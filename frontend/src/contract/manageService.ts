import { getContract } from ".";

export const getServiceId = async () => {
  const contract = await getContract();

  const res = await contract.serviceId();

  return res;
};

export const createNewService = async (price: string) => {
  const contract = await getContract();

  try {
    console.log("price", price);
    const res = await contract.createService(price);
    await res.wait();

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
