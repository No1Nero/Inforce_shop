import { NavLink } from "react-router-dom";

export default function Header () {
    return (
        <div className=" bg-blue-700 h-20 px-24 flex items-center text-4xl text-white font-semibold">
            <NavLink to={'/'}>Inforce Shop</NavLink>
        </div>
    );
};