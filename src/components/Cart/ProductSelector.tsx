import React from 'react';

interface ProductSelectorProps {
  productId: string;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ productId, isSelected, onSelect }) => {
  const handleSelect = () => {
    onSelect(productId);
  };

  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        id={`select-${productId}`}
        checked={isSelected}
        onChange={handleSelect}
        className="hidden"
      />
      <label
        htmlFor={`select-${productId}`}
        className={`px-4 py-2 text-white font-semibold rounded-lg cursor-pointer ${isSelected ? 'bg-red-700' : 'bg-green-500'}`}
      >
        {isSelected ? 'Batalkan' : 'Pilih'}
      </label>
    </div>
  );
};

export default ProductSelector;
