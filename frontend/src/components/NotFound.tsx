import { FaBoxOpen } from "react-icons/fa";

const NotFound = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 bg-white rounded-3xl text-gray-600">
      <FaBoxOpen className="text-4xl text-gray-500 mb-4" />
      <h1 className="text-lg font-medium mb-2">No {title} Found</h1>
      <p className="text-gray-500 text-xs text-center">
        Sorry, we couldn’t find any {title} to display.
      </p>
    </div>
  );
};

export default NotFound;
