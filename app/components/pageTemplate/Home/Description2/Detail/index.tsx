import { Stack } from "@mui/material";
import { Icon } from "./Icon";
import Content from "./Content";

export default function Details(props) {
  const { item } = props;
  return <Stack
    direction={"row"}
    justifyContent="center"
    sx={{ marginBottom: "30px" }}
    alignItems="center">
    <Icon icon={item.icon}></Icon>
    <Content item={item}></Content>
  </Stack>
}
