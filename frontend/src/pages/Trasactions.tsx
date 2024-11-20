import Layout from "../components/Layout";
import TransactionCard from "../components/TransactionCard";

const Trasactions = () => {
  return (
    <Layout>
      <div className=" px-10 space-y-3 w-full pt-10">
        <p className="font-semibold text-3xl pl-1 text-gray-700 ">
          Transactions
        </p>
        <p className="text-xs text-gray-500 pb-2 pl-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          illum.
        </p>
        <div className="flex flex-col divide-y w-full bg-white rounded-3xl p-4 max-w-4xl">
          {[0, 1, 2, 3].map((item) => (
            <TransactionCard
              amount="20"
              company="Lorem ipsum"
              date="Sep 02, 204"
              type="deposit"
              key={item}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Trasactions;
