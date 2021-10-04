import { useQuery, useSubscription } from "@apollo/client";
import { USER_SEARCH_SUBSCRIPTION } from '../../../graphql/UserSearch';
import Grid from '../../../common/components/elements/Grid';
import { GetUserSearchId } from "../../../common/graphql/local";
import { GetNewStoreBySearch } from "../../../common/graphql/local";
import { useEffect } from "react";
import { addToCollection } from "../../../common/lib/apolloCache";

export default function UserSearchSubscription({ userSearchId }) {
  //const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { newStoreBySearch } = {} } = useQuery(GetNewStoreBySearch);

  const { data: { userSearchSubscription: subscriptionData } = {}, loading: subscriptionLoading, error: subscriptionError } = useSubscription(
    USER_SEARCH_SUBSCRIPTION, {
    variables: {
      topic: "userSearch_" + userSearchId
    }
  }
  );

  console.log({ userSearchId })
  useEffect(() => {
    if (subscriptionData) {
      console.log("new data comming " + subscriptionData)
      addToCollection("stores", subscriptionData)
    }
  }, [subscriptionData])

  if (subscriptionError) {
    return <p>Something went asking other stores...</p>;
  }
  console.log("UserSearchSubscription")
  return newStoreBySearch?.length > 0 && userSearchId ?
    <Grid list={newStoreBySearch} type="store" />
    :
    <p>Asking other stores</p>
}
