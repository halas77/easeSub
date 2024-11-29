import { toast } from "react-toastify";
import { getContract } from ".";

export const CreateNewSub = async ({
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

export const CancelSub = async (serviceId: number) => {
  const contract = await getContract();
  try {
    console.log("serviceId", serviceId);

    const res = await contract.cancelSubscription(serviceId);

    const tx = await res.wait();

    return tx;
  } catch (error) {
    console.log("error", error);
    toast.error("An unexpected error occurred");
  }
};
