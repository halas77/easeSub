import { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import { supabase } from "../supabaseClient";
import { formatDate } from "../utils/lib";
import { TrasactionsTypes } from "../utils/types";
import NotFound from "./NotFound";
import TransactionCardSkeleton from "./skeletons.tsx/TransactionCardSkeleton";
const RecentTransactions = () => {
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
    <div className="pt-10 space-y-3 w-full">
      <p className="font-semibold text-xl text-gray-700 ">
        Recent transactions
      </p>
      <p className="text-xs text-gray-500 pb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        illum.
      </p>
      {loading ? (
        <div className="flex flex-col divide-y w-full bg-white rounded-3xl p-4 max-w-4xl">
          {[0, 1, 2].map((i) => (
            <TransactionCardSkeleton key={i} />
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <NotFound isMySub={true} title="transactions" />
      ) : (
        <div className="flex flex-col divide-y w-full bg-white rounded-3xl p-4 max-w-4xl">
          {transactions
            .slice(0, 3)
            .reverse()
            .map((item, idx) => (
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
  );
};

export default RecentTransactions;