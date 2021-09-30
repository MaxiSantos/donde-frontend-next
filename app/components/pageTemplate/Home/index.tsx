import { useQuery } from '@apollo/client';
import Grid from '../../../common/components/elements/Grid';
import { ALL_STORE, useAllStore } from '../../../graphql/Store';

export default function Home() {
  //const { data, error, loading } = useAllStore();
  const { data, error, loading } = useQuery(ALL_STORE);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }
  console.log("home component " + loading)
  return <Grid list={data.stores} type="store" />;
}
