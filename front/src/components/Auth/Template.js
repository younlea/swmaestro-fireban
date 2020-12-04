import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  @media (max-width: 1920px) {
    margin-left: 19rem;
    margin-right: 19rem;
    width: calc(100% - 38rem);
  }
  @media (max-width: 1680px) {
    margin-left: 13rem;
    margin-right: 13rem;
    width: calc(100% - 26rem);
  }
  @media (max-width: 1440px) {
    margin-left: 9rem;
    margin-right: 9rem;
    width: calc(100% - 18rem);
  }
  @media (max-width: 1312px) {
    margin-left: 5rem;
    margin-right: 5rem;
    width: calc(100% - 10rem);
  }
  @media (max-width: 1024px) {
    margin-left: 5rem;
    margin-right: 5rem;
    width: calc(100% - 10rem);
  }
  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }
  @media (max-width: 414px) {
    margin-left: 1rem;
    margin-right: 1rem;
    width: calc(100% - 2rem);
  }

  margin-left: 20rem;
  margin-right: 20rem;
  width: calc(100% - 40rem);
  max-width: 480px;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 3rem;
  background: #ffffff;
`;

const LogoArea = styled.div`
  display: block;
  padding-bottom: 1rem;
  text-align: center;
  font-size: 4rem;
  margin-top: 1.5rem;
  color: #000000;
  font-weight: bold;
  letter-spacing: 2px;

  h1 {
    color: #000000;
  }
`;

const Box = styled.div``;

const Template = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <LogoArea>
          <Link to="/stream">
            <h1>FireBan</h1>
          </Link>
        </LogoArea>
        <Box>{children}</Box>
      </Container>
    </Wrapper>
  );
};

export default Template;
