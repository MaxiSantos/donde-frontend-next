import { useQuery } from '@apollo/client';
import { BASE_STORE_FIELDS } from 'app/common/graphql/fragments/Store';
import { BASE_STORE_PRODUCT_FIELDS } from 'app/common/graphql/fragments/StoreProduct';
import { ALL_STORE_QUERY } from 'app/common/graphql/queries/Store';
import gql from 'graphql-tag';
import moment from 'moment';

// stores(where:{createdAt:{equals: $startDate}}) {
// query ALL_STORE{
// query ALL_STORE($startDate: DateTime!, $includeStoreProduct: Boolean = false){

/*
TODO: if the query returns zero results the first time, then on Store page after I do a search the results comes from the server but the initial request is made again and therefore an empty array overlaps the response returned by server. Strange this is not happening in home page
*/
/*
TODO: storeProductFiltered is not available on store page. Index is sing allStore which is using storeProductFiltered but its only used on home page. StoreSearch is doing well, we just need to update ALL_STORE query and remove storeProductFiltered when user is in store page.
*/
export const ALL_STORE = gql`
  ${BASE_STORE_FIELDS}
  ${BASE_STORE_PRODUCT_FIELDS}
  query ALL_STORE($includeStoreProduct: Boolean = false){
    stores(
      orderBy:{
        createdAt: desc
      }
      take: 2
      ) {
      ...BaseStoreFields
      storeProduct @include(if: $includeStoreProduct){ 
        ...BaseStoreProductFields
      }
      storeProductFiltered @include(if: $includeStoreProduct){
        storeId
        productId
        image
      }  
    }
  }               
`;

export const STORE = gql`
  ${BASE_STORE_FIELDS}
  ${BASE_STORE_PRODUCT_FIELDS}
  query STORE($includeStoreProduct: Boolean = false){
    store {
      ...BaseStoreFields
      storeProduct @include(if: $includeStoreProduct){ 
        ...BaseStoreProductFields
      }
      storeProductFiltered @include(if: $includeStoreProduct){
        storeId
        productId
        image
      }  
    }
  }               
`;

export const ALL_STORE2 = gql`
  ${BASE_STORE_FIELDS}
  ${BASE_STORE_PRODUCT_FIELDS}
  query ALL_STORE($startDate: DateTime!, $includeStoreProduct: Boolean = false){
    stores(where:{createdAt:{equals: $startDate}}) {
      ...BaseStoreFields
      storeProduct @include(if: $includeStoreProduct){ 
        ...BaseStoreProductFields
      }
      storeProductFiltered{
        storeId
        productId
        image
      }  
    }
  }               
`;

export const useAllRecentlyAddedStore = () => {
  const today = moment();
  const startOfWeek = new Date(today.startOf('week').format());
  /*variables: {
      startDate: startOfWeek
    },*/
  const { data, error, loading } = useQuery(ALL_STORE, {
    fetchPolicy: "cache-only",
    // *returnPartialData: true because of 
    // https://github.com/apollographql/apollo-client/pull/9367/commits/d1d6666a130b92f81058d8a3fc1178af093ae5d3
    returnPartialData: true
  });

  return {
    data,
    error,
    loading,
  };
};
