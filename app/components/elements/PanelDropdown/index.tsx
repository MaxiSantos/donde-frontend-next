import { Collapse } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';

const Panel = styled.div`
  position: relative;
  display: inline-block;

  float: right;
`;

const A = styled.a`
  color: #666;
  font-weight: 600;
  font-size: 15px;
  border-radius: 50px;
  padding: 3px 14px;
  transition: all 0.3s;
  cursor: pointer;
  display: inline-block;
  :hover,
  .active {
    background: navajowhite;
  }
`;

const PanelTitle = styled.span`
  display: inline-block;
`;
const Arrow = styled.div`
  display: inline-block;
  :after {
    content: '\f107';
    font-family: 'FontAwesome';
    font-size: 18px;
    margin: 1px 0 0 5px;
    position: relative;
    width: auto;
    height: auto;
    display: inline-block;
    color: #c0c0c0;
    font-weight: normal;
    transition: transform 0.3s;
    ${({ open }) => open && `transform: translate3d(0,0,0) rotate(180deg);`}
  }
`;

const StlCollapse = styled(Collapse)`
  transition: all 0.3s;
  position: absolute;
  top: 44px;
  left: 0px;
  z-index: 110;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 4px;
  box-shadow: 0 12px 35px 2px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  overflow-y: hidden;
  white-space: normal;
  width: ${(props) => props.dwidth || 'auto'};
  left: auto;
  right: 0;
`;

export default function PanelDropdown({ children, options, dwidth, title }) {
  const [open, setOpen] = useState(false);
  return (
    <Panel>
      <A
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        aria-controls="example-collapse-text"
      >
        <PanelTitle>{title}</PanelTitle>
        <Arrow open={open}>
          <b />
        </Arrow>
      </A>
      <StlCollapse
        in={open}
        dwidth={dwidth}
        onBlur={() => {
          setOpen(false);
        }}
      >
        <div>{children}</div>
      </StlCollapse>
    </Panel>
  );
}
