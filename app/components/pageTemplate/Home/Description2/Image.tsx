import { Box, Container } from "@mui/material";
import { Paragraph } from "../Typography";

export default function Details(props) {
  const { p, url, linkTitle } = props;
  return <Box>
    <Paragraph>{p}</Paragraph>
    {linkTitle}
  </Box>
}
