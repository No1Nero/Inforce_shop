interface ModalProps {
    children: any,
};

export default function Modal ({children}: ModalProps) {
    return (
        <div className=" fixed w-screen h-screen top-20 flex justify-center items-center">
            <div className="w-full h-screen backdrop-blur-sm absolute"></div>
            <div className=" bg-white rounded-md fixed border-2 border-black flex flex-col px-10 py-2">
                {children}
            </div>
        </div>
    );
};