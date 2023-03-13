import ChartsSection from '@/components/ChartsSection/ChartsSection';
import DashBoardTopCard from '@/components/DashBoardTopCard/DashBoardTopCard';
import DoughnutChart from '@/components/DoughnutChart/DoughnutChart';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import MainLayout from '@/layout/MainLayout';
import { FaCircle } from 'react-icons/fa';

export default function Home() {
  return (
    <PrivateRoute>
      <MainLayout title="Home">
        <main className="px-6 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold text-gray-800">Dashboard</p>
              <p className="text-gray-400 font-semibold mt-1 text-sm">
                All About your selling products are here....
              </p>
            </div>
          </div>
          <div>
            {/* top cards */}
            <div className="my-5">
              <DashBoardTopCard />
            </div>
          </div>
          {/* charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <div className="bg-white flex flex-col justify-between rounded-lg p-5 shadow-lg h-full w-full lg:pb-20">
              <ChartsSection />
              <div className="grid grid-cols-3 gap-3 place-content-center mt-5">
                <div className="text-center space-y-2">
                  <h3 className="text-md lg:text-2xl font-semibold">
                    30% Increase
                  </h3>
                  <p className="text-gray-600 flex items-center justify-center space-x-2">
                    <span className="text-primary">
                      <FaCircle />
                    </span>{' '}
                    <span className="text-sm lg:text-md font-semibold">
                      January
                    </span>
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-md lg:text-2xl font-semibold">
                    20% decrease
                  </h3>
                  <p className="text-gray-600 flex items-center justify-center space-x-2">
                    <span className="text-[#faae42]">
                      <FaCircle />
                    </span>{' '}
                    <span className="text-sm lg:text-md font-semibold">
                      March
                    </span>
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-md lg:text-2xl font-semibold">
                    60% Increase
                  </h3>
                  <p className="text-gray-600 font-semibold flex items-center justify-center space-x-2">
                    <span className="text-[#ff6e40]">
                      <FaCircle />
                    </span>{' '}
                    <span className="text-sm lg:text-md font-semibold">
                      June
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg h-full w-full">
              <DoughnutChart />
            </div>
          </div>
        </main>
      </MainLayout>
    </PrivateRoute>
  );
}
