import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    name: 'Nice Shoes',
    price: 99999,
    description: 'these are some nice shoes',
  });

  return (
    <form>
      <label htmlFor="name">
        Name{' '}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
