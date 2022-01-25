import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Grid from '../../../common/components/elements/Grid';
import { GetCountdownTimeout, GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import { useAllRecentlyAddedStore } from '../../../graphql/Store';
import UserSearchSubscription from '../../sections/UserSearch';
import { Delayed } from 'app/common/components/elements/Delayed'

export default function Home() {
  const { data, error, loading } = useAllRecentlyAddedStore();
  const { t } = useTranslation('common');
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { countdownTimeout } = {} } = useQuery(GetCountdownTimeout);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);

  return (
    <>
      {
        isSubscribed && userSearchResponse?.id && !countdownTimeout &&
        <Delayed>
          <UserSearchSubscription key={userSearchId} userSearchId={userSearchId} userSearchResponse={userSearchResponse} />
        </Delayed>
      }
      {
        countdownTimeout && <Box sx={{ width: '100%', marginBottom: "40px", textAlign: "center" }}>
          <span>{t("search-box.no-answer")}</span>
        </Box>
      }
      {data?.stores?.length > 0 ?
        <Grid list={data.stores} type="store" />
        :
        <p>{t('no-data')}</p>}
    </>
  )
}
