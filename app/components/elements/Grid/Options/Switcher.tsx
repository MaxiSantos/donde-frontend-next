import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Button = styled.a`
  width: 39px;
  height: 39px;
  background-color: #eee;
  display: inline-block;
  color: #9d9d9d;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  transition: all 0.4s;
  border-radius: 50%;
  font-weight: 500;
  overflow: hidden;
  position: relative;
  margin-right: 1px;
  i {
    position: relative;
    z-index: 11;
  }
`;

export default function Switcher() {
  return (
    <Col md={6}>
      <Button>
        <i className="fa fa-th" />
      </Button>
      <Button>
        <i className="fa fa-align-justify" />
      </Button>
    </Col>
  );
}
