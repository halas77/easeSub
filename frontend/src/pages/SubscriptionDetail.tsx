import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SubscriptionDetailCard from "../components/SubscriptionDetailCard";
import { supabase } from "../supabaseClient";
import { useParams } from "react-router-dom";
import { ServiceFormValues } from "../utils/types";
import Loader from "../components/Loader";

const SubscriptionDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ServiceFormValues>({
    id: "",
    description: "",
    features: [""],
    name: "",
    price: "",
    serviceId: 0,
  });

  const { id } = useParams();

  const getServiceDetail = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    console.log("data", data);
    if (data) {
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getServiceDetail();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:px-10 space-y-3 w-full pt-10">
          <p className="font-semibold text-2xl pl-1 text-gray-700 ">
            {data.name}
          </p>
          <p className="text-sm text-gray-500 pb-2 pl-2">{data.description}</p>
          <div className="overflow-hidden">
            <div className="  mx-auto">
              <div className="relative xl:mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {[0, 1].map((i) => (
                    <SubscriptionDetailCard key={i} index={i} sub={data} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SubscriptionDetail;
