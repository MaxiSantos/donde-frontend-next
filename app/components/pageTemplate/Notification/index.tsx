import { useQuery } from '@apollo/client';
import Grid from '../../../common/components/elements/Grid';
import { GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import UserSearchSubscription from '../../sections/UserSearch';
import { ALL_PUBLICATION_QUERY } from 'app/common/graphql/queries/Publication';

export default function Notification() {
  //const { data, error, loading } = useAllStore();
  const { data: { publications } = {}, error, loading } = useQuery(ALL_PUBLICATION_QUERY);
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);
  console.log("data")
  console.dir(publications)
  return (
    <>
      {/*<NotificationSearch />*/}
      {publications?.length > 0 ?
        <Grid list={publications} type="publication" />
        :
        <p>no data</p>}
      {
        isSubscribed && userSearchResponse?.id && <UserSearchSubscription key={userSearchId} userSearchId={userSearchId} userSearchResponse={userSearchResponse} />
      }
    </>
  )
}
