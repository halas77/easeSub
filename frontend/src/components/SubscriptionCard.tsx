const SubscriptionCard = () => {
  return (
    <div className="bg-white border border-solid border-gray-200 rounded-2xl p-4 transition-all duration-500">
      <div className="mb-1 font-semibold text-indigo-700 text-xl text-end">
        19 <span className="text-sm font-normal text-gray-700">USDe</span>
      </div>
      <h4 className="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
        Fast Transaction
      </h4>
      <p className="text-xs font-normal text-gray-500 transition-all duration-500 leading-5 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptas.
      </p>
    </div>
  );
};

export default SubscriptionCard;
