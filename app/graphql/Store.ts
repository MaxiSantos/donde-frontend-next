import gql from 'graphql-tag';

export const ALL_STORE_QUERY = gql`
  query ALL_STORE_QUERY {
    allStores {
      id
      name
      location
    }
  }
`;
