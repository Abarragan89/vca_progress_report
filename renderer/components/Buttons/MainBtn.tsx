
interface Props {
    text: string;
    disabled: boolean
    clickHandler: (() => void) | ((e: React.FormEvent) => {})
}

export default function MainBtn({ text, clickHandler, disabled }: Props) {
    return (
        <button onClick={!disabled ? clickHandler : undefined} className={`${disabled ? 'bg-gray-400 cursor-not-allowed italic' : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-100'} font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center mt-2`}>{text}</button>
    )
}

