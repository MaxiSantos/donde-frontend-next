import { Container, Divider } from "@mui/material";
import { useMedia } from "app/common/hooks/useMedia";
import { TextHelper } from "app/common/lib/text";
import { useTranslation } from "next-i18next";
import { Section } from "./section";
import Details from "./section/Details";
import { Title } from "../Typography";

export default function Features(props) {
  const { t } = useTranslation('common');
  const { isMobile } = useMedia();
  return <Container>
    <Title>servicios</Title>
    <Section
      title={TextHelper.capitalize(t('navigation.store'))}
      image="/images/slider-bg-01.jpg"
      content={<Details p={t('home.services.store.p')} url={"/query"} linkTitle={`${t('actions.go-to')} ${t('navigation.store')}`} />}
      />
    <Divider orientation="horizontal" flexItem style={{marginRight:"-1px"}} />
    <Section
      title={TextHelper.capitalize(t('navigation.query'))}
      image="/images/slider-bg-02.jpg"
      interpolate={isMobile ? false : true}
      content={<Details p={t('home.services.query.p')} url={"/query"} linkTitle={`${t('actions.go-to')} ${t('navigation.query')}`}/>}
      />
    <Divider orientation="horizontal" flexItem style={{marginRight:"-1px"}} />
    <Section
      title={TextHelper.capitalize(t('navigation.publication'))}
      image="/images/slider-bg-01.jpg"
      content={<Details p={t('home.services.publication.p')} url={"/query"} linkTitle={`${t('actions.go-to')} ${t('navigation.publication')}`} />}
      />
    <Divider orientation="horizontal" flexItem style={{marginRight:"-1px"}} />
    <Section
      title={TextHelper.capitalize(t('navigation.notification'))}
      interpolate={isMobile ? false : true}
      image="/images/slider-bg-02.jpg"
      content={<Details p={t('home.services.notification.p')} url={"/notification"} linkTitle={`${t('actions.go-to')} ${t('navigation.notification')}`} />}
    />
  </Container>
}
