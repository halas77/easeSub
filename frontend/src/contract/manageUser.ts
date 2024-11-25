import { getContract } from ".";

export const addServiceProvider = async (user: string) => {
  const contract = await getContract();

  try {
    console.log("user", user);

    const res = await contract.addServiceProvider(user);
    await res.wait();

    console.log("Ended success");
  } catch (error) {
    console.log("error", error);
  }
};
