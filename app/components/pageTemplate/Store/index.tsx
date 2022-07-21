import { useApolloClient } from '@apollo/client';
import Grid from 'app/common/components/elements/Grid';
import { useRouteChange } from 'app/common/hooks/useRouteChange';
import { cache } from 'app/common/lib/apolloCache';
import { StoreHelper } from 'app/common/model/Store';
import { ALL_STORE, useAllRecentlyAddedStore } from 'app/graphql/Store';
import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Store() {
  const { t } = useTranslation('common');
  const client = useApolloClient();
  //const { data: { stores } = {}, error, loading } = useAllRecentlyAddedStore();
  const { data, loading } = useAllRecentlyAddedStore();
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

  useRouteChange(() => {
    client.writeQuery({
      query: ALL_STORE,
      data: { stores: [] }
    });
    cache.gc();
  })

  return (
    <>
      {
        data?.stores?.length > 0 ?
          <Grid list={data.stores} type="store" />
          :
          <p>{`${t('no-data')}`}</p>
      }
    </>
  )
}
