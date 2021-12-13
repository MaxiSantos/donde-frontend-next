import { useQuery } from '@apollo/client';
import { BASE_STORE_FIELDS } from 'app/common/graphql/fragments/Store';
import { BASE_STORE_PRODUCT_FIELDS } from 'app/common/graphql/fragments/StoreProduct';
import gql from 'graphql-tag';
import moment from 'moment';

// stores(where:{createdAt:{equals: $startDate}}) {
// query ALL_STORE{
export const ALL_STORE = gql`
  ${BASE_STORE_FIELDS}
  ${BASE_STORE_PRODUCT_FIELDS}
  query ALL_STORE($startDate: DateTime!, $includeStoreProduct: Boolean = false){
    stores(where:{createdAt:{equals: $startDate}}) {
      ...BaseStoreFields
      storeProduct @include(if: $includeStoreProduct){ 
        ...BaseStoreProductFields
      }  
    }
  }               
`;

export const useAllRecentlyAddedStore = () => {
  const today = moment();
  const startOfWeek = new Date(today.startOf('week').format());
  const { data, error, loading } = useQuery(ALL_STORE, {
    variables: {
      startDate: startOfWeek,
    },
    //fetchPolicy: "cache-and-network"
  });

  return {
    data,
    error,
    loading,
  };
};
