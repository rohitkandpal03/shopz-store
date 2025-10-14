import ProductList from "@/components/shared/product/product-list";
import { getLastestProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLastestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
}
