"use client";
import { ProductType } from "@/shared/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Center from "../StyledComponents/Center";
import { Title } from "../StyledComponents/NewProductsSection";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

const NewProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/api/newProducts");
    setProducts(response.data);
  };

  if (!products) return <Center>Loading...</Center>;

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default NewProducts;
