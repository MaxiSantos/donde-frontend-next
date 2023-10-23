import React from "react";
import { Container, Divider, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Title } from "../Typography";
import { Trans, useTranslation } from "next-i18next";
import { TextHelper } from "app/common/lib/text";
import { MotionWrapper } from "app/common/components/hoc";
import Detail from "./Detail";
import { randomColors } from "app/common/constants";

// fixed an issue with ownserState in frid2 mui
// https://github.com/mui/material-ui/issues/35643#issuecomment-1366206059
const BoxWrapper = React.forwardRef(function LinkWrapper(props, ref) {
  // @ts-ignore
  const { ownerState, ...other } = props;
  return <Box {...other} ref={ref} />;
});

type DetailsProp = {
  icon: {
    type: string
    color: (i: number) => string
  }
  content?: (i?: any) => React.ReactElement
  title?: (i?: any) => string
}

const Features = (props) => {
  const { t } = useTranslation('common');
  const randomColorLength = randomColors.length;
  const random = Math.floor(Math.random() * randomColorLength);
  const getNextCircularIndex = (currentIndex: number): number => {
    return (currentIndex + 1) % randomColorLength;
  }
  const details: DetailsProp[] = [
    {
      icon: {
        type: "im-icon-Clothing-Store",
        // by adding 80 at the end we are specifying the alpha color value
        color: (i) => `${randomColors[getNextCircularIndex(i)]}80`
      }
    },
    {
      icon: {
        type: "im-icon-Search-onCloud",
        color: (i) => `${randomColors[getNextCircularIndex(i)]}80`
      }
    },
    {
      icon: {
        type: "im-icon-Consulting",
        color: (i) => `${randomColors[getNextCircularIndex(i)]}80`
      },
      content: (i) => <Trans>{t(`home.description.service${i + 1}.content`)}</Trans>
    },
    {
      icon: {
        type: "im-icon-Sound",
        color: (i) => `${randomColors[getNextCircularIndex(i)]}80`
      }
    }
  ];

  return <Container>
    <Title>{TextHelper.capitalize(t('home.services.title'))}</Title>
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
    >
      {details.map((item, i) => {
        return <Grid key={`detail_${i}`} md={6} xs={12}>
          <Detail item={{
            ...item,
            icon: {
              ...item.icon,
              color: item.icon.color(random + i)
            },
            content: item.content ? item.content(i) : t(`home.description.service${i + 1}.content`),
            title: item.title ? item.title(i) : t(`home.description.service${i + 1}.title`),
          }} />
        </Grid>
      })}
    </Grid>
  </Container>
}

export default Features;
