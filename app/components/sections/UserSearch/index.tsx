import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import { USER_SEARCH_SUBSCRIPTION } from '../../../graphql/UserSearch';
import Countdown from 'react-countdown';
import { GetCountdownTimeout, GetIsSubscribed, GetNewStoreBySearch, GetUserSearchResponse } from "../../../common/graphql/local";
import { useEffect } from "react";
import { addToCollection } from "../../../common/lib/apolloCache";
import { LinearProgressWithLabel } from '../../../common/components/elements/Progress/LinearProgressWithLabel'
import { StoreHelper } from "app/common/model/Store";
import { useTranslation } from "next-i18next";
import moment from "moment";

export default function UserSearchSubscription({ userSearchId, userSearchResponse = {} }) {
  const client = useApolloClient();
  const { data: { newStoreBySearch } = {} } = useQuery(GetNewStoreBySearch);
  const { t } = useTranslation('common');
  const { data: { userSearchSubscription: subscriptionData } = {}, loading: subscriptionLoading, error: subscriptionError } = useSubscription(
    USER_SEARCH_SUBSCRIPTION, {
    variables: {
      topic: "userSearch_" + userSearchResponse.id
    }
  }
  );

  useEffect(() => {
    console.log("subscription mounted: " + moment().format("hh:mm:ss"))
    if (subscriptionData) {
      console.log({ subscriptionData })
      const openingDay = StoreHelper.getCurrentOpDay(subscriptionData.openingDay)
      subscriptionData.isOpen = StoreHelper.isOpen(openingDay)
      addToCollection("stores", subscriptionData)
    }
    return () => {
      console.log("cleaned up: " + moment().format("hh:mm:ss"));
    };
  }, [subscriptionData])

  const renderer = (obj) => {
    const { hours, minutes, seconds, completed, api, props } = obj;
    if (completed) {
      // Render a completed state
      client.writeQuery({
        query: GetIsSubscribed,
        data: {
          isSubscribed: false
        },
      });
      client.writeQuery({
        query: GetUserSearchResponse,
        data: {
          userSearchResponse: null
        },
      });
      client.writeQuery({
        query: GetCountdownTimeout,
        data: {
          countdownTimeout: true
        }
      });
      return <Box sx={{ width: '100%', marginBottom: "40px", textAlign: "center" }}>
        <span>{t("search-box.no-answer")}</span>
      </Box>
    } else {
      // Render a countdown
      const total = parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_TIME) / 1000;
      const remaining = (total - seconds);
      const progress = remaining * 100 / total
      return <Box sx={{ width: '100%', marginBottom: "40px" }}>
        <span>{t("search-box.asking-stores")}</span>
        <LinearProgressWithLabel value={progress} label={(seconds).toString()} />
      </Box>
    }
  };
  if (subscriptionError) {
    console.log(subscriptionError)
    return <p>{t("search-box.error-answer")}</p>;
  }
  console.log(process?.env)
  return (
    <Container sx={{ width: "50%" }}>
      <Countdown
        key={"cdown_" + userSearchResponse?.userSearchId}
        date={new Date(userSearchResponse?.createdAt).getTime() + parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_TIME)}
        renderer={renderer}
      />
    </Container>)
}
