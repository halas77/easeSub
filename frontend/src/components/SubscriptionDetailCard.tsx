import { FaRegCircleCheck } from "react-icons/fa6";
import { SubscriptionDetailCardProps } from "../utils/types";
import { useState } from "react";
import { addDays } from "../utils/lib";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";
import { useMainContext } from "../context/MainContext";
import { createNewSub } from "../contract/manageSub";

const SubscriptionDetailCard = ({
  sub,
  index,
}: SubscriptionDetailCardProps) => {
  const [loading, setLoading] = useState(false);

  const yearlyPrice = (parseInt(sub.price) * 12 * 70) / 100;
  const { account } = useMainContext();

  const handleCreateSubscription = async (idx: number) => {
    setLoading(true);

    try {
      let data = {
        serviceId: sub.id,
        subscriber: account,
        active: true,
        price: "",
        nextPaymentDate: "",
        duration: "",
      };

      if (idx === 0) {
        // Monthly subscription
        const dueDate = addDays(new Date(), 30);
        data = {
          ...data,
          price: sub.price,
          nextPaymentDate: dueDate.toISOString(),
          duration: "Monthly",
        };
      } else if (idx === 1) {
        // Yearly subscription
        const dueDate = addDays(new Date(), 365);
        data = {
          ...data,
          price: yearlyPrice.toString(),
          nextPaymentDate: dueDate.toISOString(),
          duration: "Yearly",
        };
      } else {
        toast.error("Please select a valid plan.");
        setLoading(false);
        return;
      }

      if (!data) {
        toast.error("No data to insert.");
        setLoading(false);
        return;
      }

      const serviceId = sub.serviceId;
      const duration = index;
      const price = data.price;

      const res = await createNewSub({ serviceId, duration, price });

      if (res) {
        const { error } = await supabase.from("subscriptions").insert(data);

        if (error) {
          console.error("Supabase insertion error:", error);
          toast.error("Failed to create subscription.");
        } else {
          const txData = {
            name: sub.name,
            price: data.price,
            subscriber: data.subscriber,
            transactionHash: res.transactionHash,
          };

          const { error } = await supabase.from("transactions").insert(txData);

          if (error) {
            console.error("Supabase insertion error:", error);
            toast.error("Failed to create subscription.");
            return;
          }
          toast.success("Subscription created successfully.");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-4 relative bg-white border border-gray-100 rounded-xl md:p-10 ">
        <div className="mt-5 grid sm:grid-cols-2 gap-y-2 py-4 first:pt-0 last:pb-0 sm:gap-x-6 sm:gap-y-0">
          <div className="border-r pr-4">
            <h3 className="text-sm border px-4 py-1 inline-flex text-indigo-500 mb-4 rounded-full border-indigo-500">
              {index === 0 ? "Monthly" : "Yearly"}
            </h3>
            <div className="text-sm text-gray-500 -500">
              {index === 0
                ? "Perfect for individuals starting out with minimal needs."
                : "Save 30% with the yearly plan. Ideal for long-term use."}
            </div>

            <div className="mt-5">
              <span className="text-5xl font-bold text-indigo-600">
                $ {index === 0 ? `${sub.price}.99` : yearlyPrice}
              </span>
              <span className="ms-3 text-gray-500 text-base">USDe</span>
            </div>
          </div>

          <div className="">
            <ul className="space-y-3 text-sm">
              {sub.features.map((item, idx) => (
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

        <button
          type="submit"
          disabled={loading}
          onClick={() => handleCreateSubscription(index)}
          className="py-3 mt-5 px-4 items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 bg-indigo-700 text-gray-50 shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none text-center w-full"
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionDetailCard;
