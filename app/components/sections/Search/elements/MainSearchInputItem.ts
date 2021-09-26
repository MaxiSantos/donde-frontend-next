import { Col } from "react-bootstrap";
import styled from "styled-components";

export const MainSearchInputItem = styled(Col)`
&&& {
  flex: 1;
  border-right: 1px solid #e9e9e9;
  margin-top: 3px;
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  input {
    font-size: 16px;
    border: none;
    background: #fff;
    margin: 0;
    padding: 0;
    height: 44px;
    line-height: 44px;
    box-shadow: none;
  }
  select {
    border: none;
    //padding-top: 2px;
    //padding-bottom: 0;
    height: 44px;
    box-shadow: none;
  }
  button {
    font-size: 18px;
    font-weight: 600;
    padding: 0 40px;
    margin-right: 1px;
    height: 50px;
    outline: none;
  }
  :nth-last-child(-n + 2) {
    border-right: none;
    padding-left: 15px;
    padding-right: 15px;
  }
}
`;