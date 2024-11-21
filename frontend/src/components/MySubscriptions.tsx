import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { supabase } from "../supabaseClient";
import { SubscribedService } from "../utils/types";

const MySubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<SubscribedService[] | null>([]);

  // Fetch subscriber services
  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select(`*, services(*)`)
      .eq("subscriber", "abcdef");

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div className="md:px-10 pt-10 space-y-3 w-full">
      <p className="font-semibold text-2xl text-gray-700 ">
        Subscribed services
      </p>
      <p className="text-xs text-gray-500 pb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        illum.
      </p>

      {loading ? (
        "Loading..."
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services?.map((item, idx) => (
            <SubscriptionCard
              isSubscribed={true}
              item={item.services}
              key={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubscriptions;
