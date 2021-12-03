import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { STORE_BY_ID } from 'app/common/graphql/queries/Store';
import { useRouter } from 'next/router';
import { Grid as MaterialGrid, Typography } from '@mui/material';
import Grid from 'app/common/components/elements/Grid';
import { Promotion } from 'app/common/components/elements/Cards/Publication/Promotion';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { OpeningHours } from 'app/common/components/elements/Cards/OpeningHours';

SwiperCore.use([Navigation]);

export default function Store() {
  const router = useRouter();
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
    return <p>Loading</p>
  }
  const products = data.store.storeProduct.map(item => item.product) || []
  const publications = data.store.publication || []
  return (
    <>
      {data.store.name}
      <MaterialGrid container spacing={{ xs: 2, md: 3 }} >
        <MaterialGrid item xs={12} sm={8} >
          <p>{data.store.description}</p>
        </MaterialGrid>
        <MaterialGrid item xs={12} sm={4} >
          <OpeningHours></OpeningHours>
        </MaterialGrid>
      </MaterialGrid>
      <Typography variant="h2">Publications</Typography>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        loop
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
      <Typography variant="h2">Products</Typography>
      <Grid list={products} type="product" />
    </>
  )
}
