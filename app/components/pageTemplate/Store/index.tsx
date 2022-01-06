import Grid from 'app/common/components/elements/Grid';
import { useAllRecentlyAddedStore } from 'app/graphql/Store';
import { useTranslation } from 'react-i18next';

export default function Store() {
  const { t } = useTranslation('common');
  //const { data: { stores } = {}, error, loading } = useAllRecentlyAddedStore();
  const { data } = useAllRecentlyAddedStore();
  return (
    <>
      {data?.stores?.length > 0 ?
        <Grid list={data.stores} type="store" />
        :
        <p>{t('no-data')}</p>}
    </>
  )
}
