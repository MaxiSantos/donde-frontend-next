'use client'
import { useBreakpoint } from "app/common/hooks/useBreakpoint";
import { TextHelper } from "app/common/lib/text";
import { useTranslation } from "app/i18n/client";
import { ParallaxBanner } from "react-scroll-parallax";

export default function Welcome(props) {
  const { lng } = props;
  const { t } = useTranslation(lng, 'common');
  const isMobile = useBreakpoint('sm')
  const isTablet = useBreakpoint('md')
  return <div>
    <h1>{TextHelper.capitalize(t('home.welcome.title'))}</h1>
    <ParallaxBanner
      layers={[
        { image: '/images/fondo1b.jpeg', speed: -20, style: { opacity: 0.3 } },
      ]}
      style={{ aspectRatio: '2 / 1', height: isMobile ? "240px" : (isTablet ? "170px" : "140px") }}
    >
      <div>
        <p>Descubre una nueva forma de conectar con negocios locales y aprovechar increíbles oportunidades. Nuestra plataforma te brinda acceso a una variedad de servicios que simplifican tu búsqueda y te mantienen informado sobre las últimas novedades en el mundo de los negocios.</p>
      </div>
    </ParallaxBanner>
  </div>
}