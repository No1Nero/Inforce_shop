import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import {useAddProductMutation, useGetAllProductsQuery} from '../store/productsApi';
import Modal from "../components/Modal";
import CancelModal from "../components/CancelModal";

export default function ProductsView () {
    const {data} = useGetAllProductsQuery(null);
    const [sortedData, setSortedData] = useState<any>([]);
    const [modalHandler, setModalHandler] = useState(false);
    const [name, setName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [cancelhandler, setCancelHandler] = useState(false);

    const [addProduct] = useAddProductMutation();

    useEffect(() => {
        if (data) {
            sortByNameAndCount();
        }
    }, [data]);

    const sortByNameAndCount = () => {
        var sortedByName = data!.slice().sort(function(a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        var sortedByNameAndCount = sortedByName.slice().sort(function(a, b) {
            var countA = a.count;
            var countB = b.count;
            return countB - countA;
        });
        setSortedData(sortedByNameAndCount);
    };

    const sortByName = () => {
        var sortedByName: any = data!.slice().sort(function(a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        setSortedData(sortedByName);
    };

    const sortByCount = () => {
        var sortedByCount: any = data!.slice().sort(function(a, b) {
            var countA = a.count;
            var countB = b.count;
            return countB - countA;
        })
        setSortedData(sortedByCount);
    };

    const handleModal = () => {
        setModalHandler(modalHandler => !modalHandler);
    };

    const handleCancel = () => {
        setCancelHandler(cancelhandler => !cancelhandler);
    };

    const closeModals = () => {
        setModalHandler(false);
        setCancelHandler(false);
        clearFields();
    };

    const clearFields = () => {
        setName('');
        setImageUrl('');
        setCount(0);
        setWidth(0);
        setHeight(0);
        setWeight(0);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value}:any = e.currentTarget;
        switch(name) {
            case 'name':
                setName(value);
                break;

            case 'imageUrl':
                setImageUrl(value);
                break;

            case 'count':
                setCount(value);
                break;

            case 'width': 
                setWidth(value);
                break;

            case 'height':
                setHeight(value);
                break;

            case 'weight':
                setWeight(value);
                break;

            default:
                return;
        };
    };

    const AddProduct = () => {
        const obj:any = {
            id: data ? data!.length : 0,
            imageUrl,
            name,
            count: count!,
            size: [
                width!,
                height!
            ],
            weight: weight!,
            comments: []
        };
        addProduct(obj);
        setModalHandler(false);
        clearFields();
    };

    const sorting = (e: React.FormEvent<HTMLSelectElement>) => {
        const {value} = e.currentTarget;
        switch(value) {
            case 'name':
                sortByName();
                break;

            case 'count':
                sortByCount();
                break;

            case 'nameAndCount':
                sortByNameAndCount();
                break;

            default:
                return;
        };
    };

    return (
        <div className="px-24 py-16">
            {cancelhandler && <CancelModal onHandleCancel={handleCancel} closeModals={closeModals} />}
            {modalHandler && 
            <Modal>
                <p className="text-2xl font-semibold text-center">Add new product</p>
                <div className="flex flex-col justify-center mt-5">
                    <div className="flex justify-between">
                        Name: <input className="border border-black rounded h-8 px-2 mb-4" type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Image URL: <input className="border border-black rounded h-8 px-2 mb-4" type="text" placeholder="Image URL" name="imageUrl" value={imageUrl} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Count: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Count" name="count" value={count} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Width: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Width" name="width" value={width} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Height: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Height" name="height" value={height} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Weight: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Weight (g)" name="weight" value={weight} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="rounded-md bg-red-700 text-white text-lg font-semibold px-2 py-1" onClick={handleCancel}>Cancel</button>
                    <button onClick={AddProduct} disabled={!name || !imageUrl || !count || !width || !height || !weight} className="rounded-md bg-blue-700 text-white text-jg font-semibold px-2 py-1 disabled:bg-slate-500">Confirm</button>
                </div>
            </Modal>}
            {data?.length ?
            <div>
                <div className="flex justify-between items-center">
                    <button className="rounded-md bg-blue-700 text-white text-xl font-semibold px-3 py-2" type="button" onClick={handleModal}>Add product</button>
                    <select className=" h-10 px-3 text-lg" onChange={sorting}>
                        <option value={'nameAndCount'}>By name and count</option>
                        <option value={'name'}>By name</option>
                        <option value={'count'}>By count</option>
                    </select>
                </div>
                <ProductList products={sortedData} />
            </div>
            :
            <div className=" w-screen h-screen flex flex-col justify-center items-center">
                <p className="text-2xl text-slate-500">Oops, there nothing...</p>
                <button className="rounded-md bg-blue-700 text-white text-xl font-semibold px-3 py-2" type="button" onClick={handleModal}>Add first product</button>
            </div>
        }
        </div>
    );
};