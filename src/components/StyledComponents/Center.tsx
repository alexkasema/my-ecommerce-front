"use client";

import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

type Props = {
  children: React.ReactNode;
};

const Center = ({ children }: Props) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
