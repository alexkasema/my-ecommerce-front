import { ProductType } from "@/shared/types";
import { StyledProductsGrid } from "../StyledComponents/NewProductsSection";
import ProductCard from "../ProductCard/ProductCard";

type Props = {
  products: ProductType[];
};

const ProductsGrid = ({ products }: Props) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product: ProductType) => (
          <ProductCard key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
};

export default ProductsGrid;
