import { Link } from "react-router-dom";
import { convertToIDR } from "../../utils/currencyUtils";
import { productType } from "../type";
import "./index.css";

type ProductCardProps = {
  product: productType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/detail/${product.productId}`} className="rounded-lg m-4 text-center box-border product-card hover:cursor-pointer">
      <div className="card-image w-full">
        <img className="object-cover m-auto rounded-t-lg" src={product.productImage} alt={product.productName} width="100%" height="100%" />
      </div>
      <div className="card-body text-start p-2 flex flex-col">
        <h2 className="text-sm">{product.productName}</h2>
        <p className="text-base font-bold">{convertToIDR(product.productPrice)}</p>
        <p className="text-sm">{product.sellerCity}</p>
      </div>
    </Link>
  );
};

export default ProductCard;