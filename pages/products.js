import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import ProductTable from '@/components/ProductTable/ProductTable';
import ProductUpdateModal from '@/components/ProductTable/ProductUpdateModal/ProductUpdateModal';
import AddNewModal from '@/components/AddNewModal/AddNewModal';
import Cookies from 'js-cookie';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { useAuth } from '@/context/AuthProvider/AuthProvider';
import { useQuery } from 'react-query';

const Products = () => {
  const [showModal, setShowModal] = useState(false); // update  modal
  const [modalData, setModalData] = useState({}); // update modal
  const [showAddProductModal, setShowAddProductModal] = useState(false); // add new product modal
  const [productData, setProductData] = useState([]);
  const [sortType, setSortType] = useState('');
  const [size, setSize] = useState(8); // page size
  const { logOut } = useAuth();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch(`http://localhost:5000/products`, {
        headers: {
          authorization: `bearer ${Cookies.get('sunriseToken')}`,
        },
      }).then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      }),
  });

  // setting data
  useEffect(() => {
    setProductData(products.data);
  }, [products]);

  //searching data
  const handleSearch = async (e) => {
    fetch(`http://localhost:5000/products?search=${e?.target?.value}`, {
      headers: {
        authorization: `bearer ${Cookies.get('sunriseToken')}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status) {
          setProductData(data?.data);
        }
      });
  };

  if (isLoading) {
    return <p>Loading ........</p>;
  }

  return (
    <PrivateRoute>
      <MainLayout>
        <div className="px-5">
          <div className="flex items-center justify-between">
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              Products
            </p>
            <div className="ml-5  hidden md:flex   items-center bg-white rounded-lg mx-24">
              <span className={`text-primary ml-5 mr-2`}>
                <BiSearchAlt2 size={23} />
              </span>
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search For Your Favorite Tracks"
                className="w-full lg:w-96 h-10 bg-transparent  placeholder:text-gray-400 outline-none border-none ring-0"
              />
            </div>
            <button
              onClick={() => setShowAddProductModal(true)}
              className=" btn btn-sm md:btn-md btn-primary text-white"
            >
              Add New Product
            </button>
          </div>
          {/* -------------- */}
          <div className="flex items-center justify-between bg-white py-3 px-5 mt-10 shadow-md rounded-lg">
            <h6 className="text-gray-900 font-semibold">All Products</h6>
            <div className="flex items-center space-x-5">
              <select
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="select select-bordered  select-sm w-20"
              >
                <option defaultValue>8</option>
                <option>12</option>
                <option>20</option>
              </select>
            </div>
          </div>
          {/* table */}
          <ProductTable
            data={productData}
            setModalData={setModalData}
            setShowModal={setShowModal}
            refetch={refetch}
            size={size}
            sortType={sortType}
            setProductData={setProductData}
          />
        </div>
      </MainLayout>

      {/* modals */}
      <ProductUpdateModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        refetch={refetch}
      />
      <AddNewModal
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
        refetch={refetch}
      />
    </PrivateRoute>
  );
};

// export async function getServerSideProps(context) {
//   const { token } = context.query;

//   const res = await fetch(`http://localhost:5000/products`, {
//     headers: {
//       authorization: `bearer ${token}`,
//     },
//   });
//   const products = await res.json();

//   return {
//     props: {
//       data: products.data,
//       revalidate: 1,
//     },
//   };
// }

export default Products;
