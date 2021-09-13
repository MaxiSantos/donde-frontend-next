import { Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../../../../elements/Button';

export default function More({ options }) {
  const StlCol = styled(Col)`
    input {
      padding: 0;
      margin-top: 8px;
    }
  `;

  const PanelButton = styled.div`
    width: 100%;
    margin-top: 13px;
  `;

  return (
    <StlCol md={12}>
      {options.map((option) => (
        <Form.Check type="checkbox" label={`${option.label}`} />
      ))}
      <PanelButton>
        <Button>Apply</Button>
        <Button type="cancel">Cancel</Button>
      </PanelButton>
    </StlCol>
  );
}
