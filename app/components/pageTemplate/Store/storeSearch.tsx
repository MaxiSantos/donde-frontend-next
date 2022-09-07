import { useForm } from "react-hook-form";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { useApolloClient, useQuery } from "@apollo/client";
import { useAuth } from 'app/common/context/useAuthContext';
import { GetIsSearching, GetIsSearchBoxOpen } from "../../../common/graphql/local";
import { useEffect, useRef } from "react";
import { selectOptionsProps } from "app/common/components/elements/Form/FormProps";
import CustomButton from "app/common/components/elements/Button";
import { ALL_STORE_QUERY, useStoreByCategory } from "app/common/graphql/queries/Store";
import { useTranslation } from "react-i18next";
import { LocationSelect } from "app/common/components/elements/Form/withData/LocationSelect";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { StoreHelper } from "app/common/model/Store";
import { useMedia } from "app/common/hooks/useMedia";

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const StoreSearch = () => {
  const client = useApolloClient();
  const { t } = useTranslation('common');
  const refCategory = useRef(null);
  const timerRef = useRef(null);
  const timerRef2 = useRef(null);
  const { isMobile } = useMedia();
  const { data: { isSearching } = {} } = useQuery(GetIsSearching);
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
    location: selectOptionsProps,
  }

  const {
    findItems: findStoresBySearch,
    data: { stores } = {},
    error: resultsError,
    loading: resultsLoading,
  } = useStoreByCategory();

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(timerRef2.current);
    }
  }, []);

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
    if (isMobile) {
      timerRef2.current = setTimeout(() => {
        window.scroll({ behavior: 'smooth', top: 0 })
      }, 250);
    }
    let variables = {
      categoryId: data?.category?.value,
      location: data.location.value
    }

    client.writeQuery({
      query: GetIsSearching,
      data: {
        isSearching: {
          ...isSearching,
          store: true
        }
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

  const handleOnOpen = () => {
    if (isMobile) {
      timerRef.current = setTimeout(() => {
        refCategory.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 250);
    }
  };

  const options = [
    {
      name: "category",
      component: <CategorySelect optional={refCategory} onOpen={handleOnOpen} blurOnSelect={true} control={control} variant="standard" />,
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
        {t('actions.search')}
      </CustomButton>,
      bp: 2,
      isButton: true
    }
  ]

  const header = {
    title: t("search-box.title-store"),
    subtitle: t("search-box.subtitle-general")
  }

  return <SearchFactory options={options} header={header} isSearching={isSearching?.store} />
}
