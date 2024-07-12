"use client";
import { useState } from "react";
import {
  BigImage,
  BigImageWrapper,
  ImageButtons,
  Image,
} from "../StyledComponents/SingleProductSection";
import styled from "styled-components";

type Props = {
  images: string[];
};

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
      border-color: #ccc;
    `
      : `
      border-color: transparent;
    `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const ProductImages = ({ images }: Props) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images &&
          images.map((image) => (
            <ImageButton
              key={image}
              active={image === activeImage}
              onClick={() => setActiveImage(image)}
            >
              <Image src={image} alt="" />
            </ImageButton>
          ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
