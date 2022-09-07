import { useForm } from "react-hook-form";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FormInputText } from "../../../common/components/elements/Form/FormInputText";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { FormSelect } from "../../../common/components/elements/Form/FormSelect";
import { Button } from "@mui/material";
import { useApolloClient, useQuery } from "@apollo/client";
import { useAuth } from 'app/common/context/useAuthContext';
import { GetIsSearching, GetIsSearchBoxOpen, GetIsSubscribed, GetUserSearchId, GetUserSearchResponse } from "../../../common/graphql/local";
import { useEffect, useRef } from "react";
import { ALL_PUBLICATION_QUERY, usePublicationsByCategory } from "app/common/graphql/queries/Publication";
import { selectOptionsProps } from "app/common/components/elements/Form/FormProps";
import CustomButton from "app/common/components/elements/Button";
import { LocationSelect } from "app/common/components/elements/Form/withData/LocationSelect";
import { useTranslation } from "react-i18next";
import { useMedia } from "app/common/hooks/useMedia";

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const PublicationSearch = () => {
  const client = useApolloClient();
  const { authResponse: { user } } = useAuth();
  const refCategory = useRef(null);
  const timerRef = useRef(null);
  const timerRef2 = useRef(null);
  const { isMobile } = useMedia();
  const { data: { isSearching } = {} } = useQuery(GetIsSearching);
  const { t } = useTranslation('common');
  const defaultValues = {
    category: null,
    location: locations[0],
    search: null,
  };

  interface IFormInput {
    category: selectOptionsProps | null,
    location: selectOptionsProps,
    search: number | string,
  }

  const {
    findItems: findPublicationsBySearch,
    data: { publications } = {},
    error: resultsError,
    loading: resultsLoading,
  } = usePublicationsByCategory();

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(timerRef2.current);
    }
  }, []);

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
          publication: true
        }
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
      component: <CategorySelect optional={refCategory} onOpen={handleOnOpen} control={control} blurOnSelect={true} variant="standard" />,
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
        {t('actions.search')}
      </CustomButton>,
      bp: 2,
      isButton: true
    }
  ]

  const header = {
    title: t("search-box.title-publication"),
    subtitle: t("search-box.subtitle-general")
  }

  return <SearchFactory options={options} header={header} isSearching={isSearching?.publication} />
}
