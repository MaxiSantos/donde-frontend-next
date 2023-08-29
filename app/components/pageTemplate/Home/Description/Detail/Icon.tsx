import { styled } from '@mui/material/styles';
import { useMedia } from 'app/common/hooks/useMedia';

//const IconContainer = styled("div")`
export const IconContainer = styled('div')((props) => ({
  height: props.isMobile ? "60px" : "100px",
  width: props.isMobile ? "60px" : "100px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "100%",
  flex: `0 0 ${props.isMobile ? "60px" : "100px"}`,
  transition: "0.3s",
  justifyContent: "center",
  background: props.color,
  "i": {
    fontSize: props.isMobile ? "25px" : "36px",
    textAlign: "center",
    color: "#66676b",
  }
}));

export const Icon = (props) => {
  const { isMobile } = useMedia();
  let { icon } = props;

  return (
    <IconContainer color={icon.color} isMobile={isMobile}>
      <i className={`im ${icon.type}`}></i>
    </IconContainer>
  );
};
