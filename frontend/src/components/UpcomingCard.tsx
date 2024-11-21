import { UpcomingCardProp } from "../utils/types";

const UpcomingCard = ({
  name,
  dueDate,
  description,
  price,
}: UpcomingCardProp) => {
  return (
    <div>
      <div className=" flex flex-col justify-center items-start space-y-2 cursor-pointer text-white px-6 py-8">
        <div className="flex justify-between w-full items-end gap-5">
          <p className="text-xl uppercase font-semibold">{name}</p>
          <p className="text-end font-semibold text-3xl leading-none">
            <span className="text-xl leading-none font-semibold">
              {dueDate}
            </span>
          </p>
        </div>

        <p className="text-sm pt-3 max-w-sm pb-4">{description}</p>

        <div className="text-xs flex justify-center gap-2">
          <p className="font-bold text-3xl">
            {price} <span className="text-base font-normal">USDe</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
