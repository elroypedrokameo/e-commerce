import Header from "../Header";
import Banner from "../../../public/images/banner.webp";
import { useEffect, useState } from "react";
import { productType } from "../type";
import ProductCard from "./ProductCard";

function Home() {
  const [products, setProducts] = useState<productType[]>([])

  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <Header />
      <div className="m-auto my-5 max-w-container">
        <div>
          <img src={Banner} alt="" />
        </div>
        <div className="mt-5 -ml-4 -mr-4 grid grid-cols-6 box-border">
          {products.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home