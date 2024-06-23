import { useEffect, useState } from "react";
import Header from "../Header";
import { CartProduct } from "../type";
import { convertToIDR } from "../../utils/currencyUtils";
import { useNavigate } from "react-router-dom";
import ProductSelector from "./ProductSelector";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleCheckoutProduct = () => {
    const selected: CartProduct[] = cart.filter((product) =>
      selectedProducts.includes(product.productId)
    );

    localStorage.removeItem("productToCheckout");

    localStorage.setItem("productToCheckout", JSON.stringify(selected));

    navigate("/checkout");
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected: string[]) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id: string) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const totalAmount = cart
    .filter((product) => selectedProducts.includes(product.productId))
    .reduce((acc, product) => acc + product.totalPrice, 0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  if (!cart.length) {
    return (
      <>
        <Header />
        <div className="m-auto mt-5 max-w-container">
          <h1 className="font-bold text-lg">Keranjang</h1>
          <p>Your Cart Is Empty!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="m-auto my-5 max-w-container">
        <h1 className="font-bold text-lg">Keranjang</h1>
        <div className="flex justify-between gap-5 mt-4">
          {
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart.map((product) => (
                <div key={product.productId} className="border rounded shadow">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">
                      {product.productName}
                    </h2>
                    <p className="mb-2">
                      Price: Rp {product.productPrice.toLocaleString("id-ID")}
                    </p>
                    <p className="mb-2">Quantity: {product.qty}</p>
                    <p className="mb-5">
                      Total: Rp {convertToIDR(product.totalPrice)}
                    </p>
                    <ProductSelector
                      productId={product.productId}
                      isSelected={selectedProducts.includes(product.productId)}
                      onSelect={handleSelectProduct}
                    />
                  </div>
                </div>
              ))}
            </div>
          }
          <div className="rounded-lg h-max w-[400px] product-card p-5">
            <h3 className="font-bold text-base">Ringkasan Belanja</h3>
            <div className="flex justify-between items-center">
              <p>Total: </p>
              <p>{convertToIDR(totalAmount)}</p>
            </div>
            <div className="mt-4">
              <div>
                <button
                  onClick={() => handleCheckoutProduct()}
                  className={`bg-green-500 rounded-md p-2 w-full text-center text-white ${!selectedProducts.length
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                    }`}
                  disabled={!selectedProducts.length}>
                  Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
