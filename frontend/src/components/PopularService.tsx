import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { supabase } from "../supabaseClient";
import { ServiceFormValues } from "../utils/types";

const PopularService = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<ServiceFormValues[]>([]);

  // Fetch popular services
  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase.from("services").select("*");

    console.log("data", data);

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="px-10 py-10 space-y-3 w-full">
      <p className="font-semibold text-xl text-gray-700 ">Popular services</p>
      <p className="text-xs text-gray-500 pb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        illum.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          "Loading....."
        ) : (
          <>
            {services.map((item, index) => (
              <SubscriptionCard item={item} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PopularService;
