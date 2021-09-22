import Product from '../../sections/Product';
import { useAllProductQuery } from '../../../graphql/Product';

export default function Home() {
  const { data, error, loading } = useAllProductQuery();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong...</p>;
  }
  return <p>Notification page</p>;
}
