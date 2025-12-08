import Link from 'next/link';

export default async function DetailsPage(props:any) {
    const {id} = await props.params

    async function getData() {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!res.ok) {
            throw new Error("Failed to fetch data!");
        }
        return res.json();
    }

    const data = await getData();
    
    return (
        <main>
            <div className="product-detail" key={data.id}>
                <div className="product-detail-image">
                <img src={data.image} alt={data.title} />
                </div>

                <div className="product-detail-info">
                <h1 className="product-detail-title">{data.title}</h1>

                <p className="product-detail-price">{data.price} €</p>

                <p className="product-detail-category">
                    {data.category}
                </p>

                <p className="product-detail-description">
                    {data.description}
                </p>

                <Link href="/products">
                    <button className="back">Back</button>
                </Link>
                </div>
            </div>
        </main>
    )
}

