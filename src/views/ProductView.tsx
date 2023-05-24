import { useParams } from "react-router-dom";
import { useGetProductInfoQuery, useUpdateProductInfoMutation } from "../store/productsApi";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Comments from "../components/Comments";

export default function ProductView () {
    const {id} = useParams();
    const {data} = useGetProductInfoQuery(id!);
    const [editModal, setEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editImageUrl, setEditImageUrl] = useState<string>('');
    const [editCount, setEditCount] = useState<number>(0);
    const [editWidth, setEditWidth] = useState<number>(0);
    const [editHeight, setEditHeight] = useState<number>(0);
    const [editWeight, setEditWeight] = useState<number>(0);

    const [UpdateProductInfo] = useUpdateProductInfoMutation();

    useEffect(() => {
        if (data) {
        setEditName(data!.name);
        setEditImageUrl(data!.imageUrl);
        setEditCount(data!.count);
        setEditWidth(data!.size[0]);
        setEditHeight(data!.size[1]);
        setEditWeight(data!.weight);
    }
    }, [data]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value}:any = e.currentTarget;
        switch(name) {
            case 'name':
                setEditName(value);
                break;

            case 'imageUrl':
                setEditImageUrl(value);
                break;

            case 'count':
                setEditCount(value);
                break;

            case 'width': 
                setEditWidth(value);
                break;

            case 'height':
                setEditHeight(value);
                break;

            case 'weight':
                setEditWeight(value);
                break;

            default:
                return;
        };
    };

    const updateInfo = () => {
        const obj:any = {
            id: Number(id),
            name: editName,
            imageUrl: editImageUrl,
            count: editCount,
            size: [
                editWidth,
                editHeight,
            ],
            weight: editWeight,
            comments: data!.comments,
        };
        UpdateProductInfo(obj);
        setEditModal(false);
    };

    const cancelModal = () => {
        setEditModal(false);
        setEditName(data!.name);
        setEditImageUrl(data!.imageUrl);
        setEditCount(data!.count);
        setEditWidth(data!.size[0]);
        setEditHeight(data!.size[1]);
        setEditWeight(data!.weight);
    };

    return (
        <>
        {data &&
        <div className="px-24 py-14 flex flex-col justify-center items-center">
            {editModal &&
            <Modal>
                <p className="text-2xl font-semibold text-center">Edit product</p>
                <div className="flex flex-col justify-center mt-5">
                    <div className="flex justify-between">
                        Name: <input className="border border-black rounded h-8 px-2 mb-4" type="text" placeholder="Name" name="name" value={editName} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Image URL: <input className="border border-black rounded h-8 px-2 mb-4" type="text" placeholder="Image URL" name="imageUrl" value={editImageUrl} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Count: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Count" name="count" value={editCount} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Width: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Width" name="width" value={editWidth} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Height: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Height" name="height" value={editHeight} onChange={handleChange} />
                    </div>
                    <div className="flex justify-between">
                        Weight: <input className="border border-black rounded h-8 px-2 mb-4" type="number" placeholder="Weight (g)" name="weight" value={editWeight} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="rounded-md bg-red-700 text-white text-lg font-semibold px-2 py-1" onClick={cancelModal}>Cancel</button>
                    <button onClick={updateInfo} className="rounded-md bg-blue-700 text-white text-jg font-semibold px-2 py-1">Edit</button>
                </div>
            </Modal>}
            <button  onClick={() => setEditModal(true)} className="mb-5 text-2xl text-white bg-blue-700 rounded w-24 h-12">Edit</button>
            <div className="border border-black w-80 rounded-lg px-5 py-5">
                <p className="text-3xl font-bold">{data!.name}</p>
                <img alt={data!.name} src={data!.imageUrl} />
                <div className="text-xl">
                    <p>Count: <span>{data!.count}</span></p>
                    <p>Size: <span>Width: {data!.size[0]}</span>, <span>Height: {data!.size[1]}</span></p>
                    <p>Weight: <span>{data!.weight} g</span></p>
                </div>
            </div>
            <Comments comments={data.comments} productId={Number(id)} />
        </div>}
        </>
    );
};