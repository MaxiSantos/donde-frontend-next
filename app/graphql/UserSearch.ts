import { BASE_STORE_FIELDS, BASE_STORE_FIELDS_PAYLOAD } from "app/common/graphql/fragments/Store";
import gql from "graphql-tag";

export const USER_SEARCH_SUBSCRIPTION = gql`
  ${BASE_STORE_FIELDS_PAYLOAD}
  subscription USER_SEARCH_SUBSCRIPTION($topic: String!) {
    userSearchSubscription(topic: $topic){      
      ...BaseStoreFieldsPayload
      storeProductFiltered{
        storeId
        productId
        image
      }         
      storeResponse{
        status
        comment
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
      response{
        status
        comment
      }
    }
  }
`;

/*storeProductFiltered{
        storeId
        productId
        image
      }*/
