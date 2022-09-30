import { styled } from '@mui/material/styles';
import { Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';

import { TextHelper } from "app/common/lib/text";
import { SuperTitle } from "app/common/components/elements/Typography";
import { useTranslation } from "next-i18next";
import { BoxTitle, SubTitle, Paragraph, Title } from "../Typography";
import { useMedia } from 'app/common/hooks/useMedia';
import { CardTopBorder } from 'app/common/components/elements/Cards/Basic/CardTopBorder';
import { Jumbotron } from 'app/common/components/elements/Jumbotron';

export default function Welcome(props) {
  const { t } = useTranslation('common');
  const { isMobile } = useMedia();
  const list = [
    t('home.welcome.jumbotron.p1'),
    t('home.welcome.jumbotron.p2'),
    t('home.welcome.jumbotron.p3'),
    t('home.welcome.jumbotron.p4'),
  ]
  return <Container
    sx={{
      height: isMobile ? "800px" : "570px"
    }}>
    <Title>{TextHelper.capitalize(t('home.welcome.title'))}</Title>
    <Jumbotron
      title={TextHelper.capitalize(t('home.welcome.jumbotron.title'))}
      tagline={TextHelper.capitalize(t('home.welcome.jumbotron.tagline'))}
      image={'/images/shopping1.jpeg'}
    >
      <Container sx={{ marginTop: "25px" }}>
        <SubTitle sx={{ background: "white", color: "black", display: "inline-block", padding: '5px', borderRadius: '5px' }}>{TextHelper.capitalize(t('home.welcome.jumbotron.subtitle'))}</SubTitle>
        <Masonry columns={isMobile ? 1 : 2} spacing={4}>
          {list.map((item, index) => (
            <CardTopBorder key={index} p={item} />
          ))}
        </Masonry>
      </Container>
    </Jumbotron>
  </Container>
}
