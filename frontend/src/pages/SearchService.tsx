import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import SubscriptionCard from "../components/SubscriptionCard";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import NotFound from "../components/NotFound";
import ServiceCardSkeleton from "../components/skeletons.tsx/ServiceCardSkeleton";
import { ServiceFormValues } from "../utils/types";

const SearchService = () => {
  const location = useLocation();
  const name = location.state?.name || "";
  const [services, setServices] = useState<ServiceFormValues[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      if (name) {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .ilike("name", `%${name}%`);

        if (error) {
          console.error("Error fetching services:", error);
        } else {
          setServices(data || []);
        }
      }
      setLoading(false);
    };

    fetchServices();
  }, [name]);

  return (
    <Layout>
      <div className="md:px-10 py-10 space-y-3 w-full">
        <p className="font-semibold text-xl text-gray-700 ">Search results</p>
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
    </Layout>
  );
};

export default SearchService;
