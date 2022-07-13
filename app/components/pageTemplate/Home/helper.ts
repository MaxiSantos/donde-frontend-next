import React, { useEffect, useState } from "react";
import { GetCountdownTimeout, GetIsSubscribed, GetUserSearchResponse } from "app/common/graphql/local";

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
  console.log("updating user search state on udpateUserSearchState !!!", props)

  //return { isSubscribed, countdownTimeout, userSearchResponse };
  return null;
};
