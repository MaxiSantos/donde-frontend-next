import { GetCountdownTimeout, GetIsSubscribed, GetUserSearchResponse } from "app/common/graphql/local";
import { StoreHelper } from "app/common/model/Store";

export const udpateUserSearchState = (props) => {
  const { client, isSubscribed, userSearchResponse, countdownTimeout } = props;

  /*const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { countdownTimeout } = {} } = useQuery(GetCountdownTimeout);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);*/

  // https://mariusschulz.com/blog/nullish-coalescing-the-operator-in-typescript
  typeof isSubscribed === "boolean" && client.writeQuery({
    query: GetIsSubscribed,
    data: {
      isSubscribed
    },
  });
  userSearchResponse !== undefined && client.writeQuery({
    query: GetUserSearchResponse,
    data: {
      userSearchResponse
    },
  });
  typeof isSubscribed === "boolean" && client.writeQuery({
    query: GetCountdownTimeout,
    data: {
      countdownTimeout
    }
  });

  //return { isSubscribed, countdownTimeout, userSearchResponse };
  return null;
};

export const isNewSearch = (crrSearch, newSearch) => {
  if (!crrSearch) {
    return true
  }
  console.log({ crrSearch })
  console.log({ newSearch })
  const keys = Object.keys(crrSearch)
  for (let index = 0; index < keys.length; index++) {
    const value1 = crrSearch[keys[index]];
    const value2 = newSearch[keys[index]];
    if (value1 !== value2) {
      return true
    }
  }
  return false;
}

export const transformPayload = (payload) => {
  let response;
  const openingDay = StoreHelper.getCurrentOpDay(payload.openingDay)
  payload.isOpen = StoreHelper.isOpen(openingDay)
  response = {
    ...payload,
    isOpen: StoreHelper.isOpen(openingDay),
    //storeResponse: payload.storeResponse
  }
  return response;
}
