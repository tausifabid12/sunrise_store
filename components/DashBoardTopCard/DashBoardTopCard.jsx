import React from 'react';
import {
  FaTruckMoving,
  FaRegCalendarTimes,
  FaShoppingBag,
  FaClipboardCheck,
} from 'react-icons/fa';

const DashBoardTopCard = () => {
  const data = [
    {
      id: 1,
      title: 'Ordered',
      icon: <FaShoppingBag />,
      color: 'text-[#009d63]',
    },
    {
      id: 2,
      title: 'Delivered',
      icon: <FaTruckMoving />,
      color: 'text-[#ff6e40]',
    },
    {
      id: 3,
      title: 'Arrived',
      icon: <FaClipboardCheck />,
      color: 'text-[#faae42]',
    },
    {
      id: 4,
      title: 'Reported',
      icon: <FaRegCalendarTimes />,
      color: 'text-[#25c2e3]',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg p-5 space-y-3 shadow-lg"
        >
          <p className={`text-5xl ${item.color}`}>{item.icon}</p>
          <p className="text-xl font-bold">{item.title}</p>
          <p className="text-gray-600 font-semibold text-sm">20 New Items</p>
        </div>
      ))}
    </div>
  );
};

export default DashBoardTopCard;
