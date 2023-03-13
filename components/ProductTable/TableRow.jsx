import UseProductDelete from '@/hooks/UseProductDelete';
import Image from 'next/image';
import React from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import ProductUpdateModal from './ProductUpdateModal/ProductUpdateModal';

const TableRow = ({ data, setShowModal, setModalData, refetch }) => {
  const { price, image, description, Product_name, _id } = data;

  return (
    <>
      <tr className="h-20 border-b border-opacity-50 border-primary text-gray-600 bg-white rounded-t-lg py-3 text-xs lg:text-[15px] mt-2 text-center shadow-sm">
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
        <td className="p-3 hidden lg:block">
          <p className="truncate text-sm text-center text-gray-500 mt-4">
            {description}
          </p>
        </td>
        <td className="p-3 ">
          <p>${price}</p>
        </td>
        <td className="p-3 text-gray-900 ">
          <div className="dropdown dropdown-left dropdown-end">
            <label tabIndex={0} className=" cursor-pointer m-1">
              <FaEllipsisH size={20} className="ml-5" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
            >
              <li
                onClick={() => {
                  setModalData(data);
                  setShowModal(true);
                }}
              >
                <a>Edit</a>
              </li>
              <li onClick={() => UseProductDelete(_id, refetch)}>
                <a>Delete</a>
              </li>
              <li>
                <a>Disable</a>
              </li>
            </ul>
          </div>
          {/* <span>
          <FaEllipsisH size={20} className="ml-5" />
        </span> */}
        </td>
      </tr>
      {/* <ProductUpdateModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={data}
        refetch={refetch}
      /> */}
    </>
  );
};

export default TableRow;
