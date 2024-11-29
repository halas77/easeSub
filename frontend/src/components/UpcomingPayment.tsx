import { useEffect, useState } from "react";
import UpcomingCard from "./UpcomingCard";
import { SubscribedService } from "../utils/types";
import { supabase } from "../supabaseClient";
import { formatDate } from "../utils/lib";
import NotFound from "./NotFound";
import UpcomingCardSkeleton from "./skeletons.tsx/UpcomingCardSkeleton";
import { useMainContext } from "../context/MainContext";

const UpcomingPayment = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<SubscribedService | null>();

  const { account } = useMainContext();

  // Fetch subscriber services
  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select(`*, services(*)`)
      .eq("subscriber", account)
      .eq("active", true)
      .order("nextPaymentDate", { ascending: false })
      .limit(1)
      .single();

    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div className="pt-10 space-y-3 w-full">
      <p className="font-semibold text-xl text-gray-700">Upcoming fee</p>
      <p className="text-xs text-gray-500 pb-2">
        Preview for pending payment obligations.
      </p>
      {loading ? (
        <UpcomingCardSkeleton />
      ) : (
        <>
          {services ? (
            <div className="w-full custom-gradient rounded-3xl p-4">
              <UpcomingCard
                id={services.id || ""}
                description={services?.services.description}
                dueDate={formatDate(services?.nextPaymentDate)}
                name={services?.services.name}
                price={services?.price}
              />
            </div>
          ) : (
            <NotFound title="subscriptions" />
          )}
        </>
      )}
    </div>
  );
};

export default UpcomingPayment;
