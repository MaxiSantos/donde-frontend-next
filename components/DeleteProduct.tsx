import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $id: ID!
  ) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    // we coujld retech but we can also just delete the element we have deleted
    update,
  });

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Seguro quiere elminar este elemeto?')) {
          deleteProduct().catch((e) => alert(e.message));
        }
      }}
    >
      {children}{' '}
    </button>
  );
}
