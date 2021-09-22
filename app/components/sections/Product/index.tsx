import PropTypes from 'prop-types';
import Grid from '../../elements/Grid';

export default function Product({ list }) {
  return <Grid list={list} link="product" />;
}

Product.propTypes = {
  list: PropTypes.array,
};
