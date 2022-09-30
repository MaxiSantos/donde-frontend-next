import { useTranslation } from "next-i18next";
import styled from "@emotion/styled";
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { EmotionHelper } from "app/common/lib/emotion";
import { useMedia } from "app/common/hooks/useMedia";
import { MenuIcons } from "app/common/components/sections/Header/Drawer";
import { TextHelper } from "app/common/lib/text";
import { Title } from "app/common/components/elements/Title";
import { ButtonLink } from "app/common/components/elements/Link/ButtonLink";
import { StickyNote } from "app/common/components/elements/StickyNote";
import colors from 'app/common/styles/theme/themes-vars.module.scss';

const Card = styled('div', EmotionHelper.getTransientOptions()) <CardProps>`
  position: relative;
  min-width: 320px;
  height: 440px;
  //background: ${() => colors.primaryDark};
  //box-shadow: inset 1px 1px 1px #616161,
    //inset -1px -1px 5px #616161,
    //1px 1px 5px #616161, -1px -1px 5px #616161;
  border-radius: 15px;
  margin: 30px;
  transition: 0.5s;
  margin-left: auto;
  margin-right: auto;  
`;
interface CardProps {
  interpolate?: boolean
  isMobile?: boolean
}

const Box = styled('div', EmotionHelper.getTransientOptions())`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  //background: #2a2b2f;
  background: ${() => colors.primaryDark};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
  :before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.09);
  }
`;

const Content = styled('div', EmotionHelper.getTransientOptions())`
  padding: 20px;
  text-align: center;
  margin-top: 40px;
`;

const P = styled('p', EmotionHelper.getTransientOptions())`
  font-size: 16px !important;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  transition: 0.5s;
`;

const MobileContent = (props) => {
  const { title, p, url, urlLabel, Icon } = props;
  return <Content>
    <Icon sx={{
      position: "absolute",
      top: "10px",
      right: 0,
      left: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: "4em",
      height: "4em",
      color: colors.secondaryMain
    }} />
    <Title sx={{ fontSize: "30px !important", color: "white" }}>{title}</Title>
    <P>{p}</P>
    <ButtonLink href={url} sx={{ marginTop: "15px" }}>
      <Typography variant='subtitle1'>
        {urlLabel}
      </Typography>
    </ButtonLink>
  </Content>
}

const DesktopContent = (props) => {
  const { title, p, url, urlLabel, Icon } = props;
  return <Grid container
    justifyContent="center"
    alignItems="center"
    spacing={1}
    sx={{
      textAlign: 'center'
    }}
  >
    <Grid item md={6}
      justifyContent="space-between"
      alignItems="center">
      <Icon sx={{
        width: "6em",
        height: "6em",
        color: colors.secondaryMain
      }} />
      <Title sx={{ fontSize: "30px !important", color: "white" }}>{title}</Title>
      <ButtonLink href={url} sx={{ marginTop: "15px" }}>
        <Typography variant='subtitle1'>
          {urlLabel}
        </Typography>
      </ButtonLink>
    </Grid>
    <Grid item md={6} alignItems="center">
      <StickyNote p={p} />
    </Grid>
  </Grid>
}

export const Section = (props) => {
  const { type, url } = props;
  const { isMobile } = useMedia();
  const { t } = useTranslation('common');
  const title = TextHelper.capitalize(t(`navigation.${type}`))
  const p = t(`home.services.${type}.p`);
  const urlLabel = `${t('actions.go-to')} ${t(`navigation.${type}`)}`
  const Icon = MenuIcons[type];
  return <Card>
    <Box>
      {isMobile ?
        <MobileContent title={title} p={p} url={url} urlLabel={urlLabel} Icon={Icon} />
        :
        <DesktopContent title={title} p={p} url={url} urlLabel={urlLabel} Icon={Icon} />
      }
    </Box>
  </Card>
}
