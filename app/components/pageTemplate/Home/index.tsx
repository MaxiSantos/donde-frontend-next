import { useApolloClient, useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Grid from '../../../common/components/elements/Grid';
import { GetCountdownTimeout, GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import { ALL_STORE, useAllRecentlyAddedStore } from 'app/graphql/Store';
import UserSearchSubscription from '../../sections/UserSearch';
import { Delayed } from 'app/common/components/elements/Delayed'
import { useEffect } from 'react';
import { StoreHelper } from 'app/common/model/Store';
import cloneDeep from "lodash.clonedeep";
import moment from 'moment';
import { useRouteChange } from 'app/common/hooks/useRouteChange';
import { udpateUserSearchState } from './helper';
import { cache } from 'app/common/lib/apolloCache';

export default function Home() {
  console.log("rendering home page template !!!!!!!!!!!!")
  const client = useApolloClient();

  const { data, error, loading } = useAllRecentlyAddedStore();
  //const { stores } = data;
  //const stores = [];

  const { t } = useTranslation('common');
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { countdownTimeout } = {} } = useQuery(GetCountdownTimeout);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);

  useEffect(() => {
    //if (stores.length >= 0 && !loading) {
    console.log({ stores: data?.stores }, "from useEffect")
    if (data?.stores.length >= 0) {
      const clonedStores = cloneDeep(data?.stores);
      StoreHelper.addIsOpen(clonedStores)
      const sortedStores = clonedStores.sort(function (a, b) { return b.isOpen - a.isOpen });
      client.writeQuery({
        query: ALL_STORE,
        data: { stores: sortedStores }
      });
    }
    return () => {
      //console.log("cleaned up: " + moment().format("hh:mm:ss"));
    };
  }, [data]);

  useRouteChange(() => {
    client.writeQuery({
      query: ALL_STORE,
      data: { stores: [] }
    });
    cache.gc();

    udpateUserSearchState({
      client,
      isSubscribed: false,
      userSearchResponse: null,
      /**
       * * UserSearchSubscription is closing countdown on router change so we just need to make sure its reseted to default here so next time we come back to home we dont see the "no answer" (dont make sense.. it should only be shown once the countdown has finished and the user hasnt leave the page)
       */
      countdownTimeout: false
    })
  })
  return (
    <>
      {
        isSubscribed && userSearchResponse?.id && !countdownTimeout &&
        <Delayed>
          <UserSearchSubscription key={userSearchId} userSearchId={userSearchId} userSearchResponse={userSearchResponse} />
        </Delayed>
      }
      {
        countdownTimeout && <Box sx={{ width: '100%', marginBottom: "40px", textAlign: "center" }}>
          {/* TODO: why do we need this message here if its already appearing in other place? search-box.no-answer */}
          <span>{t("search-box.no-answer")}</span>
        </Box>
      }
      {data?.stores?.length > 0 ?
        <Grid list={data.stores} type="store" />
        :
        <p>{t('no-data')}</p>}
    </>
  )
}
