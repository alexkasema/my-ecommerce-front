"use client";
import { mongooseConnect } from "@/lib/mongoose";
import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";
import CartIcon from "../icons/CartIcon";
import Center from "../StyledComponents/Center";
import {
  Bg,
  ButtonsWrapper,
  Column,
  ColumnsWrapper,
  Desc,
  Title,
} from "../StyledComponents/FeaturedSection";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "@/shared/types";
import { CartContext } from "../CartContext/CartContext";

const Featured = () => {
  const [Product, setProduct] = useState<ProductType | null>(null);
  const { addProduct } = useContext(CartContext);
  useEffect(() => {
    getFeaturedProduct();
  }, []);
  const getFeaturedProduct = async () => {
    const featuredProduct = await axios.get("/api/featured");
    setProduct(featuredProduct.data);
  };

  const addFeaturedToCart = () => {
    addProduct(Product?._id);
  };
  return (
    <Bg>
      <Center>
        {" "}
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{Product?.title}</Title>
              <Desc>{Product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + Product?._id}
                  outline={1}
                  white={1}
                >
                  Read More
                </ButtonLink>
                <Button white={1} onClick={addFeaturedToCart}>
                  {" "}
                  <CartIcon /> Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={Product?.images[0]} alt="featured image" />
          </Column>
        </ColumnsWrapper>{" "}
      </Center>
    </Bg>
  );
};

export default Featured;
