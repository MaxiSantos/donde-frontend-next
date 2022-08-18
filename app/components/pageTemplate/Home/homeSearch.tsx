import { useForm } from "react-hook-form";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { FormSelect2 } from "app/common/components/elements/Form/FormSelect2";
import { FormSelect } from "app/common/components/elements/Form/FormSelect";
import { useSearchProductsByCategory } from "../../../common/graphql/Product";
import { useSeachStore } from "../../../common/graphql/Search";
import { useApolloClient, useQuery } from "@apollo/client";
import { useAuth } from 'app/common/context/useAuthContext';
import { GetIsSearching, GetIsSearchBoxOpen, GetIsSubscribed, GetUserSearchId, GetLastHomeSearch } from "../../../common/graphql/local";
import { ALL_STORE } from "../../../graphql/Store";
import { useEffect, useRef } from "react";
import { selectOptionsProps } from "app/common/components/elements/Form/FormProps";
import CustomButton from "app/common/components/elements/Button";
import { useTranslation } from 'next-i18next';
import { LocationSelect } from "app/common/components/elements/Form/withData/LocationSelect";
import { useFocus } from 'app/common/hooks/useFocus'
import { StoreHelper } from "app/common/model/Store";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { isNewSearch, udpateUserSearchState } from "./helper";
import { debounce } from "lodash";
import { AmplitudeHelper } from "app/lib/amplitudeHelper";
import { useRouter } from "next/router";

const locations = [
  {
    value: "ciudad",
    title: "Ciudad"
  }
];

export const HomeSearch = () => {
  const client = useApolloClient();
  const [ref, setFocus] = useFocus();
  const router = useRouter();

  const { authResponse: { user } } = useAuth();
  const { data: { isSubscribed } = {} } = useQuery(GetIsSubscribed);
  const { data: { lastHomeSearch } = {} } = useQuery(GetLastHomeSearch);
  const { t } = useTranslation('common');

  const schema = Yup.object().shape({
    category: Yup.object().shape({
      value: Yup.number(),
      title: Yup.string()
    }).required(t("form-error.required")).nullable("false"),
    search: Yup.object().required(t("form-error.required")).nullable(true),
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
        query: GetUserSearchId,
        data: {
          userSearchId: searchData.id
        },
      });
      udpateUserSearchState({
        client,
        isSubscribed: true,
        userSearchResponse: {
          id: searchData.id,
          createdAt: searchData.createdAt
        }
      })
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
      //console.log({ formError: formState.errors })
    }
    /*if (formState) {
      console.log({ formState: formState })
    }*/
    const values = getValues();
    console.log(values)
  }, [formState]);

  const onChangeCategorySelect = (item) => {
    //console.log({ item })
    if (item?.value) {
      findProductsByCategory({
        variables: {
          categoryId: item.value
        }
      })
    } else {

    }
  };

  /*const debouncedSearch = useRef(
    debounce((criteria) => {
      return isNewSearch();
    }, 300)
  ).current;*/

  const getFormValues = (data) => {
    let variables = {
      userId: user.id,
      categoryId: data.category?.value,
      productId: undefined,
      query: "",
      location: data.location?.value
    }
    if (data.search?.value === "NEW") {
      variables.query = data.search?.title;
    } else {
      variables.productId = data.search?.value
    }

    return variables;
  }

  const onSearch = (data: IFormInput) => {
    const variables = getFormValues(data);
    if (!isNewSearch(lastHomeSearch, variables)) {
      console.log("new search not available, change your search query")
      console.log({ lastHomeSearch })
      console.log({ variables })
      return;
    }

    AmplitudeHelper.trackSearch(variables, router.asPath)

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
    client.writeQuery({
      query: GetLastHomeSearch,
      data: {
        lastHomeSearch: variables
      }
    });

    udpateUserSearchState({
      client,
      isSubscribed: false,
      countdownTimeout: false
    })

    findStoresBySearch({
      variables,
    })
  }

  const options = [
    {
      name: "category",
      component: <CategorySelect onClose={() => {
        setFocus()
      }} control={control} freeSolo={false} byChange={onChangeCategorySelect} multiple={false} variant="standard" />
    },
    {
      name: "location",
      component: <LocationSelect control={control} freeSolo={false} multiple={false} variant="standard" />
    },
    {
      name: "search",
      component: <FormSelect2 optional={ref} name="search" control={control} label={t('search-box.what-u-looking')} options={productOptions} $isAsking={true} freeSolo variant="standard" onSelect={handleSubmit(onSearch)}
        groupBy={(option) => {
          return option?.category
        }} />
    },
    /*{
      name: "submit",
      component: <Amplitude>
        {({ logEvent, instrument }) =>
          <CustomButton
            variant="contained"
            disabled={!isNewSearch(lastHomeSearch, getFormValues(getValues()))}
            //onClick={handleSubmit(onSearch)}>
            onClick={instrument('user searching', handleSubmit(onSearch))}>
            {t('search-box.search')}
          </CustomButton>
        }
      </Amplitude >
    }*/
  ]

  return <SearchFactory options={options} />
}
