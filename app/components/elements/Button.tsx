import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// const Button = styled.button
const Button = styled.button`
  background: none;
  padding: 5px 16px;
  display: block;
  outline: none;
  border: none;
  font-weight: 600;
  float: right;
  margin: 0;
  font-size: 15px;
  border-radius: 50px;
  background-color: #66676b;
  color: #fff;
  color: ${(props: ButtonProps) => props.dwidth || 'auto'};
  ${(props) =>
    props.mode === 'cancel'
      ? css`
          background-color: #f0f0f0;
          color: #666;
          opacity: 1;
        `
      : css`
          background-color: #f91942;
        `}
`;

interface ButtonProps {
  dwidth?: string;
  mode?: string;
}

Button.defaultProps = {
  mode: 'primary',
};

export default Button;
