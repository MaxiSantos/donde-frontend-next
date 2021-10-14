import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Grid from '../../../common/components/elements/Grid';
import { GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import { ALL_STORE, useAllStore } from '../../../graphql/Store';
import UserSearchSubscription from '../../sections/UserSearch';

export default function Home() {
  const { data, error, loading } = useAllStore();
  //const { data, error, loading } = useQuery(ALL_STORE);
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);

  useEffect(() => {
    console.log("page renderer on initial bootstrap !!!!!!!!!!!!!!!!!!!!")
  }, [])
  console.log("home page rendering")
  /*if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }
  console.log("home component " + loading)*/
  return (
    <>
      {data?.stores?.length > 0 ?
        <Grid list={data.stores} type="store" />
        :
        <p>no data</p>}
      {
        isSubscribed && userSearchResponse?.id && <UserSearchSubscription key={userSearchId} userSearchId={userSearchId} userSearchResponse={userSearchResponse} />
      }
    </>
  )
}
