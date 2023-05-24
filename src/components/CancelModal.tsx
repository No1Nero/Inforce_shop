interface CancelModalProps {
    onHandleCancel: React.MouseEventHandler<HTMLButtonElement>,
    closeModals: React.MouseEventHandler<HTMLButtonElement>,
};

export default function CancelModal ({onHandleCancel, closeModals}: CancelModalProps) {
    return (
        <div className=" fixed w-screen h-screen top-20 flex justify-center items-center z-20">
            <div className="w-full h-screen backdrop-blur-sm absolute"></div>
            <div className=" bg-white rounded-md fixed border-2 border-black flex flex-col px-10 py-2">
            <div className="flex flex-col justify-center items-center">
                        <p className="text-xl text-black">Do you really want to cancel the form?</p>
                        <div className="w-24 flex justify-between mt-5 text-xl font-semibold">
                            <button onClick={closeModals}>Yes</button>
                            <button onClick={onHandleCancel}>No</button>
                        </div>
                    </div>
            </div>
        </div>
    );
};