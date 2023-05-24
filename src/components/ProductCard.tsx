import { NavLink } from "react-router-dom";
import { IProduct } from "../models/ProductModel";

interface ProductProps {
    product: IProduct,
};

export default function ProductCard ({product}: ProductProps) {
    const {imageUrl, name, count} = product;
    return (
        <div className="border border-blue-400 w-60 h-52 rounded-lg mx-3">
            <NavLink to={`/${product.id}`}><img className="w-60 h-32 rounded-t-lg" alt={name} src={imageUrl}/></NavLink>
            <div className="h-fit flex flex-col px-8 py-2 ">
                <NavLink to={`/${product.id}`} className="text-xl font-semibold">{name}</NavLink>
                <p className="text-lg">Count: {count}</p>
            </div>
        </div>
    );
};