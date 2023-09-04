import { Box, Container, Stack } from "@mui/material";
import { Paragraph } from "../../Typography";
import { H3, H4 } from "app/common/components/elements/Title";

export default function Content(props) {
  const { item: { title, content } } = props;
  return <Container sx={{ padding: "0 0" }}>
    <H4 sx={{
      fontWeight: 600,
      color: "#222",
      opacity: 1,
      lineHeight: 1.1,
      margin: "10px 0px"
    }}>
      {title}
    </H4>
    <Paragraph>{content}</Paragraph>
  </Container>
}
