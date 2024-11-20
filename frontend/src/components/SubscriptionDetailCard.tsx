import { FaRegCircleCheck } from "react-icons/fa6";

interface SubscriptionDetailCardProps {
  sub: {
    name: string;
    description: string;
    price: number;
    features: string[];
    billingCycle: string;
  };
}

const SubscriptionDetailCard = ({ sub }: SubscriptionDetailCardProps) => {
  return (
    <div>
      <div className="p-4 relative bg-white border border-gray-100 rounded-xl md:p-10 ">
        <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
          <div className="border-r">
            <h3 className="text-sm border px-4 py-1 inline-flex text-indigo-500 mb-4 rounded-full border-indigo-500">
              {sub.billingCycle}
            </h3>
            <div className="text-sm text-gray-500 -500">{sub.description}</div>

            <div className="mt-5">
              <span className="text-5xl font-bold text-indigo-700 -200">
                ${sub.price}
              </span>
              <span className="ms-3 text-gray-500 text-base">USDe</span>
            </div>
          </div>

          <div className="">
            <ul className="space-y-2 text-sm ">
              {sub.features.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-x-3 justify-start items-center"
                >
                  <FaRegCircleCheck className="text-indigo-700" />
                  <span className="text-gray-800 -200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="py-3 mt-5 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 text-center w-full"
        >
          Start free trial
        </button>
      </div>
    </div>
  );
};

export default SubscriptionDetailCard;
