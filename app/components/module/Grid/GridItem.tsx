import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const StlLink = styled(Link)`
  background-color: #f6f6f6;
  display: block;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s;
`;

const Item = styled.div`
  background: #ccc;
  border-radius: 4px;
  height: 100%;
  display: block;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  height: 265px;
  z-index: 100;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 20px;
  :before {
    content: '';
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 9;
    background: linear-gradient(
      to top,
      rgba(35, 35, 37, 0.9) 0%,
      rgba(35, 35, 37, 0.45) 35%,
      rgba(22, 22, 23, 0) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    background-color: rgba(35, 35, 37, 0.2);
    border-radius: 4px 4px 0 0;
    opacity: 1;
  }
  :hover {
    transform: translate3d(0, -6px, 0);
  }
`;

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 4px 4px 0 0;
`;

const Badge = styled.div`
  background-color: #333;
  float: left;
  position: absolute;
  transform: rotate(45deg);
  right: -64px;
  top: 22px;
  text-align: center;
  width: 200px;
  font-size: 12.5px;
  margin: 0;
  z-index: 999;
  color: #fff;
  font-weight: 500;
  line-height: 28px;
  &.now-open {
    background-color: #54ba1d;
  }
  &.now-closed {
    background-color: #e91721;
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 28px;
  left: 0;
  padding: 0 32px;
  padding-right: 90px;
  width: 100%;
  z-index: 50;
  box-sizing: border-box;
  h3 {
    color: #fff;
    font-size: 18px;
    padding: 0 0 2px 0;
    font-weight: 500;
    margin: 0;
    line-height: 25px;
  }
  span {
    font-size: 16px;
    font-weight: 300;
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Rating = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
  line-height: 26px;
  height: 26px;
  width: 44px;
  display: inline-block;
  font-family: 'Open Sans';
  position: relative;
  border-radius: 50px;
  letter-spacing: -0.5px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 0 8px 0;
  &:before {
    content: attr(data-rating);
  }

  &.high {
    background-color: #64bc36;
  }
  &.mid {
    background-color: #c0c52a;
  }
  &.low {
    background-color: #ee3535;
  }
`;

export default function GridItem({ item, link, index }) {
  return (
    <Col md={3}>
      <StlLink href={`${link}/${item.id}`}>
        <Item>
          <Image src={`images/listing-item-0${index + 1}.jpg`} />
          <Badge className="now-open">Now open</Badge>
          <Content>
            <Rating className="high">3.5</Rating>
            <h3>
              {item.name} <i className="verified-icon" />
            </h3>
            <span>964 School Street, New York</span>
          </Content>
        </Item>
      </StlLink>
    </Col>
  );
}

GridItem.propTypes = {
  item: PropTypes.object,
  link: PropTypes.string,
  index: PropTypes.number,
};
