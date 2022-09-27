import { Container } from "@mui/material";
import { TextHelper } from "app/common/lib/text";
import { useTranslation } from "next-i18next";
import { BoxTitle, Paragraph, Title } from "../Typography";

const TitleBox = (props) => {
  const {title, image, p} = props;
  return <Container
  sx={{
    backgroundImage: `url(${image})`,
    backgroundPositionY: 'center',
    backgroundSize: 'cover',
    height:'150px',
    position: 'relative',
    width: '100%',
    ["&::before"]:{
      content: '""',
      position: "absolute",
      backgroundSize: "cover",
      background: "rgba(0,0,0,0.75)",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
      opacity: 0.75,
    }
  }}
>
  <BoxTitle>{title}</BoxTitle>
  <Paragraph sx={{color:'white', position: 'absolute', top: '70px'}}>{p}</Paragraph>
</Container>
} 

export default function Welcome(props) {
  const { t } = useTranslation('common');
  return <Container sx={{marginBottom: "50px"}}>
    <Title>Bienvenido</Title>
    <TitleBox title={TextHelper.capitalize(t('home.welcome.title'))} alt={t('home.welcome.title')} image={'/images/slider-bg-01.jpg'} p={t('home.welcome.p')} />
  </Container> 
}