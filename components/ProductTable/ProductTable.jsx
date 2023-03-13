import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaEllipsisH, FaEllipsisV } from 'react-icons/fa';
import TableRow from './TableRow';

const ProductTable = ({
  data,
  setShowModal,
  setModalData,
  refetch,
  size,
  sortType,
  setProductData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // pagination
  const pages = Math.ceil(data?.length / size);
  const lastPageIndex = currentPage * size;
  const firstPageIndex = lastPageIndex - size;
  const pagedData = data?.slice(firstPageIndex, lastPageIndex);

  // //sorting
  // useEffect(() => {
  //   console.log('effecting');
  //   if (sortType === 'Price High to Low') {
  //     setProductData(
  //       data.sort((a, b) => parseFloat(b?.price) - parseFloat(a?.price))
  //     );
  //   } else if (sortType === 'Price Low to High') {
  //     setProductData(
  //       data.sort((a, b) => parseFloat(a?.price) - parseFloat(b?.price))
  //     );
  //   }
  // }, [sortType]);

  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs lg:text-md font-bold border-separate border-spacing-y-3  ">
          <thead className="bg-transparent text-md lg:text-lg font-bold text-primary">
            <tr className="text-center">
              {/* <th className="p-3">No.</th> */}
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3 hidden md:block ">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagedData?.length ? (
              pagedData?.map((item) => (
                <TableRow
                  key={item?._id}
                  data={item}
                  setModalData={setModalData}
                  setShowModal={setShowModal}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <td
                  colspan="2"
                  className="flex items-center  h-20 w-fulls justify-center "
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    No data Found...
                  </h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* pagination buttons */}
        <div className=" flex items-center justify-center pb-9 w-full  mt-5">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 mr-3 text-primary font-semibold shadow-lg bg-white border border-gray-200 rounded-lg"
            >
              Prev
            </button>
          )}

          {pages &&
            [...Array(pages).keys()].map((num) => (
              <button
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 mr-3 ${
                  currentPage === num + 1
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary'
                }  font-semibold shadow-lg border border-gray-200 rounded-lg`}
                key={num}
              >
                {num + 1}
              </button>
            ))}
          {currentPage < pages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 mr-3 text-primary bg-white font-semibold shadow-lg border border-gray-200 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
