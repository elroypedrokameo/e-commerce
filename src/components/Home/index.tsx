import Header from "../Header";
import Banner from "../../../public/images/banner.webp";
import { useEffect, useState } from "react";
import { productType } from "../type";
import ProductCard from "./ProductCard";

function Home() {
  const [products, setProducts] = useState<productType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleChange = (search: string) => {
    setSearchQuery(search);
  }

  const productFiltered: productType[] = products.filter(product => product.productName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      <Header isHomePage onSearch={handleChange} />
      <div className="m-auto my-5 max-w-container">
        <div>
          <img src={Banner} alt="logo e-commerce" />
        </div>
        <div className="mt-5 -ml-4 -mr-4 grid grid-cols-6 box-border">
          {
            productFiltered ? productFiltered.map(product => (
              <ProductCard key={product.productId} product={product} />
            )) : products.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home