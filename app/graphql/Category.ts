import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const ALL_CATEGORY_1_LEVEL = gql`
  query graphQLData {
    getCategory1Level {
      id
      name
    }
  }
`;

export const useAllCategory1Level = () => {
  const { data, error, loading } = useQuery(ALL_CATEGORY_1_LEVEL);

  return {
    data,
    error,
    loading,
  };
};
