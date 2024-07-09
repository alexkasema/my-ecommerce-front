"use client";
import { useContext, useState } from "react";
import Center from "../StyledComponents/Center";
import {
  Logo,
  NavLink,
  StyledHeader,
  StyledNav,
  Wrapper,
} from "../StyledComponents/StyledComponents";
import { CartContext } from "../CartContext/CartContext";

const Header = () => {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>My eCommerce</Logo>
          <StyledNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
