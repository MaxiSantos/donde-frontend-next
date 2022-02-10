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

export default function Home() {
  const client = useApolloClient();
  const { data, error, loading } = useAllRecentlyAddedStore();
  const { t } = useTranslation('common');
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { countdownTimeout } = {} } = useQuery(GetCountdownTimeout);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);

  useEffect(() => {
    if (data?.stores.length >= 0 && !loading) {
      const clonedData = cloneDeep(data);
      StoreHelper.addIsOpen(clonedData.stores)
      const sortedStores = clonedData.stores.sort(function (a, b) { return b.isOpen - a.isOpen });
      client.writeQuery({
        query: ALL_STORE,
        data: { stores: sortedStores }
      });
    }
  }, [client, data]);

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
