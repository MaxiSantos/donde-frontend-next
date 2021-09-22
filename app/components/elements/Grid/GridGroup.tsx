import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import GridItem from './GridItem';

export default function GridGroup({ list, link }) {
  return (
    <Row>
      {list?.map((item, i) => (
        <GridItem key={item.id} item={item} index={i} link={link} />
      ))}
    </Row>
  );
}

GridGroup.propTypes = {
  list: PropTypes.array,
  link: PropTypes.string,
};
