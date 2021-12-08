import { useForm } from "react-hook-form";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FormInputText } from "../../../common/components/elements/Form/FormInputText";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { FormSelect } from "../../../common/components/elements/Form/FormSelect";
import { Button } from "@mui/material";
import { useApolloClient } from "@apollo/client";
import { useAuth } from 'app/common/context/useAuthContext';
import { GetIsSearching, GetIsSearchBoxOpen, GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from "../../../common/graphql/local";
import { useEffect } from "react";
import { ALL_PUBLICATION_QUERY, usePublicationsByCategory } from "app/common/graphql/queries/Publication";
import { selectOptionsProps } from "app/common/components/elements/Form/FormProps";
import CustomButton from "app/common/components/elements/Button";
import { ALL_STORE_QUERY, useStoreByCategory } from "app/common/graphql/queries/Store";

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const StoreSearch = () => {
  const client = useApolloClient();
  const { authResponse: { user } } = useAuth();
  const defaultValues = {
    category: null,
    location: locations[0],
  };

  interface IFormInput {
    category: selectOptionsProps | null,
    location: string,
  }

  const {
    findItems: findStoresBySearch,
    data: { stores } = {},
    error: resultsError,
    loading: resultsLoading,
  } = useStoreByCategory();

  useEffect(() => {
    if (stores?.length >= 0) {
      client.writeQuery({
        query: ALL_STORE_QUERY,
        data: { stores }
      });
    }
  }, [client, stores]);

  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, getValues } = methods;

  const onSearch = (data: IFormInput) => {
    console.dir(data)
    let variables = {
      categoryId: data?.category?.value,
      location: data.location.value
    }

    client.writeQuery({
      query: GetIsSearching,
      data: {
        isSearching: true
      },
    });

    client.writeQuery({
      query: GetIsSearchBoxOpen,
      data: {
        isSearchBoxOpen: false
      },
    });

    findStoresBySearch({
      variables,
    })
  }
  const options = [
    {
      name: "category",
      component: <CategorySelect control={control} variant="standard" />
    },
    {
      name: "location",
      component: <FormSelect name="location" control={control} label={'location'} options={locations} variant="standard"
      />
    },
    {
      name: "submit",
      component: <CustomButton
        variant="contained"
        onClick={handleSubmit(onSearch)}>
        Search
      </CustomButton>
    }
  ]

  return <SearchFactory options={options} />
}
