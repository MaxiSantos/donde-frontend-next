import { useForm } from "react-hook-form";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { FormSelect } from "app/common/components/elements/Form/FormSelect";
import { useSearchProductsByCategory } from "../../../common/graphql/Product";
import { useSeachStore } from "../../../common/graphql/Search";
import { useApolloClient } from "@apollo/client";
import { useAuth } from 'app/common/context/useAuthContext';
import { GetIsSearching, GetIsSearchBoxOpen, GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from "../../../common/graphql/local";
import { ALL_STORE } from "../../../graphql/Store";
import { useEffect } from "react";
import { selectOptionsProps } from "app/common/components/elements/Form/FormProps";
import CustomButton from "app/common/components/elements/Button";
import { useTranslation } from 'next-i18next';
import { LocationSelect } from "app/common/components/elements/Form/withData/LocationSelect";
import { StoreHelper } from "app/common/model/Store";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const HomeSearch = () => {
  const client = useApolloClient();
  const { authResponse: { user } } = useAuth();
  const { t } = useTranslation('common');

  const schema = Yup.object().shape({
    category: Yup.object().shape({
      value: Yup.number(),
      title: Yup.string()
    }).required(t("form-error.required")).nullable("false"),
    search: Yup.object().required(t("form-error.required")).nullable("false"),
  });

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
    findItems: findProductsByCategory,
    data: results2,
    error: resultsError2,
    loading: resultsLoading2,
  } = useSearchProductsByCategory();

  const {
    findItems: findStoresBySearch,
    data: { search2: searchData } = {},
    error: resultsError,
    loading: resultsLoading,
  } = useSeachStore();

  let productOptions = results2?.products.map((item: { id: string; name: string; category: [{ name: string }] }) => ({
    value: item.id,
    title: item.name,
    category: item.category[0].name,
  })) || [];

  useEffect(() => {
    if (searchData) {
      client.writeQuery({
        query: GetIsSubscribed,
        data: {
          isSubscribed: true
        },
      });
      client.writeQuery({
        query: GetUserSearchId,
        data: {
          userSearchId: searchData.id
        },
      });
      client.writeQuery({
        query: GetUserSearchResponse,
        data: {
          userSearchResponse: {
            id: searchData.id,
            createdAt: searchData.createdAt
          }
        },
      });
      if (searchData.stores.length >= 0 && !resultsLoading2) {
        StoreHelper.addIsOpen(searchData.stores)
        const sortedStores = searchData.stores.sort(function (a, b) { return b.isOpen - a.isOpen });
        client.writeQuery({
          query: ALL_STORE,
          data: { stores: sortedStores }
        });
      }
    }
  }, [client, searchData]);

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
    let variables = {
      userId: user.id,
      categoryId: data.category.value,
      productId: undefined,
      query: "",
      location: data.location.value
    }

    if (data.search.value === "NEW") {
      variables.query = data.search.title;
    } else {
      variables.productId = data.search.value
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
      component: <CategorySelect control={control} freeSolo={false} byChange={onChangeCategorySelect} multiple={false} variant="standard" />
    },
    {
      name: "location",
      component: <LocationSelect control={control} freeSolo={false} multiple={false} variant="standard" />
    },
    {
      name: "search",
      component: <FormSelect name="search" control={control} label={t('search-box.what-u-looking')} options={productOptions} freeSolo variant="standard"
        groupBy={(option) => {
          return option?.category
        }} />
    },
    {
      name: "submit",
      component: <CustomButton
        variant="contained"
        onClick={handleSubmit(onSearch)}>
        {t('search-box.search')}
      </CustomButton>
    }
  ]

  return <SearchFactory options={options} />
}
