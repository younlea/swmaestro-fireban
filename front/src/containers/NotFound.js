import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 10px;
  display: -webkit-flex;
  -webkit-align-item: center;
  -webkit-justify-content: center;

  font-weight: bold;
`;

const Error = styled.div`
  font-size: 5rem;
`;

const Description = styled.div`
  font-size: 2rem;
`;

function NotFound() {
  return (
    <Container>
      <Link to="/stream" style={{ color: "#000" }}>
        <Error>404</Error>
        <Description>Not Found</Description>
      </Link>
    </Container>
  );
}

export default NotFound;
