import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCT_QUERY } from '../pages/home';
import { SINGLE_ITEM_QUERY } from './SingleProduct';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $id: ID!
    $name: String!
    $description: String
    $category: CategoryRelateToOneInput!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, category: $category }
    ) {
      id
      description
      name
      category {
        name
      }
    }
  }
`;

const categoryListOption = [
  {
    value: 1,
    name: 'Cafeteria',
  },
  {
    value: 2,
    name: 'Ropa',
  },
  {
    value: 3,
    name: 'Restaurant',
  },
  {
    value: 4,
    name: 'Heladeria',
  },
  {
    value: 5,
    name: 'Informatica',
  },
];

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: ALL_PRODUCT_QUERY }],
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            category: { connect: { id: inputs.category.id } },
          },
        });
        // clearForm();
        /* Router.push({ pathname: `/product/${res.data.createProduct.id}` }); */
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="category">
          Choose a category:
          <select
            name="category"
            value={inputs.category.id}
            onChange={(e) =>
              handleChange(e, (idUpdated) => ({
                id: idUpdated,
              }))
            }
            id="category"
          >
            {categoryListOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
