import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { STORE_BY_ID } from 'app/common/graphql/queries/Store';
import { useRouter } from 'next/router';
import { Grid as MaterialGrid, Typography } from '@mui/material';
import Grid from 'app/common/components/elements/Grid';
import { Promotion } from 'app/common/components/elements/Cards/Publication/Promotion';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { OpeningDays } from 'app/common/components/elements/Cards/OpeningDays';
import { InnerContainerSection } from 'app/common/components/elements/InnerContainerSection';
import { useMedia } from 'app/common/hooks/useMedia';
import { useTranslation } from 'react-i18next';
import { TextHelper } from 'app/common/lib/text';

SwiperCore.use([Navigation]);

export default function Store() {
  const router = useRouter();
  const { isMobile } = useMedia()
  const { t } = useTranslation('common');
  const [getStore, { loading, data, error }] = useLazyQuery(
    STORE_BY_ID
  );

  useEffect(() => {
    if (!router.isReady) return <p>loading</p>;
    if (router.query.id) {
      const [storeId, productId] = router.query.id.split("_")
      getStore({ variables: { storeId: parseInt(storeId) } })
    }
  }, [router.isReady]);

  console.log({ loading })
  console.log({ data })
  if (loading || !data?.store) {
    return <p>{t('loading')}</p>
  }
  const products = data.store.storeProduct.map(item => ({
    ...item.product,
    image: item.image,
    description: item.description
  })) || []
  const publications = data.store.publication || []
  const openingDays = data.store.openingDay || []
  return (
    <>
      <Typography variant="subtitle1">{data.store.name}</Typography>
      <MaterialGrid container spacing={{ xs: 2, md: 3 }} >
        <MaterialGrid item xs={12} sm={7} md={7} lg={8} >
          <p>{data.store.description}</p>
        </MaterialGrid>
        <MaterialGrid item xs={12} sm={5} md={5} lg={4}>
          <OpeningDays days={openingDays} />
        </MaterialGrid>
      </MaterialGrid>
      <InnerContainerSection ismobile={isMobile}>
        <Typography variant="subtitle1">{TextHelper.capitalize(t('navigation.publication'))}</Typography>
        {
          publications.length > 0
            ?
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}

              breakpoints={{
                "640": {
                  "slidesPerView": 2,
                  "spaceBetween": 20
                },
                "768": {
                  "slidesPerView": 3,
                  "spaceBetween": 40
                },
                "1024": {
                  "slidesPerView": 4,
                  "spaceBetween": 50
                }
              }}
            >
              {publications.map(item => {
                return <SwiperSlide key={"prmotion_" + item.id}>
                  <Promotion publication={item} />
                </SwiperSlide>
              })}
            </Swiper>
            :
            <span>{TextHelper.capitalize(t('no-publication'))}</span>
        }
      </InnerContainerSection>
      <InnerContainerSection ismobile={isMobile}>
        <Typography variant="subtitle1">{TextHelper.capitalize(t('dashboard.product'))}</Typography>
        <Grid list={products} type="product" />
      </InnerContainerSection>
    </>
  )
}
