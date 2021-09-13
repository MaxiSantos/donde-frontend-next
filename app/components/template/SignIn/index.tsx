import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Form } from 'react-bootstrap';
import { CURRENT_USER_QUERY } from '../../../../hooks/useUser';
import useForm from '../../../../lib/useForm';
import { DisplayError } from '../../module/ErrorMessage';

const SINGIN_MUTATION = gql`
  mutation SINGIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
        code
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SINGIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    const res = await signin();
    resetForm();
  }

  const error =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="password"
            autoComplete="password"
          />
        </label>
        <button type="submit">Sign in</button>
      </fieldset>
    </Form>
  );
}
