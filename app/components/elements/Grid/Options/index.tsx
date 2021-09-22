import { Row } from 'react-bootstrap';
import Filter from './Filter';
import Switcher from './Switcher';

export default function Options() {
  return (
    <Row>
      <Switcher />
      <Filter />
    </Row>
  );
}
