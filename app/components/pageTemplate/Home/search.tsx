import { useForm } from "react-hook-form";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FormInputText } from "../../../common/components/elements/Form/FormInputText";
import { CategorySelect } from "../../../common/components/elements/Form/withData/CategorySelect";
import { SearchFactory } from "../../../common/components/sections/Search2/factory"
import { FormSelect } from "../../../common/components/elements/Form/FormSelect";
import { Button } from "@mui/material";
import { useSeachProductsByCategory } from "../../../common/graphql/Product";
import { CategoryForm } from "../../../common/constants/types";

export const HomeSearch = () => {
  const defaultValues = {
    category: 'a',
    location: "Mendoza",
    search: 'a',
  };

  interface IFormInput {
    category: [CategoryForm] | null,
    location: string,
    search: number | string,
  }

  const {
    findItems: findProductsByCategory,
    data: results2,
    error: resultsError2,
    loading: resultsLoading2,
  } = useSeachProductsByCategory();

  let productOptions = results2?.products.map((item: { id: string; name: string; category: [{ name: string }] }) => ({
    value: item.id,
    title: item.name,
    category: item.category[0].name,
  })) || [];

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
    console.dir(data)
  }
  const options = [
    {
      name: "category",
      component: <CategorySelect control={control} onUpdate={onChangeCategorySelect} />
    },
    {
      name: "location",
      component: <FormInputText name="location" control={control} variant="standard" label="Location" icon={<LocationOnIcon />} />
    },
    {
      name: "search",
      component: <FormSelect name="search" control={control} label="What are you looking for?" options={productOptions} freeSolo
        onUpdate={() => console.log(5)}
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

  return <SearchFactory options={options} />
}
