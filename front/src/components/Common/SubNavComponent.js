import React from "react";
import styled from "styled-components";

const SubNavItem = styled.div`
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ededed;
  border-radius: 10px;
  padding: 0.5rem;
  color: #808080;
  &:hover {
    color: #808080;
    background: #ededed;
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

const SubNavComponent = props => <SubNavItem {...props} />;
export default SubNavComponent;
