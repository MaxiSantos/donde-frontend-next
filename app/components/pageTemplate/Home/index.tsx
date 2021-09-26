import Grid from '../../../common/components/elements/Grid';
import { useAllStore } from '../../../graphql/Store';

export default function Home() {
  const { data, error, loading } = useAllStore();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }
  return <Grid list={data.stores} type="store" />;
}
