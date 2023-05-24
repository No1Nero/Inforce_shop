import { useState } from "react";
import { IComment } from "../models/ProductModel";
import { useAddCommentMutation, useDeleteCommentMutation } from "../store/productsApi";

interface CommentsProps {
    comments: IComment[],
    productId: number,
};

export default function Comments ({comments, productId}: CommentsProps) {
    const [isAddComment, setIsAddComment] = useState(false);
    const [description, setDescription] = useState('');

    const [addComment] = useAddCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    };

    const cancelComment = () => {
        setIsAddComment(false);
        setDescription('');
    };

    const confirmComment = () => {
        const timeDate = new Date();
        const obj: IComment = {
            id: Math.random() * (1000-10),
            productId,
            description,
            date: timeDate.toLocaleString(),
        };
        addComment({comments: [...comments, obj]});
        cancelComment();
    };

    const deleteCreatedComment = (id:number) => {
        deleteComment([{comments: comments.filter(comment => comment.id !== id)}, productId]);
    };

    return (
        <div className=" bg-blue-300 mt-10 w-96 py-5">
            {isAddComment ?
            <div className="px-5">
                <textarea className=" w-full h-32 rounded px-3 py-2" value={description} onChange={handleChange}></textarea>
                <div className="w-32 flex justify-between text-xl font-semibold">
                    <button onClick={confirmComment} className=" disabled:font-normal disabled:text-slate-500" disabled={!description}>Add</button>
                    <button onClick={cancelComment} type="button">Cancel</button>
                </div>
            </div>
            :
            <button onClick={() => setIsAddComment(true)} type="button" className="h-12 px-3 py-2 text-white bg-blue-700 rounded ml-6">Add comment</button>
            }
            <div className="flex flex-col pt-6 mx-6 ">
                {comments.length ?
                comments.map(({id, description, date}) => (
                    <div key={id} className="flex justify-between items-center">
                        <div className="my-3">
                            <p className="font-semibold">{date}</p>
                            <p className="text-xl">{description}</p>
                        </div>
                        <button onClick={() => deleteCreatedComment(id)} className="text-2xl text-red-600" type="button">x</button>
                    </div>
                ))
                :
                <p className="text-xl text-slate-500">No comments yet</p>
            }
            </div>
        </div>
    );
};