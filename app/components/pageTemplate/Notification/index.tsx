import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormInputText } from '../../../common/components/elements/Form/FormInputText';
import { FormSelect } from '../../../common/components/elements/Form/FormSelect';
import { CategorySelect } from '../../../common/components/elements/Form/withData/CategorySelect';
import Grid from '../../../common/components/elements/Grid';
import { SearchFactory } from '../../../common/components/sections/Search2/factory';
import { GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import { ALL_STORE, useAllStore } from '../../../graphql/Store';
import UserSearchSubscription from '../../sections/UserSearch';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';

export default function Notification() {
  const { data, error, loading } = useAllStore();
  //const { data, error, loading } = useQuery(ALL_STORE);
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);

  const defaultValues = {
    category: 0,
    location: "Mendoza",
    notificationType: null,
  };

  interface IFormInput {
    category: number,
    location: string,
    notificationType: number,
  }

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, getValues } = methods;

  const onSearch = (data: IFormInput) => {
    console.dir(data)
  }

  let categoryOptions = [{ value: 2, title: "value" }];

  const options = [
    {
      name: "category",
      component: <CategorySelect control={control} onChange={() => console.log("eee")} />
    },
    {
      name: "location",
      component: <FormInputText name="location" control={control} variant="standard" label="Location" icon={<LocationOnIcon />} />
    },
    {
      name: "search",
      component: <FormSelect name="query" control={control} label="What are you looking for?" options={categoryOptions} freeSolo
        onChange={() => console.log(4)}
        groupBy={(option) => {
          return option?.category
        }} />
    },
    {
      name: "submit",
      component: <Button
        variant="contained"
        onClick={handleSubmit(onSearch)}>
        Search
      </Button>
    }
  ]

  return (
    <>

      <SearchFactory options={options} />
      {data?.stores?.length > 0 ?
        <Grid list={data.stores} type="store" />
        :
        <p>no data</p>}
      {
        isSubscribed && userSearchResponse?.id && <UserSearchSubscription key={userSearchId} userSearchId={userSearchId} userSearchResponse={userSearchResponse} />
      }
    </>
  )
}
