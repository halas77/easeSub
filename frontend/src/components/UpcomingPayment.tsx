import UpcomingCard from "./UpcomingCard";

const UpcomingPayment = () => {
  return (
    <div className="pt-10 space-y-3 w-full">
      <p className="font-semibold text-xl text-gray-700">Upcoming fee</p>
      <p className="text-xs text-gray-500 pb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        illum.
      </p>
      <div className="w-full custom-gradient rounded-3xl p-4">
        <UpcomingCard />
      </div>
    </div>
  );
};

export default UpcomingPayment;
