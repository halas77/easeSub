import { RiExchangeLine } from "react-icons/ri";

const Loader2 = () => {
  return (
    <div className="flex flex-col w-full  h-screen  justify-center items-center text-indigo-400">
      <div className="relative flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex gap-2 justify-center items-center my-4">
            <RiExchangeLine size={90} className="animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader2;
