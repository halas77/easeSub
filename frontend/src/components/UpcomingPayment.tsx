import { useEffect, useState } from "react";
import UpcomingCard from "./UpcomingCard";
import { SubscribedService } from "../utils/types";
import { supabase } from "../supabaseClient";
import { formatDate } from "../utils/lib";

const UpcomingPayment = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<SubscribedService | null>();

  // Fetch subscriber services
  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select(`*, services(*)`)
      .eq("subscriber", "abcdef")
      .order("nextPaymentDate", { ascending: true })
      .limit(1)
      .single();

    console.log("myservices", data);

    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div className="pt-10 space-y-3 w-full">
      <p className="font-semibold text-xl text-gray-700">Upcoming fee</p>
      <p className="text-xs text-gray-500 pb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        illum.
      </p>
      {loading ? (
        "Loading..."
      ) : (
        <div className="w-full custom-gradient rounded-3xl p-4">
          {services && (
            <UpcomingCard
              description={services?.services.description}
              dueDate={formatDate(services?.nextPaymentDate)}
              name={services?.services.name}
              price={services?.price}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingPayment;
