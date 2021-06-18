import SingleProduct from '../../components/SingleProduct';
import { useRouter } from 'next/router';


export default function SingleProductPage() {
  const { id } = useRouter().query;
  return <SingleProduct id={id} />;
}
