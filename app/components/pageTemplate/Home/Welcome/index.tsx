import { Container } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';
import { TextHelper } from "app/common/lib/text";
import { useTranslation } from "next-i18next";
import { Paragraph, SubTitle, Title } from "../Typography";
import { MotionWrapper } from "app/common/components/hoc";
import { ParallaxBanner } from "react-scroll-parallax";

const Welcome = (props) => {
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
    <Title>{TextHelper.capitalize(t('home.welcome.title'))}</Title>
    <ParallaxBanner
      layers={[
        { image: '/images/fondo1.jpeg', speed: -20, style: { opacity: 0.3 } },
      ]}
      style={{ aspectRatio: '2 / 1', height: isMobile ? "240px" : (isTablet ? "170px" : "140px") }}
    >
      <Container>
        <Paragraph sx={{ position: "relative", color: "black", fontWeight: 500 }}>Descubre una nueva forma de conectar con negocios locales y aprovechar increíbles oportunidades. Nuestra plataforma te brinda acceso a una variedad de servicios que simplifican tu búsqueda y te mantienen informado sobre las últimas novedades en el mundo de los negocios.</Paragraph>
      </Container>
    </ParallaxBanner>
  </Container>
}

export default Welcome;
