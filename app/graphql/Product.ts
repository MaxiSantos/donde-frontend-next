import { useLazyQuery, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { update } from 'lodash';

export const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    products(
      where: {
        OR: [
          { name: { contains: $searchTerm } }
          { description: { contains: $searchTerm } }
        ]
      }
    ) {
      id
      name
      description
      category {
        name
      }
    }
  }
`;

export const useSeachProducts = () => {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    },

  );
  return {
    findItems,
    loading,
    data,
    error,
  };
};

export const ALL_PRODUCT_QUERY = gql`
  query ALL_PRODUCT_QUERY {
    products {
      id
      name
      description
      category {
        name
      }
    }
  }
`;

export const useAllProductQuery = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCT_QUERY);

  return {
    data,
    error,
    loading,
  };
};
