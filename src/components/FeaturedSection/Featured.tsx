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
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductType } from "@/shared/types";

const Featured = () => {
  const [Product, setProduct] = useState<ProductType | null>(null);
  useEffect(() => {
    getFeaturedProduct();
  }, []);
  const getFeaturedProduct = async () => {
    const featuredProduct = await axios.get("/api/featured");
    setProduct(featuredProduct.data);
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
                <ButtonLink href={"/"} outline={1} white={1}>
                  Read More
                </ButtonLink>
                <Button white={1}>
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
