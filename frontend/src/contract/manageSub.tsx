import { toast } from "react-toastify";
import { getContract } from ".";

export const createNewSub = async ({
  serviceId,
  duration,
  price,
}: {
  serviceId: number;
  duration: number;
  price: string;
}) => {
  const contract = await getContract();
  try {
    const parsedPrice = parseInt(price);
    const res = await contract.createSubscription(serviceId, duration, {
      value: parsedPrice,
    });

    const tx = await res.wait();

    return tx;
  } catch (error) {
    console.log("error", error);
    toast.error("An unexpected error occurred");
  }
};
