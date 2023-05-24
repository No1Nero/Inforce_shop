import { IProduct } from "../models/ProductModel";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: IProduct[],
};

export default function ProductList ({products}: ProductListProps) {
    return (
        <div className="flex flex-wrap mt-10">
            {products.map(product => (
                <div key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};