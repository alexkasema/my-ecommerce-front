import React from "react";
import {
  CardTitle,
  Price,
  PriceRow,
  ProductInfoBox,
  ProductWrapper,
  WhiteBox,
} from "../StyledComponents/NewProductsSection";
import Button from "../Button/Button";

type Props = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
};

const ProductCard = ({ _id, title, description, price, images }: Props) => {
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <CardTitle href={url}>{title}</CardTitle>
        <PriceRow>
          <Price>${price.toFixed(2)}</Price>
          <Button block primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductCard;
