import Link from 'next/link';
import React from 'react';
import { AiFillDingtalkCircle } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar bg-secondary lg:hidden mb-5">
      <div className="flex-1">
        <Link
          href="/"
          className=" flex items-center justify-center text-primary space-x-2"
        >
          <span className="">
            <AiFillDingtalkCircle size={30} />
          </span>
          <p className="text-xl font-bold">Sunrise Store</p>
        </Link>
      </div>
      <div className="flex-none">
        <label
          htmlFor="sideBar"
          className="btn btn-square btn-ghost drawer-button lg:hidden"
        >
          <FaBars size={20} />
        </label>
        {/* <button className="btn btn-square btn-ghost">
          <FaBars />
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
