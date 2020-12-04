import React from "react";
import styled from "styled-components";

const SubNav = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  text-align: left;
  display: flex;
`;

const SubNavContainer = props => <SubNav {...props} />;
export default SubNavContainer;
