import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Grid from '../../../common/components/elements/Grid';
import { GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import { useAllRecentlyAddedStore } from '../../../graphql/Store';
import UserSearchSubscription from '../../sections/UserSearch';

export default function Home() {
  const { data, error, loading } = useAllRecentlyAddedStore();
  const { t } = useTranslation('common');
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);

  return (
    <>
      {data?.stores?.length > 0 ?
        <Grid list={data.stores} type="store" />
        :
        <p>{t('no-data')}</p>}
      {
        isSubscribed && userSearchResponse?.id && <UserSearchSubscription key={userSearchId} userSearchId={userSearchId} userSearchResponse={userSearchResponse} />
      }
      <p>Tutorial</p>
    </>
  )
}
