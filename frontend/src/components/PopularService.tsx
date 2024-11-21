import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { supabase } from "../supabaseClient";
import { ServiceFormValues } from "../utils/types";
import NotFound from "./NotFound";
import ServiceCardSkeleton from "./skeletons.tsx/ServiceCardSkeleton";

const PopularService = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<ServiceFormValues[]>([]);

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase.from("services").select("*");

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="md:px-10 py-10 space-y-3 w-full">
      <p className="font-semibold text-xl text-gray-700 ">Popular services</p>
      <p className="text-xs text-gray-500 pb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        illum.
      </p>
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 4].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      ) : services?.length === 0 ? (
        <NotFound title="Services" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services?.map((item, idx) => (
            <SubscriptionCard isSubscribed={false} item={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularService;
