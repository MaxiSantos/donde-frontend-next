import { useQuery } from '@apollo/client';
import Grid from 'app/common/components/elements/Grid';
import { ALL_STORE_QUERY } from 'app/common/graphql/queries/Store';
import { useAllRecentlyAddedStore } from 'app/graphql/Store';
import { useTranslation } from 'react-i18next';

export default function Store() {
  const { t } = useTranslation('common');
  const { data: { stores } = {}, error, loading } = useAllRecentlyAddedStore();
  return (
    <>
      {stores?.length > 0 ?
        <Grid list={stores} type="store" />
        :
        <p>{t('no-data')}</p>}
    </>
  )
}
