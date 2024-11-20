import { RiExchangeLine } from "react-icons/ri";

const Loader = () => {
  return (
    <div className="flex flex-col w-full max-w-6xl justify-center items-center h-[25rem] text-indigo-300">
      <div className="relative flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex gap-2 justify-center items-center my-4">
            <RiExchangeLine size={100} className="animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
