import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect2 } from '../../../common/components/elements/Form/FormSelect2';
import { CategorySelect } from '../../../common/components/elements/Form/withData/CategorySelect';
import Grid from '../../../common/components/elements/Grid';
import Search from '../../../common/components/sections/Search';
import { SearchFactory } from '../../../common/components/sections/Search2/factory';
import { CategoryForm } from '../../../common/constants/types';
import { GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from '../../../common/graphql/local';
import { useSeachProductsByCategory } from '../../../common/graphql/Product';
import { ALL_STORE, useAllStore } from '../../../graphql/Store';
import UserSearchSubscription from '../../sections/UserSearch';
import { HomeSearch } from './search';

export default function Home() {
  const { data, error, loading } = useAllStore();
  //const { data, error, loading } = useQuery(ALL_STORE);
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { userSearchId } = {} } = useQuery(GetUserSearchId);
  const { data: { userSearchResponse } = {} } = useQuery(GetUserSearchResponse);
  const {
    findItems: findProductsByCategory,
    data: results2,
    error: resultsError2,
    loading: resultsLoading2,
  } = useSeachProductsByCategory();

  const defaultValues = {
    caca: {
      value: 99,
      title: "Cafeteria",
    },
  };

  interface IFormInput {
    caca: CategoryForm | null,
  }

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, getValues } = methods;
  const onChangeCategorySelect = (item) => {
    console.log({ item })
    if (item?.value) {
      findProductsByCategory({
        variables: {
          categoryId: item.value
        }
      })
    } else {

    }
  };
  const onSearch = (data: IFormInput) => {
    console.log(getValues())
    console.dir(data)
    /*findItems({
      variables: {
        ...data, 4
        stores: data.stores?.map(item => ({
          ...item,
          category: item.category?.map(obj => (obj.value))
        }))
      }
    })*/
  }

  const top100Films = [
    { value: 'a', title: 'The Shawshank Redemption' },
    { value: 'b', title: 'The Godfather' },
    { value: 'c', title: 'The Godfather: Part II' },
    { value: 'd', title: 'The Dark Knight' },
    { value: 'e', title: '12 Angry Men' },
    { value: 'f', title: "Schindler's List" },
    { value: 'g', title: 'Pulp Fiction' },
  ]

  return (
    <>
      <FormSelect2 name="caca" control={control} label="category" multiple={false}
        options={top100Films} />
      <Button
        variant="contained"
        onClick={handleSubmit(onSearch)}>
        Search
      </Button>


      {/*<HomeSearch />*/}
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
