import Link from 'next/link';

async function getData() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
}

export default async function ProductsPage() {
  const data = await getData();
  return(
    <main className="products-grid">
      {data.map((p: any)=> {
        return (
          <Link href={`/products/${p.id}`} key={p.id}>
            <div className="product-card">
              <img src={p.image} />
              <p className="product-title">{p.title}</p>
              <p className="product-price">{p.price} €</p>
            </div>
          </Link>
        );
      })}
    </main>
  )
}