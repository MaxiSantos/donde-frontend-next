import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import GridGroup from './GridGroup';
import Options from './Options';

const Pagination = () => <div>pagination</div>;

export default function Grid({ list, link }) {
  return (
    <Col>
      <Options />
      <GridGroup list={list} link={link} />
      <Pagination />
    </Col>
  );
}

Grid.propTypes = {
  list: PropTypes.array,
  link: PropTypes.string,
};
