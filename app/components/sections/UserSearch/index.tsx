import { useEffect } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import Countdown from 'react-countdown';
import { useTranslation } from "next-i18next";
import { GetCountdownTimeout, GetIsSearching, GetIsSubscribed, GetNewStoreBySearch, GetStoresPayload, GetUserSearchResponse } from "app/common/graphql/local";
import { USER_SEARCH_SUBSCRIPTION } from 'app/graphql/UserSearch';
import { addToCollection, cache } from "app/common/lib/apolloCache";
import { LinearProgressWithLabel } from 'app/common/components/elements/Progress/LinearProgressWithLabel'
import { StoreHelper } from "app/common/model/Store";
import { useMedia } from "app/common/hooks/useMedia";
import { TypingIndicator } from "app/common/components/elements/Typing/TypingIndicator";
import { useRouteChange } from "app/common/hooks/useRouteChange";
import { transformPayload, udpateUserSearchState } from "app/components/pageTemplate/Query/helper";

export default function UserSearchSubscription({ userSearchId, userSearchResponse = {} }) {
  const client = useApolloClient();
  let countdownApi;
  const { data: { storesPayload } = { storesPayload: [] } } = useQuery(GetStoresPayload);
  const { t } = useTranslation('common');
  const { isMobile } = useMedia();
  const { data: { userSearchSubscription: subscriptionData } = {}, loading: subscriptionLoading, error: subscriptionError } = useSubscription(
    USER_SEARCH_SUBSCRIPTION, {
    variables: {
      topic: "userSearch_" + userSearchResponse.id
    }
  }
  );

  useEffect(() => {
    //console.log("subscription mounted: " + moment().format("hh:mm:ss"))
    if (subscriptionData) {
      const data = transformPayload(subscriptionData)
      //const openingDay = StoreHelper.getCurrentOpDay(subscriptionData.openingDay)
      //subscriptionData.isOpen = StoreHelper.isOpen(openingDay)
      console.log("adding subscription data to stores")
      console.log({ data })
      console.log({ storesPayload })
      client.writeQuery({
        query: GetStoresPayload,
        data: {
          //storesPayload: [data]
          storesPayload: [...storesPayload, data],
        },
      });

      //addToCollection("stores", data)
      //addToCollection("storesPayload", data)

    }
    return () => {
      //console.log("subscription cleaned up: " + moment().format("hh:mm:ss"));
    };
  }, [subscriptionData])

  useRouteChange(() => {
    console.log("stopping countdown !!!")
    countdownApi.stop();
  })

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const renderer = (obj) => {
    const { hours, minutes, seconds, completed, api, props } = obj;
    //console.log({ obj })
    if (completed) {
      // Render a completed state
      udpateUserSearchState({
        client,
        isSubscribed: false,
        userSearchResponse: null,
        countdownTimeout: true
      })
      return <Box sx={{ width: '100%', marginBottom: "40px", textAlign: "center" }}>
        <span>{t("search-box.no-answer")}</span>
      </Box>
    } else {
      // Render a countdown
      const total = parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_TIME) / 1000;
      const minutesToSeconds = minutes * 60;
      const remaining = (total - seconds - minutesToSeconds);
      const progress = remaining * 100 / total;
      const time = `${minutes < 10 ? 0 + minutes.toString() : minutes}:${seconds < 10 ? 0 + seconds.toString() : seconds}`;
      return <Box sx={{ width: '100%', marginBottom: "40px" }}>
        <span>{t("search-box.asking-stores")}</span>
        <Box sx={{ marginLeft: "10px", display: "inline" }}><TypingIndicator /></Box>
        <LinearProgressWithLabel value={progress} label={time} />
      </Box>
    }
  };

  if (subscriptionError) {
    console.log(subscriptionError)
    return <p>{t("search-box.error-answer")}</p>;
  }
  return (
    <Container sx={{ width: isMobile ? "100%" : "70%" }}>
      <Countdown
        key={"cdown_" + userSearchResponse?.userSearchId}
        ref={setRef}
        date={new Date(userSearchResponse?.createdAt).getTime() + parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_TIME)}
        renderer={renderer}
      />
    </Container>)
}
