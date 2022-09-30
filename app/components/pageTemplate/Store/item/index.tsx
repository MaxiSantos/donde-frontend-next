import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { STORE_BY_ID } from 'app/common/graphql/queries/Store';
import { useRouter } from 'next/router';
import { Grid as MaterialGrid, Typography } from '@mui/material';
import Grid from 'app/common/components/elements/Grid';
import { Publication } from 'app/common/components/elements/Cards/Publication';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { OpeningDays } from 'app/common/components/elements/Cards/OpeningDays';
import { InnerContainerSection } from 'app/common/components/elements/InnerContainerSection';
import { useMedia } from 'app/common/hooks/useMedia';
import { useTranslation } from 'react-i18next';
import { TextHelper } from 'app/common/lib/text';
import { ContactLink } from './elements/ContactLink';
import { Title } from 'app/common/components/elements/Title';
import { Box } from '@mui/system';
import { CategoryTag } from 'app/common/components/elements/Tag/CategoryTag'
import { Actions } from 'app/common/components/elements/Grid/Items/Store/Actions';
import { LoadingScreen } from 'app/common/components/elements/LoadingScreen';

SwiperCore.use([Navigation]);

export default function Store(props) {
  const router = useRouter();
  const { data } = props;
  const { isMobile } = useMedia()
  const { t } = useTranslation('common');
  return <LoadingScreen />
  if (router.isFallback) {
    return <LoadingScreen />
  }
  
  /*const [getStore, { loading, data, error }] = useLazyQuery(
    STORE_BY_ID
  );

  useEffect(() => {
    if (!router.isReady) return <p>loading</p>;
    if (router.query.id) {
      const [storeId, productId] = router.query.id.split("_")
      getStore({ variables: { storeId: parseInt(storeId) } })
    }
  }, [router.isReady]);*/

  /*console.log({ loading })
  console.log({ data })
  if (loading || !data?.store) {
    return <p>{t('loading')}</p>
  }*/
  const products = data.store.storeProduct.map(item => ({
    ...item.product,
    image: item.image,
    description: item.description
  })) || []
  const publications = data.store.publication || []
  const openingDays = data.store.openingDay || []
  return (
    <>
      <Title>
        {TextHelper.capitalize(data.store.name)}
        {data.store.category.map(item => <CategoryTag key={item.id}>{item.name}</CategoryTag>)}
      </Title>
      <Box component="div" sx={{ marginBottom: "20px", marginTop: "-15px" }}>
        <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${data.store.location}`} rel="noopener noreferrer">
          <i className="fa fa-map-marker"></i> {data.store.location}
        </a>
      </Box>

      <MaterialGrid container spacing={{ xs: 2, md: 3 }} >
        <MaterialGrid item xs={12} sm={7} md={7} lg={8} >
          <p>{data.store.description}</p>
          {/*<ContactLink>
            {data.store.telephone && <li><a href="tel:12-345-678"><i className="fa fa-phone"></i>{data.store.telephone}</a></li>}
          </ContactLink>*/}
          <Actions item={data.store} link={["all"]} />
        </MaterialGrid>
        <MaterialGrid item xs={12} sm={5} md={5} lg={4}>
          <OpeningDays days={openingDays} />
        </MaterialGrid>
      </MaterialGrid>
      <InnerContainerSection $ismobile={isMobile}>
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
                  <Publication publication={item} />
                </SwiperSlide>
              })}
            </Swiper>
            :
            <span>{TextHelper.capitalize(t('no-publication'))}</span>
        }
      </InnerContainerSection>
      <InnerContainerSection $ismobile={isMobile}>
        <Typography variant="subtitle1">{TextHelper.capitalize(t('sidebar.product.title'))}</Typography>
        <Grid list={products} type="product" />
      </InnerContainerSection>
    </>
  )
}
