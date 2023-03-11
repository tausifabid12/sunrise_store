import Image from 'next/image';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';

const TableRow = ({ data }) => {
  const { price, image, description, Product_name } = data;
  return (
    <tr className="h-20 border-b border-opacity-50 border-primary text-gray-600 bg-white rounded-t-lg py-3 text-[15px] mt-2 text-center shadow-sm">
      {/* <td className="p-3">
          <p>97412378923</p>
        </td> */}
      <td className="p-3">
        <Image
          className="rounded-xl"
          src={image}
          height={70}
          width={70}
          alt={Product_name}
        />
      </td>
      <td className="p-3">
        <p>{Product_name}</p>
      </td>
      <td className="p-3">
        <p className="truncate text-sm text-gray-500">{description}</p>
      </td>
      <td className="p-3 ">
        <p>${price}</p>
      </td>
      <td className="p-3 text-gray-900">
        <span>
          <FaEllipsisH size={20} className="ml-5" />
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
