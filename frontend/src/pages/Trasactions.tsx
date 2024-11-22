import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TransactionCard from "../components/TransactionCard";
import { supabase } from "../supabaseClient";
import { formatDate } from "../utils/lib";
import { TrasactionsTypes } from "../utils/types";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";

const Trasactions = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TrasactionsTypes[]>([]);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("subscriber", "abcdef");

    setTransactions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Layout>
      <div className=" md:px-10 space-y-3 w-full pt-10">
        <p className="font-semibold text-3xl pl-1 text-gray-700 ">
          Transactions
        </p>
        <p className="text-xs text-gray-500 pb-2 pl-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          illum.
        </p>
        {loading ? (
          <Loader />
        ) : transactions?.length === 0 ? (
          <NotFound isMySub={true} title="Transactions" />
        ) : (
          <div className="flex flex-col divide-y w-full bg-white rounded-3xl p-4 max-w-4xl">
            {transactions.map((item, idx) => (
              <TransactionCard
                amount={item.price}
                company={item.name}
                date={formatDate(item.created_at)}
                type="deposit"
                key={idx}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Trasactions;
