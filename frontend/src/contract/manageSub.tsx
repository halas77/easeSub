import { getContract } from ".";

export const createNewSub = async ({
  serviceId,
  duration,
}: {
  serviceId: number;
  duration: number;
}) => {
  const contract = await getContract();
  try {
    console.log("serviceId", serviceId);
    console.log("duration", duration);

    console.log("contract", contract);
  } catch (error) {
    console.log("error", error);
  }
};
