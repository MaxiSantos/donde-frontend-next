import { useQuery } from '@apollo/client';
import { BASE_STORE_FIELDS } from 'app/common/graphql/fragments/Store';
import gql from 'graphql-tag';
import moment from 'moment';

// stores(where:{createdAt:{equals: $startDate}}) {
// query ALL_STORE{
export const ALL_STORE = gql`
  ${BASE_STORE_FIELDS}
  query ALL_STORE($startDate: DateTime!){
    stores(where:{createdAt:{equals: $startDate}}) {
      ...BaseStoreFields
    }
  }               
`;

export const useAllRecentlyAddedStore = () => {
  const today = moment();
  const startOfWeek = new Date(today.startOf('week').format());
  const { data, error, loading } = useQuery(ALL_STORE, {
    variables: {
      startDate: startOfWeek
    },
    //fetchPolicy: "cache-and-network"
  });

  return {
    data,
    error,
    loading,
  };
};
