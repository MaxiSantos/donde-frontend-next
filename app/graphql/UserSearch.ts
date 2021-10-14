import gql from "graphql-tag";

export const USER_SEARCH_SUBSCRIPTION = gql`
  subscription USER_SEARCH_SUBSCRIPTION($topic: String!) {
    userSearchSubscription(topic: $topic){
      id
      name
      location
      telephone
      wsp
      category{
        id
        name
      }   
    }
  }
`;
