import { AiOutlineClockCircle } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";

const SubscriptionDetail = ({
  price,
  dueDate,
  status,
  duration,
  features,
}: {
  price: number;
  dueDate: string;
  status: boolean;
  duration: string;
  features: string[];
}) => {
  return (
    <div className="max-w-5xl p-8 bg-white rounded-3xl space-y-8 text-sm">
      {/* Cancel Plan Button */}
      <div className="text-end">
        <button className="text-sm font-semibold px-5 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200">
          Cancel Plan
        </button>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan Information */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <RiMoneyDollarCircleLine size={24} className="text-indigo-500" />
            <span className="text-gray-600 ">
              Price:{" "}
              <span className="text-gray-900 font-semibold">${price}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FiCalendar size={24} className="text-indigo-500" />
            <span className="text-gray-600 ">
              Due Date:{" "}
              <span className="text-gray-900 font-semibold">{dueDate}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <AiOutlineClockCircle size={24} className="text-indigo-500" />
            <span className="text-gray-600 ">
              Duration:{" "}
              <span className="text-gray-900 font-semibold">{duration}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaRegCircleCheck
              size={24}
              className={status ? "text-indigo-500" : "text-red-500"}
            />
            <span className="text-gray-600 ">
              Status:{" "}
              <span
                className={
                  status
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {status}
              </span>
            </span>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Features</h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-gray-600 flex items-start hover:text-gray-900 transition duration-200"
              >
                <FaRegCircleCheck
                  size={18}
                  className="text-indigo-500 mr-3 mt-1"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
