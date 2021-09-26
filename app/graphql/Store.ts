import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const ALL_STORE = gql`
  query ALL_STORE {
    stores {
      id
      name
      location
      telephone
      category {
        name
      }
    }
  }
`;

export const useAllStore = () => {
  const { data, error, loading } = useQuery(ALL_STORE);

  return {
    data,
    error,
    loading,
  };
};
