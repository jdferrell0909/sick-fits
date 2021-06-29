import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // get the mutation to update product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  //create state for form inputs
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if(loading) return <p>Loading.......</p>
  // need the form to handle updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit input fields to backend
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price
          }
        }).catch(console.error)
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset aria-busy={updateLoading} disabled={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
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
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
