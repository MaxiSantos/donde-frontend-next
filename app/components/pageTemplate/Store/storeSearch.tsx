import { useForm } from "react-hook-form";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { useApolloClient } from "@apollo/client";
import { useAuth } from 'app/common/context/useAuthContext';
import { GetIsSearching, GetIsSearchBoxOpen } from "../../../common/graphql/local";
import { useEffect } from "react";
import { selectOptionsProps } from "app/common/components/elements/Form/FormProps";
import CustomButton from "app/common/components/elements/Button";
import { ALL_STORE_QUERY, useStoreByCategory } from "app/common/graphql/queries/Store";
import { useTranslation } from "react-i18next";
import { LocationSelect } from "app/common/components/elements/Form/withData/LocationSelect";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { StoreHelper } from "app/common/model/Store";

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const StoreSearch = () => {
  const client = useApolloClient();
  const { authResponse: { user } } = useAuth();
  const { t } = useTranslation('common');
  const schema = Yup.object().shape({
    category: Yup.object().shape({
      value: Yup.number(),
      title: Yup.string()
    }).required(t("form-error.required")).nullable("false"),
  });
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
      StoreHelper.addIsOpen(stores)
      const sortedStores = stores.sort(function (a, b) { return b.isOpen - a.isOpen });
      client.writeQuery({
        query: ALL_STORE_QUERY,
        data: { stores: sortedStores }
      });
    }
  }, [client, stores]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });
  const { handleSubmit, reset, control, getValues, formState } = methods;

  useEffect(() => {
    if (formState.errors) {
      console.log({ formError: formState.errors })
    }
  }, [formState]);

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
      component: <CategorySelect blurOnSelect={true} control={control} variant="standard" />,
      bp: 5
    },
    {
      name: "location",
      component: <LocationSelect control={control} freeSolo={false} multiple={false} variant="standard" />,
      bp: 5
    },
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
