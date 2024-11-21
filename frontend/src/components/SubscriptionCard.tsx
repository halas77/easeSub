import { Link } from "react-router-dom";
import { ServiceFormValues } from "../utils/types";

const SubscriptionCard = ({
  item,
  isSubscribed,
  id,
}: {
  item: ServiceFormValues;
  isSubscribed: boolean;
  id?: string;
}) => {
  return (
    <Link
      to={
        isSubscribed
          ? `/subscriptions/my/${id}`
          : `/subscriptions/${item?.id}`
      }
      className="bg-white border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500"
    >
      <div className="mb-1 font-semibold text-indigo-700 text-xl text-end">
        {item?.price || 12}{" "}
        <span className="text-xs font-normal text-gray-700">USDe / Month</span>
      </div>
      <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
        {item?.name || "lorem"}
      </h4>
      <p className="text-xs font-normal text-gray-500 transition-all duration-500 leading-5 mb-4">
        {item?.description ||
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, fuga."}
      </p>
    </Link>
  );
};

export default SubscriptionCard;
