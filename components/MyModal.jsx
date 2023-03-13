import { useState } from 'react';

export function MyModal() {
  const [inputValue, setInputValue] = useState('fuck');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className=" bg-red-600 h-[600px]">
      <h className="text-6xl">heljdsklfjaskl</h>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </div>
  );
}
