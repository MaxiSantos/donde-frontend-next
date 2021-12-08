import { useQuery } from '@apollo/client';
import Grid from 'app/common/components/elements/Grid';
import { ALL_STORE_QUERY } from 'app/common/graphql/queries/Store';
import { useAllRecentlyAddedStore } from 'app/graphql/Store';

export default function Publication() {
  //const { data, error, loading } = useAllStore();
  //const { data: { stores } = {}, error, loading } = useQuery(ALL_STORE_QUERY);
  const { data: { stores } = {}, error, loading } = useAllRecentlyAddedStore();
  return (
    <>
      {stores?.length > 0 ?
        <Grid list={stores} type="store" />
        :
        <p>no data</p>}
    </>
  )
}
