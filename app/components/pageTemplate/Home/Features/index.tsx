import { Container, Divider } from "@mui/material";
import { Section } from "./section";
import { Title } from "../Typography";
import { useTranslation } from "next-i18next";
import { TextHelper } from "app/common/lib/text";

export default function Features(props) {
  const { t } = useTranslation('common');

  return <Container>
    <Title>{TextHelper.capitalize(t('home.services.title'))}</Title>
    <Section
      type="store"
      url={"/store"}
    />
    <Divider orientation="horizontal" flexItem style={{ marginTop: "20px", marginBottom: "10px" }} />
    <Section
      type="query"
      url={"/query"}
    />
    <Divider orientation="horizontal" flexItem style={{ marginTop: "20px", marginBottom: "20px" }} />
    <Section
      type="publication"
      url={"/publication"}
    />
    {/* <Divider orientation="horizontal" flexItem style={{marginRight:"-1px"}} />
    <Section
      title={TextHelper.capitalize(t('navigation.notification'))}
      interpolate={isMobile ? false : true}
      image="/images/slider-bg-02.jpg"
      content={<Details p={t('home.services.notification.p')} url={"/notification"} linkTitle={`${t('actions.go-to')} ${t('navigation.notification')}`} />}
    /> */}
  </Container>
}
