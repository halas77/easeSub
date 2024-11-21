import Layout from "../components/Layout";
import SubscriptionDetail from "../components/SubscriptionDetail";

const subscriptionData = {
  price: 49.99,
  dueDate: "2024-12-31",
  status: true,
  duration: "1 year",
  features: [
    "Unlimited access",
    "Priority customer support",
    "Customizable dashboards",
    "Exclusive content updates",
  ],
};


const MySubscriptionDetail = () => {
  return (
    <Layout>
      <div className=" px-10 space-y-3 w-full pt-10">
        <p className="font-semibold text-3xl pl-1 text-gray-700 ">Premium Plan</p>
        <p className="text-xs text-gray-500 pb-2 pl-2">
        Enjoy unlimited access to premium features.
        </p>
        
        <SubscriptionDetail {...subscriptionData} />
        
      </div>
    </Layout>
  );
};

export default MySubscriptionDetail;
