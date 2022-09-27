import { Container } from "@mui/material";
import { StyledLink } from "app/common/components/elements/Grid/elements/stlLink";
import { Paragraph } from "../../Typography";

export default function Details(props) {
  const {p, url, linkTitle} = props;
  return <Container>
    <Paragraph>{p}</Paragraph>
    <StyledLink url={url}>
      {linkTitle}
    </StyledLink>
  </Container>
}
