import Layout from "../components/Layout";
// import { addServiceProvider } from "../contract/manageUser";

const Setting = () => {
  return (
    <Layout>
      <div className="min-h-[600px]  flex flex-col items-center justify-center">
        <h1 className="text-5xl text-gray-950 font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>

        {/* <button
          onClick={() =>
            addServiceProvider("0xE365C98b2EA3233D491E49380c1269f81339cb86")
          }
          className="text-white bg-black px-8 py-3"
        >
          {" "}
          test button
        </button> */}
      </div>
    </Layout>
  );
};

export default Setting;
