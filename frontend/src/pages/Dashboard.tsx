import Layout from "../components/Layout";
import SubscriptionCard from "../components/SubscriptionCard";
import TransactionCard from "../components/TransactionCard";
import UpcomingCard from "../components/UpcomingCard";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-2 md:px-10 w-full flex justify-between items-center">
        <div className="w-full">
          <Welcome />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="pt-10 space-y-3 w-full">
              <p className="font-semibold text-xl text-gray-700 ">
                Recent transactions
              </p>
              <p className="text-xs text-gray-500 pb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto, illum.
              </p>
              <div className="flex flex-col divide-y w-full bg-white rounded-3xl p-4 border border-gray-100">
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
            <div className="pt-10 space-y-3 w-full">
              <p className="font-semibold text-xl text-gray-700">
                Upcoming fee
              </p>
              <p className="text-xs text-gray-500 pb-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto, illum.
              </p>
              <div className="w-full custom-gradient rounded-3xl p-4">
                <UpcomingCard />
              </div>
            </div>
          </div>
          <div className="pt-10 space-y-3 w-full">
            <p className="font-semibold text-xl text-gray-700 ">
              Top services
            </p>
            <p className="text-xs text-gray-500 pb-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Architecto, illum.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((item) => (
                <SubscriptionCard key={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
