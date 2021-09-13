import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCT_QUERY } from '../pages/home';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $category: CategoryRelateToOneInput!
  ) {
    createProduct(
      data: { name: $name, description: $description, category: $category }
    ) {
      id
      description
      name
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

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Shoes',
    category: 1,
    description: 'These are the best shoes!',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: {
        ...inputs,
        category: { connect: { id: inputs.category } },
      },
      refetchQueries: [{ query: ALL_PRODUCT_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // Submit the inputfields to the backend:
        const res = await createProduct();
        clearForm();
        Router.push({ pathname: `/product/${res.data.createProduct.id}` });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
            /* name={
              categoryListOption.find((item) => item.value === inputs.category)
                .name
            } */
            name="category"
            value={inputs.category}
            onChange={handleChange}
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
