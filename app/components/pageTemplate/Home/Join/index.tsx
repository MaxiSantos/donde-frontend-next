import { Button, Container } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from "next-i18next";
import { ParallaxBanner } from "react-scroll-parallax";
import { TextHelper } from "app/common/lib/text";
import { Paragraph, Title } from "../Typography";
import { MotionWrapper } from "app/common/components/hoc";

const Join = (props) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const list = [
    t('home.welcome.jumbotron.p1'),
    t('home.welcome.jumbotron.p2'),
    t('home.welcome.jumbotron.p3'),
    t('home.welcome.jumbotron.p4'),
  ]
  return <Container>
    <Title>{TextHelper.capitalize(t('home.join.title'))}</Title>
    <ParallaxBanner
      layers={[
        { image: '/images/fondo3.jpeg', speed: -20, style: { opacity: 0.3 } },
      ]}
      style={{ aspectRatio: '2 / 1', height: isMobile ? "230px" : (isTablet ? "160px" : "160px") }}
    >
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Paragraph sx={{ position: "relative", color: "black", fontWeight: 500 }}>{t("home.join.content")}</Paragraph>
        <Button sx={{ display: "inline", margin: "auto" }} href="mailto:consultas@dondelobusco.com?&subject=Quiero registrarme en dondelobusco&body=Por favor incluya nombre de su negocio, localidad y rubro al que pertence." variant="contained">Quiero unirme</Button>
      </Container>
    </ParallaxBanner>
  </Container>
}

export default Join;
