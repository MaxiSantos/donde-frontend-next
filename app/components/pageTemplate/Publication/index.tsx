import { useQuery } from '@apollo/client';
import Grid from '../../../common/components/elements/Grid';
import { ALL_PUBLICATION_QUERY } from 'app/common/graphql/queries/Publication';

export default function Publication() {
  //const { data, error, loading } = useAllStore();
  const { data: { publications } = {}, error, loading } = useQuery(ALL_PUBLICATION_QUERY);
  return (
    <>
      {publications?.length > 0 ?
        <Grid list={publications} type="publication" />
        :
        <p>no data</p>}
    </>
  )
}
