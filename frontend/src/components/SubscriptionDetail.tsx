import { FaRegCircleCheck } from "react-icons/fa6";
import { SubscribedService } from "../utils/types";
import { formatDate } from "../utils/lib";
import { CancelSub, ExecuteSub } from "../contract/manageSub";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState } from "react";

interface SubscriptionDetailTypes {
  sub: SubscribedService | undefined;
}

const SubscriptionDetail = ({ sub }: SubscriptionDetailTypes) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const res = await CancelSub(sub?.services.serviceId || 0);

      if (res) {
        const { error } = await supabase
          .from("subscriptions")
          .update({ active: false })
          .eq("id", sub?.id);

        if (error) {
          toast.error("Unable to cancel subscription.");
          setLoading(false);
          return;
        }
        toast.success("Subscription cancelled successfully.");
        navigate("/subscriptions");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      toast.error("Unable to cancel subscription.");
    }
  };

  const executeSubscription = async () => {
    try {
      await ExecuteSub(sub?.services.serviceId || 0);
    } catch (error) {
      console.log("error", error);
    }
  };

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
                {sub?.duration === "Monthly" && ".99"}
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
          <span className="text-red-600 text-sm">
            Due Date:{" "}
            <span className="ext-red-600  ">
              {formatDate(sub?.nextPaymentDate || "")}
            </span>
          </span>
        </div>

        <div className="lg:flex lg:gap-8">
          <button
            type="submit"
            disabled={loading}
            onClick={cancelSubscription}
            className="py-3 mt-5 px-4 items-center gap-x-2 text-sm font-medium rounded-xl border border-red-200 bg-red-100 text-red-700 shadow-sm hover:bg-red-200 disabled:opacity-50  ease-in-out duration-200 disabled:pointer-events-none text-center w-full"
          >
            {loading ? "Canceling..." : "Cancel Plan"}
          </button>
          <button
            type="submit"
            disabled
            onClick={executeSubscription}
            title="The deadline has not passed yet."
            className="py-3 mt-5 px-4 items-center gap-x-2 text-sm font-medium rounded-xl border border-green-200 bg-green-100 text-green-700 shadow-sm hover:bg-green-200 disabled:opacity-50 ease-in-out duration-200 text-center w-full disabled:cursor-not-allowed"
          >
            Extend Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
