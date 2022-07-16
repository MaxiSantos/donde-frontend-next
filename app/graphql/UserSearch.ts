import { BASE_STORE_FIELDS } from "app/common/graphql/fragments/Store";
import gql from "graphql-tag";

export const USER_SEARCH_SUBSCRIPTION = gql`
  ${BASE_STORE_FIELDS}
  subscription USER_SEARCH_SUBSCRIPTION($topic: String!) {
    userSearchSubscription(topic: $topic){
      ...BaseStoreFields      
      storeProductFiltered{
        storeId
        productId
        image
      }         
    }
  }
`;

export const USER_SEARCH_SUBSCRIPTION_BK = gql`  
  subscription USER_SEARCH_SUBSCRIPTION($topic: String!) {
    userSearchSubscription(topic: $topic){
      id
      name
      location
      telephone
      wsp
      openingDay{
        id
        day
        openingHour{
          id
          open
          close
        }
      }      
      category{
        id
        name
      }
      storeProductFiltered{
        storeId
        productId
        image
      }         
    }
  }
`;

/*storeProductFiltered{
        storeId
        productId
        image
      }*/
