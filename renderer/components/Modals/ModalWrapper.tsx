

interface Props {
    children: React.ReactNode;
    title: String;
    closeModal: () => void;
}
const ModalWrapper = ({ children, title, closeModal }: Props) => {

    return (
        <div onClick={closeModal} className="z-50 fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-80">
            <div onClick={(e) => e.stopPropagation()} className="bg-gray-200 p-4 rounded-lg shadow-lg max-w-md w-full animate-dropDown">
                <h2 className="text-2xl font-bold mb-4 text-center text-zinc-900">{title}</h2>
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper;
