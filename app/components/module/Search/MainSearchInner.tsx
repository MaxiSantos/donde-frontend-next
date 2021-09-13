import { Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useAllCategory1Level } from '../../../graphql/Category';
import { useSeachProducts } from '../../../graphql/Product';

const MainSearchInnerContainer = styled.div`
  position: relative;
  display: block;
  top: 35%;
  transform: translate(0, -50%);
  padding-bottom: 30px;
  z-index: 2;
`;

const MainSearchInput = styled(Row)`
  margin-top: 50px;
  border-radius: 50px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 12%);
  padding: 9px;
  max-height: 68px;
`;

const MainSearchInputItem = styled(Col)`
  &&& {
    flex: 1;
    border-right: 1px solid #e9e9e9;
    margin-top: 3px;
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    height: 100%;
    input {
      font-size: 16px;
      border: none;
      background: #fff;
      margin: 0;
      padding: 0;
      height: 44px;
      line-height: 44px;
      box-shadow: none;
    }
    select {
      border: none;
      //padding-top: 2px;
      //padding-bottom: 0;
      height: 44px;
      box-shadow: none;
    }
    button {
      font-size: 18px;
      font-weight: 600;
      padding: 0 40px;
      margin-right: 1px;
      height: 50px;
      outline: none;
    }
    :nth-last-child(-n + 2) {
      border-right: none;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

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

export default function MainSearchInner() {
  const { data, error, loading } = useAllCategory1Level();
  const {
    findItems,
    data: results,
    error: resultsError,
    loading: resultsLoading,
  } = useSeachProducts();

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
                    console.log(e.target.value);
                    findItemsButChill({
                      variables: {
                        searchTerm: e.target.value,
                      },
                    });
                  }}
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
                  options={data?.getCategory1Level.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={findItemsButChill}
                />
              </MainSearchInputItem>
              <MainSearchInputItem md={3} xs={12}>
                <button type="button" className="button">
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
