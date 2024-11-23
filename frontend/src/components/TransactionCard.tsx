import { GrTransaction } from "react-icons/gr";

interface TransactionCardProps {
  company: string;
  date: string;
  amount: string;
}

const TransactionCard = ({
  company,
  date,
  amount,
}: TransactionCardProps) => {
  return (
    <div className="flex items-center gap-4 py-3 px-2 bg-white rounded duration-200 w-full">
      <div className="flex justify-between gap-4 w-full">
        <div
          className={`w-12 h-12 flex justify-center items-center rounded-full ${"bg-green-100 text-green-600"}`}
        >
          <GrTransaction size={22} />
        </div>

        <div className="flex-1">
          <p className="font-medium text-gray-700">{company}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>

      <div className={`font-semibold ${"text-green-600"}`}>${amount}</div>
    </div>
  );
};

export default TransactionCard;
