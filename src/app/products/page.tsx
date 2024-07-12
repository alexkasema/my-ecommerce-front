"use client";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import Center from "@/components/StyledComponents/Center";
import { Title } from "@/components/StyledComponents/StyledComponents";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Center>
      <Title>All Products</Title>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default ProductsPage;
