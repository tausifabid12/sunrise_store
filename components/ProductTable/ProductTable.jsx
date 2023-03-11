import Image from 'next/image';
import React from 'react';
import { FaEllipsisH, FaEllipsisV } from 'react-icons/fa';
import TableRow from './TableRow';

const ProductTable = ({ data }) => {
  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs lg:text-md font-bold border-separate border-spacing-y-3">
          <thead className="bg-transparent text-md lg:text-lg font-bold text-primary">
            <tr className="text-center">
              {/* <th className="p-3">No.</th> */}
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3 ">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TableRow key={item?._id} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
