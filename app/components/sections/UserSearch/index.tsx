import { useQuery, useSubscription } from "@apollo/client";
import Container from '@mui/material/Container';
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { USER_SEARCH_SUBSCRIPTION } from '../../../graphql/UserSearch';
import Countdown from 'react-countdown';
import { GetNewStoreBySearch } from "../../../common/graphql/local";
import { useEffect } from "react";
import { addToCollection } from "../../../common/lib/apolloCache";
import { subscriptionTime } from "../../../common/constants";
import { LinearProgressWithLabel } from '../../../common/components/elements/Progress/LinearProgressWithLabel'

export default function UserSearchSubscription({ userSearchId, userSearchResponse = {} }) {
  const { data: { newStoreBySearch } = {} } = useQuery(GetNewStoreBySearch);

  const { data: { userSearchSubscription: subscriptionData } = {}, loading: subscriptionLoading, error: subscriptionError } = useSubscription(
    USER_SEARCH_SUBSCRIPTION, {
    variables: {
      topic: "userSearch_" + userSearchResponse.id
    }
  }
  );

  useEffect(() => {
    if (subscriptionData) {
      addToCollection("stores", subscriptionData)
    }
  }, [subscriptionData])

  const renderer = ({ hours, minutes, seconds, completed, api, props }) => {
    if (completed) {
      // Render a completed state
      return <span>No one else answered to your search</span>;
    } else {
      // Render a countdown
      const total = subscriptionTime / 1000;
      const remaining = (total - seconds);
      const progress = remaining * 100 / total
      return <Box sx={{ width: '100%' }}>
        <span>asking other stores</span>
        <LinearProgressWithLabel value={progress} label={(seconds).toString()} />
      </Box>
    }
  };

  if (subscriptionError) {
    return <p>Something went wrong asking other stores...</p>;
  }
  return (
    <Container sx={{ width: "50%" }}>
      <Countdown
        key={"cdown_" + userSearchResponse?.userSearchId}
        date={new Date(userSearchResponse?.createdAt).getTime() + subscriptionTime}
        renderer={renderer}
      />
    </Container>)
}
