import { FaRegCircleCheck } from "react-icons/fa6";
import { SubscribedService } from "../utils/types";
import { formatDate } from "../utils/lib";

interface SubscriptionDetailTypes {
  sub: SubscribedService | undefined;
}

const SubscriptionDetail = ({ sub }: SubscriptionDetailTypes) => {
  return (
    <div>
      <div className="p-4 relative bg-white border border-gray-100 rounded-3xl md:p-10 ">
        <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
          <div className="border-r pr-4">
            <h3 className="text-sm border px-4 py-1 inline-flex text-indigo-500 mb-4 rounded-full border-indigo-500">
              {sub?.duration}
            </h3>

            <div className="mt-5">
              <span className="text-5xl font-bold text-indigo-600">
                $ {sub?.price}
              </span>
              <span className="ms-3 text-gray-500 text-base">USDe</span>
            </div>
          </div>
          <div className="">
            <ul className="space-y-3 text-sm">
              {sub?.services.features.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-x-3 justify-start items-center"
                >
                  <FaRegCircleCheck className="text-indigo-700 shrink-0" />
                  <span className="text-gray-800 -200 text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-3 py-4">
          <span className="text-red-600 font-medium">
            Due Date:{" "}
            <span className="ext-red-600  ">
              {formatDate(sub?.nextPaymentDate || "")}
            </span>
          </span>
        </div>

        <button
          type="submit"
          className="py-3 mt-5 px-4 items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 bg-red-100 text-red-700 shadow-sm hover:bg-red-200 disabled:opacity-50  ease-in-out duration-200 disabled:pointer-events-none text-center w-full"
        >
          Cancel Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
