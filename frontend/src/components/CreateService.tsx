import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import { CreateServiceFormValues } from "../utils/types";

const CreateService = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateServiceFormValues>();

  const handleCreateSubscription: SubmitHandler<
    CreateServiceFormValues
  > = async (ServiceData) => {
    const formatedServiceData = {
      ...ServiceData,
      serviceId: 1,
      features: ServiceData.features
        .split(",")
        .map((feature) => feature.trim()),
    };

    const { error } = await supabase
      .from("services")
      .insert(formatedServiceData);

    if (error) {
      console.error("Error inserting data:", error);
    }
    toast.success("Service created successfully.");
    reset();
  };

  return (
    <div className="w-full h-full   flex items-start justify-start">
      <div className="bg-white border rounded-3xl border-gray-100 md:p-8 p-4  w-full">
        <div className="flex justify-between items-start mb-6 border-b pb-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Create Service
            </h3>
            <p className="text-xs text-gray-500 mt-1 ml-1">
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>

        <form
          className="max-md:max-h-[400px] overflow-y-auto"
          onSubmit={handleSubmit(handleCreateSubscription)}
        >
          <div className="grid gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-gray-950 focus:ring-gray-950 placeholder-gray-400 transition duration-300 ease-in-out"
                placeholder="e.g., Subscription Name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm">Name is required.</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-gray-950 focus:ring-gray-950 placeholder-gray-400 transition duration-300 ease-in-out"
                placeholder="e.g., Subscription Description"
              />
              {errors.description && (
                <p className="text-red-600 text-sm">Description is required.</p>
              )}
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                step="0.01"
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-gray-950 focus:ring-gray-950 placeholder-gray-400 transition duration-300 ease-in-out"
                placeholder="e.g., 19.99"
              />
              {errors.price && (
                <p className="text-red-600 text-sm">Price is required.</p>
              )}
            </div>

            {/* Features Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features
              </label>
              <textarea
                {...register("features", { required: true })}
                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-gray-950 focus:ring-gray-950 placeholder-gray-400 transition duration-300 ease-in-out"
                placeholder="e.g., Feature1, Feature2, Feature3 (comma-separated)"
              />
              {errors.features && (
                <p className="text-red-600 text-sm">
                  At least one feature is required.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-indigo-700 text-white text-sm rounded-xl hover:bg-indigo-800 focus:outline-none focus:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Subscription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
