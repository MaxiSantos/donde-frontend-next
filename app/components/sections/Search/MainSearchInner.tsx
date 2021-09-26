import { Col, Container, Form, Row } from 'react-bootstrap';
import { useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { MainSearchInputItem } from './elements/MainSearchInputItem';
import { MainSearchInnerContainer } from './elements/MainSearchInnerContainer';
import { MainSearchInput } from './elements/MainSearchInput';
import { useSeachProducts } from '../../../common/graphql/Search';
import { ALL_STORE } from '../../../graphql/Store';
import { useAllCategory1Level } from '../../../common/graphql/Category';

const MainSearchHeadlines = styled.div`
  padding-right: 550px;
`;

const H2 = styled.h2`
  font-size: 42px;
  color: #111;
`;

const H4 = styled.h4`
  color: #111;
  opacity: 0.5;
  font-weight: 400;
  line-height: 32px;
  font-size: 24px;
`;

export default function MainSearchInner({ props }) {
  const client = useApolloClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, loading } = useAllCategory1Level();
  let options = data?.categories.map((item: { id: any; name: any; }) => ({
    value: item.id,
    label: item.name,
  })) || [];
  const [searchCategory, setSearchCategory] = useState(options[0]);

  const {
    findItems,
    data: results,
    error: resultsError,
    loading: resultsLoading,
  } = useSeachProducts();

  useEffect(() => {
    if (results?.search?.length > 0) {
      client.writeQuery({
        query: ALL_STORE,
        data: { stores: results.search }
      });
    }
  }, [results]);

  const search = () => {
    findItems({
      variables: {
        userId: 7,
        categoryId: searchCategory.value,
        productId: 64,
      },
    })
  }

  const onChangeSelect = (item) => {
    setSearchCategory(item);
  };

  const findItemsButChill = debounce(findItems, 350);

  const filterColors = (inputValue) =>
    [].filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

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
                <input
                  type="text"
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    /*findItemsButChill({
                      variables: {
                        searchTerm: e.target.value,
                      },
                    });*/
                  }}
                  value={searchTerm}
                  placeholder="What are you looking for?"
                />
              </MainSearchInputItem>

              <MainSearchInputItem md={3} xs={12}>
                <div id="autocomplete-container">
                  <input
                    id="autocomplete-input"
                    type="text"
                    placeholder="Location"
                  />
                </div>
                <a href="#">
                  <i className="fa fa-map-marker" />
                </a>
              </MainSearchInputItem>

              <MainSearchInputItem md={3} xs={12}>
                <Select
                  inputId="react-select-input-id"
                  instanceId="react-select-instance-id"
                  onChange={onChangeSelect}
                  value={searchCategory}
                  options={options}
                />

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
