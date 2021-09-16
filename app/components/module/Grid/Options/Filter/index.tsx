import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import PanelDropdown from '../../../../elements/PanelDropdown';
import More from './More';
import SortBy from './SortBy';

const options = [
  { id: "1", value: 'Default Order', label: 'Default Order' },
  { id: "2", value: 'Highest Rated', label: 'Highest Rated' },
  { id: "3", value: 'Most Reviewed', label: 'Most Reviewed' },
  { id: "4", value: 'Newest Listings', label: 'Newest Listings' },
  { id: "5", value: 'Oldest Listings', label: 'Oldest Listings' },
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
