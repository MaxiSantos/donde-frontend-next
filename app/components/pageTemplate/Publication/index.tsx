import { useQuery } from '@apollo/client';
import Grid from '../../../common/components/elements/Grid';
import { ALL_PUBLICATION_QUERY } from 'app/common/graphql/queries/Publication';
import { useTranslation } from 'react-i18next';

export default function Publication() {
  const { t } = useTranslation('common');
  const { data: { publications } = {}, error, loading } = useQuery(ALL_PUBLICATION_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  return (
    <>
      {publications?.length > 0 ?
        <Grid list={publications} type="publication" />
        :
        <p>{t('no-data')}</p>}
    </>
  )
}
