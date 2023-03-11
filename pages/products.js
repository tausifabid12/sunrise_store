import MainLayout from '@/layout/MainLayout';
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { BiSearchAlt, BiSearchAlt2 } from 'react-icons/bi';
import ProductTable from '@/components/ProductTable/ProductTable';

const products = ({ data }) => {
  console.log(data);
  return (
    <MainLayout>
      <div className="px-5">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold text-primary">Products</p>
          <div className="ml-5  hidden md:flex   items-center bg-white rounded-lg mx-24">
            <span className={`text-primary ml-5 mr-2`}>
              <BiSearchAlt2 size={23} />
            </span>
            <input
              type="text"
              //   onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              placeholder="Search For Your Favorite Tracks"
              className="w-full lg:w-96 h-10 bg-transparent  placeholder:text-gray-400 outline-none border-none ring-0"
            />
            {/* <span
              onClick={() => setIsSearched(!isSearched)}
              className={`${
                isSearched ? 'block' : 'hidden'
              } text-white/80 mr-2 cursor-pointer`}
            >
              <FaTimesCircle size={25} />
            </span> */}
          </div>
          <button className="btn btn-primary text-white">
            Add New Product
          </button>
        </div>
        {/* -------------- */}
        <div className="flex items-center justify-between bg-white py-3 px-5 mt-10 shadow-md rounded-lg">
          <h6 className="text-gray-900 font-semibold">All Products</h6>
          <div className="flex items-center space-x-5">
            <select className="select select-bordered  select-sm w-20">
              <option disabled selected>
                Sort
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
            <select className="select select-bordered  select-sm w-20">
              <option disabled selected>
                20
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
        </div>
        {/* table */}
        <ProductTable data={data} />
      </div>
    </MainLayout>
  );
};

// http://localhost:5000/products

export async function getServerSideProps() {
  //getting song data
  const res = await fetch(`http://localhost:5000/products`, {
    // headers: {
    //   authorization: `bearer ${localStorage.getItem('sunriseAccess')}`,
    // },
  });
  const products = await res.json();
  console.log(products);

  return {
    props: {
      data: products.data,
    },
  };
}

export default products;
