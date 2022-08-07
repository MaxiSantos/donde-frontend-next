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
import { LocationSelect } from "app/common/components/elements/Form/withData/LocationSelect";
import { useTranslation } from "react-i18next";

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const PublicationSearch = () => {
  const client = useApolloClient();
  const { authResponse: { user } } = useAuth();
  const { t } = useTranslation('common');
  const defaultValues = {
    category: null,
    location: locations[0],
    search: null,
  };

  interface IFormInput {
    category: selectOptionsProps | null,
    location: string,
    search: number | string,
  }

  const {
    findItems: findPublicationsBySearch,
    data: { publications } = {},
    error: resultsError,
    loading: resultsLoading,
  } = usePublicationsByCategory();

  useEffect(() => {
    if (publications?.length >= 0) {
      client.writeQuery({
        query: ALL_PUBLICATION_QUERY,
        data: { publications }
      });
    }
  }, [client, publications]);

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

    findPublicationsBySearch({
      variables,
    })
  }
  const options = [
    {
      name: "category",
      component: <CategorySelect control={control} variant="standard" />,
      bp: 5
    },
    {
      name: "location",
      component: <LocationSelect control={control} freeSolo={false} multiple={false} variant="standard" />,
      bp: 5
    },
    /*{
      name: "notification",
      component: <FormSelect name="notification" control={control} variant="standard" label="Select notification type" options={[
        {
          value: "DISCOUNT",
          title: "Discounts",
        },
        {
          value: "PROMOTION",
          title: "Promotions",
        },
        {
          value: "NEW_PRODUCT",
          title: "New product",
        }
      ]}
      />
    },*/
    {
      name: "submit",
      component: <CustomButton
        variant="contained"
        onClick={handleSubmit(onSearch)}>
        {t('search-box.search')}
      </CustomButton>,
      bp: 2,
      isButton: true
    }
  ]

  return <SearchFactory options={options} />
}
