import React from 'react';

interface CounterProps {
  count: number;
  productStock: number;
  increment: () => void;
  decrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, productStock, increment, decrement }) => {

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-x-4">
        <button
          onClick={decrement}
          disabled={count === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${count === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
        >
          -
        </button>
        <p className="text-sm font-bold">Jumlah: {count}</p>
        <button
          onClick={increment}
          disabled={count === productStock}
          className={`px-4 py-2 bg-blue-500 text-white ${count === productStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
