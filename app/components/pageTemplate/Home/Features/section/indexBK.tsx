import { Box, Container, Grid } from "@mui/material"
import { useTranslation } from "next-i18next";
import styled from "@emotion/styled";
import { BoxTitle, BoxTitleWrapper } from "../../Typography";
import { useMedia } from "app/common/hooks/useMedia";
import { EmotionHelper } from "app/common/lib/emotion";
import { MenuIcons } from "app/common/components/sections/Header/Drawer";
import { TextHelper } from "app/common/lib/text";

const Bar = styled('div', EmotionHelper.getTransientOptions())`
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  height: 5px;
  width: 80%;
`;

const EmptyBar = styled('div', EmotionHelper.getTransientOptions())`
  background-color: #FF9400;
  width: 100%;
  height: 100%;
`;

const Content = (props) => {
  const { icon } = props;
  let TitleIcon = icon;
  return <>
    <Bar>
      <EmptyBar />
    </Bar>
    <TitleIcon sx={{
      position: 'absolute',
      top: "50%",
      left: 0,
      right: 0,
      marginRight: 'auto',
      marginLeft: 'auto',
      textAlign: 'center',
      fontSize: 80,
      color: '#2385D7'
    }} />
  </>
}

const Card = styled('div', EmotionHelper.getTransientOptions()) <CardProps>`
  display: flex;
  height: 280px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #212121;
  border-radius: 10px;
  box-shadow: ${props => props.isMobile ? "0rem 0 3rem #212121" : (props.interpolate ? "1rem 0 3rem #212121" : "-1rem 0 3rem #212121")};
  transition: 0.4s ease-out;
  position: relative;
  left: 0px;
  /*:hover{
    transform: translateY(-20px);
    transition: 0.4s ease-out;
  }*/
`;
interface CardProps {
  interpolate?: boolean
  isMobile?: boolean
}

const TitleBox = (props) => {
  const { title, icon, interpolate, isMobile } = props;
  MenuIcons
  return <Card interpolate={interpolate} isMobile={isMobile}>
    <BoxTitle>{title}</BoxTitle>
    <Content icon={icon} />
  </Card>
}

export const Section = (props) => {
  const { type, content, interpolate = false } = props;
  const { isMobile } = useMedia();
  const { t } = useTranslation('common');
  const title = TextHelper.capitalize(t(`navigation.${type}`))
  const icon = MenuIcons[type];
  return <Grid container rowSpacing={1}
    justifyContent="center"
    alignItems="center"
    sx={{
      maxWidth: '900px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
    <Grid item md={6} xs={12}
      sx={{
        margin: '15px auto',
        padding: !interpolate ? 0 : 2,
      }}
    >
      {
        !interpolate ? <TitleBox title={title} icon={icon} isMobile={isMobile} interpolate={interpolate} /> : content
      }
    </Grid>
    <Grid item md={6} xs={12}
      sx={{
        margin: '15px auto',
        padding: interpolate ? 0 : 2,
      }}
    >
      {
        interpolate ? <TitleBox title={title} icon={icon} interpolate={interpolate} /> : content
      }
    </Grid>
  </Grid>
}
