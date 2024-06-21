export interface productType {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productcategory: string;
  productSold: string;
  productRatings: string;
  productNumberOfRatings: string;
  sellerCity: string;
  productStock: number;
  productDetail: string;
}

export interface CartProduct extends productType {
  qty: number;
  totalPrice: number;
}
