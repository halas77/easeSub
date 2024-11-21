import Layout from "../components/Layout";
import PopularService from "../components/PopularService";
import RecentTransactions from "../components/RecentTransactions";
import UpcomingPayment from "../components/UpcomingPayment";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  return (
    <Layout>
      <div className="md:px-10 w-full flex justify-between items-center">
        <div className="w-full">
          <Welcome />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
            <RecentTransactions />
            <UpcomingPayment />
          </div>
        </div>
      </div>
      <PopularService />
    </Layout>
  );
};

export default Dashboard;
