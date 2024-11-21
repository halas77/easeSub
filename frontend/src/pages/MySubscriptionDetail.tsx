import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SubscriptionDetail from "../components/SubscriptionDetail";
import { supabase } from "../supabaseClient";
import { SubscribedService } from "../utils/types";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const MySubscriptionDetail = () => {
  const [loading, setLoading] = useState(false);
  const [subDetail, setSubDetail] = useState<SubscribedService>();

  const { id } = useParams();

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("subscriptions")
      .select(`*, services(*)`)
      .eq("id", id)
      .single();

    console.log("data detail", data);

    setSubDetail(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Layout>
      <div className="md:px-10 space-y-3 w-full pt-10 max-w-5xl">
        <p className="font-semibold text-3xl pl-1 text-gray-700 ">
          {subDetail?.services.name}
        </p>
        <p className="text-xs text-gray-500 pb-2 pl-2">
          {subDetail?.services.description}
          {}
        </p>
        {loading ? <Loader /> : <SubscriptionDetail sub={subDetail} />}
      </div>
    </Layout>
  );
};

export default MySubscriptionDetail;
