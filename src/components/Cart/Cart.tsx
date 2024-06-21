import { useEffect, useState } from "react";
import Header from "../Header";
import { CartProduct } from "../type";
import { convertToIDR } from "../../utils/currencyUtils";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartProduct[]>([]);
  // const [selectedProduct, setSelectedProduct] = useState()

  const buyProduct = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="m-auto mt-5 max-w-container">
        <h1 className="font-bold text-lg">Keranjang</h1>
        <div className="flex justify-between gap-5 mt-4">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cart.map((product) => (
                <div key={product.productId} className="border rounded shadow">
                  <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover mb-4 rounded" />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
                    <p className="mb-2">Price: Rp {product.productPrice.toLocaleString('id-ID')}</p>
                    <p className="mb-2">Quantity: {product.qty}</p>
                    <p className="mb-2">Total: Rp {convertToIDR(product.totalPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="rounded-lg h-max w-[400px] product-card p-5">
            <h3 className="font-bold text-base">Ringkasan Belanja</h3>
            <div className="mt-4">
              <div >
                <button onClick={() => buyProduct()} className="bg-green-500 rounded-md p-2 w-full text-center text-white">Beli</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart