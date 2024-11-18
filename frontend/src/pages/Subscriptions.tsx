import Layout from "../components/Layout";
import SubscriptionCard from "../components/SubscriptionCard";

const Subscriptions = () => {
  return (
    <Layout>
      <div className="px-10 space-y-3 w-full">
        <p className="font-semibold text-2xl text-gray-700 ">
          Subscribed services
        </p>
        <p className="text-xs text-gray-500 pb-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          illum.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((item) => (
            <SubscriptionCard key={item} />
          ))}
        </div>
      </div>
      <div className="px-10 py-10 space-y-3 w-full">
        <p className="font-semibold text-xl text-gray-700 ">Popular services</p>
        <p className="text-xs text-gray-500 pb-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          illum.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3, 5, 6, 7, 8].map((item) => (
            <SubscriptionCard key={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
