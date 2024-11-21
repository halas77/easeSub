import { GrTransaction } from "react-icons/gr";

interface TransactionCardProps {
  type: string;
  company: string;
  date: string;
  amount: string;
}

const TransactionCard = ({
  type,
  company,
  date,
  amount,
}: TransactionCardProps) => {
  return (
    <div className="flex items-center gap-4 py-3 px-2 bg-white rounded duration-200 w-full">
      <div className="flex justify-between gap-4 w-full">
        <div
          className={`w-12 h-12 flex justify-center items-center rounded-full ${
            type === "deposit"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <GrTransaction size={22}/>
        </div>

        <div className="flex-1">
          <p className="font-semibold text-gray-800">{company}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <div
        className={`font-semibold ${
          type === "deposit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {type === "deposit" ? "+" : "-"}${amount}
      </div>
    </div>
  );
};

export default TransactionCard;
