const UpcomingCard = () => {
  return (
    <div>
      <div className=" flex flex-col justify-center items-start space-y-2 cursor-pointer text-white px-6 py-8">
        <div className="flex justify-between w-full items-end gap-5">
          <p className="text-xl uppercase font-semibold">
            {" "}
            Lorem, ipsum dolor.
          </p>
          <p className="text-end font-semibold text-3xl leading-none">
            02 <br />
            <span className="text-base leading-none font-normal">Sep 2024</span>
          </p>
        </div>

        <p className="text-sm pt-3 max-w-sm pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          distinctio.
        </p>

        <div className="text-xs flex justify-center gap-2">
          <p className="font-bold text-3xl">
            199 <span className="text-base font-normal">USDe</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
