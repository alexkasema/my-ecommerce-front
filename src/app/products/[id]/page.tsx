"use client";
import Button from "@/components/Button/Button";
import { CartContext } from "@/components/CartContext/CartContext";
import CartIcon from "@/components/icons/CartIcon";
import ProductImages from "@/components/ProductImages/ProductImages";
import Center from "@/components/StyledComponents/Center";
import {
  Title,
  WhiteBox,
} from "@/components/StyledComponents/NewProductsSection";
import {
  ColWrapper,
  Price,
  PriceRow,
} from "@/components/StyledComponents/SingleProductSection";
import { ProductType } from "@/shared/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);

  const { addProduct } = useContext(CartContext);

  const url = "/products";

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/?_id=${id}`);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Center>
      <ColWrapper>
        <WhiteBox href={url}>
          <ProductImages images={product?.images} />
        </WhiteBox>
        <div>
          <Title>{product?.title}</Title>
          <p>{product?.description}</p>
          <PriceRow>
            <div>
              <Price>${product?.price}</Price>
            </div>
            <div>
              <Button primary onClick={() => addProduct(product?._id)}>
                <CartIcon />
                Add to cart
              </Button>
            </div>
          </PriceRow>
        </div>
      </ColWrapper>
    </Center>
  );
};

export default ProductPage;
