import UpdateProduct from '../components/UpdateProduct';
import { useRouter } from 'next/router';

export default function UpdatePage() {
  const { id } = useRouter().query;
  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}
