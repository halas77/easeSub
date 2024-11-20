import Layout from "../components/Layout";
import SubscriptionDetailCard from "../components/SubscriptionDetailCard";

const SubscriptionDetail = () => {
  const data = [
    {
      name: "Starter Pack",
      features: ["Access to basic tools", "Community support", "5 GB storage"],
      price: 10,
      billingCycle: "Monthly",
      description: "Perfect for individuals starting out with minimal needs.",
    },
    {
      name: "Enterprise",
      features: [
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "Unlimited storage",
      ],
      price: 1080,
      billingCycle: "Yearly",
      description:
        "Save big with the yearly plan for enterprises seeking scalability.",
    },
  ];
  return (
    <Layout>
      <div className="px-10 space-y-3 w-full pt-10">
        <p className="font-semibold text-2xl pl-1 text-gray-700 ">
          Subscription Name
        </p>
        <p className="text-xs text-gray-500 pb-2 pl-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          illum.a
        </p>
        <div className="overflow-hidden">
          <div className="  mx-auto">
            <div className="relative xl:mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {data.map((item, index) => (
                  <SubscriptionDetailCard key={index} sub={item}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionDetail;
