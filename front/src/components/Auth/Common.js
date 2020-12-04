import Button from "../Common/Button";
import styled from "styled-components";

export const ButtonWithMarginTop = styled(Button)`
  border-radius: 8px;
  font-size: 0.8rem;
  margin-top: 1.5rem;
  height: 2.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
  font-size: 1rem;

  & + & {
    margin-top: 0.5rem;
  }
`;

export const FormBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: #000;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const Error = styled.div`
  text-align: center;
  padding-top: 1rem;
  font-size: 1rem;
  color: #e9394c;
`;
