import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import { CartProduct, productType } from "../type";
import StarIcon from "../../../public/images/Star icon.svg";
import { convertToIDR } from "../../utils/currencyUtils";
import Counter from "./Counter";

function DetailProduct() {
  const navigate = useNavigate();
  const { id } = useParams()

  const [product, setProduct] = useState<productType | null>(null);
  const [count, setCount] = useState<number>(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };


  const addToCart = (product: productType, qty: number, totalPrice: any) => {
    let cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex(item => item.productId === product.productId);

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].qty += qty;
      cart[existingProductIndex].totalPrice += totalPrice;
    } else {
      let newProductToAdd: CartProduct = { ...product, qty, totalPrice };
      cart.push(newProductToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    navigate('/cart')
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json');
        const products: productType[] = await response.json();
        const foundProduct = products.find((p) => p.productId == id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);


  if (!product) {
    return <>
      <Header />
      <div className="m-auto mt-5 max-w-container">
        <p>Product Not Found</p>
      </div>
    </>;
  }

  return (
    <>
      <Header />
      <div className="m-auto my-5 max-w-container flex gap-5">
        <div>
          <img src={product.productImage} alt={product.productName} />
        </div>
        <div className="max-w-screen-sm">
          <h1 className="text-xl font-bold">{product.productName}</h1>
          <div className="flex gap-2">
            <p className="text-base text-gray-500">Terjual {product.productSold}+</p>
            •
            <div className="flex gap-2 items-center">
              <img src={StarIcon} alt="Star Icon" />
              <p>({product.productRatings})</p>
            </div>
            •
            <div>
              <p>Jumlah Barang: {product.productStock}</p>
            </div>
          </div>
          <p className="mt-2 text-base font-bold">{convertToIDR(product.productPrice)}</p>
          <div className="mt-5">
            <h2 className="text-base font-bold">Detail Barang</h2>
            <p>{product.productDetail}</p>
          </div>
        </div>
        <div className="rounded-lg product-card p-5 h-max max-w-[200px]">
          <h3 className="font-bold text-base">Atur Jumlah</h3>
          <div className="mt-4">
            <Counter count={count} productStock={product.productStock} increment={increment} decrement={decrement} />
            <p className="text-sm font-bold mt-4">Total Harga: {convertToIDR(count * product.productPrice)}</p>

            <div className="my-4">
              <button
                className="bg-green-500 rounded-md p-2 w-full text-white"
                onClick={() => addToCart(product, count, count * product.productPrice)}
              >Tambah Keranjang</button>
            </div>
            <div className="w-full">
              <Link
                to="/checkout"
                className="border flex border-green-500 rounded-md p-2 w-full justify-center"
              >
                Beli Langsung
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailProduct