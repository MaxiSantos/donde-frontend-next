import { Col, Container, Form, Row } from 'react-bootstrap';
import { useApolloClient } from '@apollo/client';
import Select from 'react-select';
import AsyncSelect from "react-select/async";

import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { MainSearchInputItem } from './elements/MainSearchInputItem';
import { MainSearchInnerContainer } from './elements/MainSearchInnerContainer';
import { MainSearchInput } from './elements/MainSearchInput';
import { useSeachStore } from '../../../common/graphql/Search';
import { ALL_STORE } from '../../../graphql/Store';
import { useAllCategory1Level } from '../../../common/graphql/Category';
import { MainSearchHeadlines } from './elements/MainSearchHeadlines';
import { H2, H4 } from '../../../common/components/elements/Title';
import { useSeachProductsByCategory } from '../../../common/graphql/Product';

export default function MainSearchInner({ props }) {
  const client = useApolloClient();
  //const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const { data, error, loading } = useAllCategory1Level();
  let categoryOptions = data?.categories.map((item: { id: any; name: any; }) => ({
    value: item.id,
    label: item.name,
  })) || [];
  const [searchCategory, setSearchCategory] = useState(categoryOptions[0]);

  const {
    findItems: findProductsByCategory,
    data: results2,
    error: resultsError2,
    loading: resultsLoading2,
  } = useSeachProductsByCategory();

  let productOptions = results2?.products.map((item: { id: any; name: any; }) => ({
    value: item.id,
    label: item.name,
  })) || [];

  const [searchProduct, setSearchProduct] = useState(productOptions[0]);

  /*const {
    findItems,
    data: results,
    error: resultsError,
    loading: resultsLoading,
  } = useSeachStore();*/



  /*useEffect(() => {
    if (results?.search?.length > 0) {
      client.writeQuery({
        query: ALL_STORE,
        data: { stores: results.search }
      });
    }
  }, [results]);*/

  const search = () => {
    let variables = {
      userId: 7,
      categoryId: searchCategory.value,
      productId: null,
      query: "",
      location: searchLocation
    }

    if (searchProduct.value === "QUERY") {
      variables.query = searchProduct.label;
    } else {
      variables.productId = searchProduct.value
    }

    /*findItems({
      variables,
    })*/
  }

  const onChangeCategorySelect = (item) => {
    setSearchCategory(item);
    findProductsByCategory({
      variables: {
        categoryId: item.value
      }
    })
  };

  const onChangeProductSelect = (item) => {
    if (item) {
      setSearchProduct(item);
    } else {
      setSearchProduct({
        value: "QUERY",
        label: "text"
      })
    }

  };

  //const findItemsButChill = debounce(findItems, 350);

  return (
    <MainSearchInnerContainer>
      <Container>
        <Row>
          <Col md={12}>
            <Row>
              <MainSearchHeadlines>
                <H2>Find Nearby</H2>
                <H4>Expolore top-rated attractions, activities and more</H4>
              </MainSearchHeadlines>
            </Row>
            <MainSearchInput>
              <MainSearchInputItem md={3} xs={12}>
                <Select
                  inputId="react-select-input-id"
                  instanceId="react-select-instance-id"
                  onChange={onChangeCategorySelect}
                  value={searchCategory}
                  options={categoryOptions}
                />
              </MainSearchInputItem>

              <MainSearchInputItem md={3} xs={12}>
                <div id="autocomplete-container">
                  <input
                    id="autocomplete-input"
                    type="text"
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) => {
                      setSearchLocation(e.target.value)
                    }}
                  />
                </div>
                <a href="#">
                  <i className="fa fa-map-marker" />
                </a>
              </MainSearchInputItem>

              <MainSearchInputItem md={3} xs={12}>
                {/*<input
                  type="text"
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    //findItemsButChill({
                      //variables: {
                        //searchTerm: e.target.value,
                      //},
                    //});
                  }}
                  value={searchTerm}
                  placeholder="What are you looking for?"
                />*/}
                <Select
                  inputId="react-select-input-id"
                  instanceId="react-select-instance-id"
                  onChange={onChangeProductSelect}
                  value={searchProduct}
                  options={productOptions}
                />
                {/*<AsyncSelect
                  isMulti={true}
                  cacheOptions={true}
                  defaultOptions={true}
                  onChange={(opt: any) => setSearchProduct(opt)}
                loadOptions={loadOptionsIndexes} />*/}
              </MainSearchInputItem>

              <MainSearchInputItem md={3} xs={12}>
                <button
                  type="button"
                  className="button"
                  onClick={search}>
                  Search
                </button>
              </MainSearchInputItem>
            </MainSearchInput>
          </Col>
        </Row>
      </Container>
    </MainSearchInnerContainer>
  );
}
