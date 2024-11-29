import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { supabase } from "../supabaseClient";
import { SubscribedService } from "../utils/types";
import NotFound from "./NotFound";
import ServiceCardSkeleton from "./skeletons.tsx/ServiceCardSkeleton";
import { useMainContext } from "../context/MainContext";

const MySubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<SubscribedService[] | null>([]);

  const { account } = useMainContext();

  // Fetch subscriber services
  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select(`*, services(*)`)
      .eq("subscriber", account)
      .eq("active", true);

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
        Manage and access your active service subscriptions.
      </p>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 4].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      ) : services?.length === 0 ? (
        <NotFound isMySub={true} title="Subscribed Services" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services?.map((item, idx) => (
            <SubscriptionCard
              id={item.id}
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
