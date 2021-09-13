import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import PanelDropdown from '../../../../elements/PanelDropdown';
import More from './More.js.js';
import SortBy from './SortBy';

const options = [
  { value: 'Default Order', label: 'Default Order' },
  { value: 'Highest Rated', label: 'Highest Rated' },
  { value: 'Most Reviewed', label: 'Most Reviewed' },
  { value: 'Newest Listings', label: 'Newest Listings' },
  { value: 'Oldest Listings', label: 'Oldest Listings' },
];

export default function Filter() {
  return (
    <Col md={6}>
      <PanelDropdown title="Sort by" options={options} dwidth="200px">
        <SortBy options={options} />
      </PanelDropdown>
      <PanelDropdown title="More filters" options={options} dwidth="200px">
        <More options={options} />
      </PanelDropdown>
    </Col>
  );
}
