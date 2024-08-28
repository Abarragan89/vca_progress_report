
interface Props {
    text: string;
    disabled?: boolean
    clickHandler: (() => void) | ((e: React.FormEvent) => {})
    red?: boolean
}

export default function MainBtn({ text, clickHandler, disabled, red }: Props) {
    return (
        <>
            {red ?
                <button onClick={!disabled ? clickHandler : undefined} className={`${disabled ? 'bg-gray-400 cursor-not-allowed italic' : 'bg-[#910c22] hover:bg-[#ad0a25] focus:ring-1 focus:outline-none focus:ring-blue-100 text-gray-100'} font-medium rounded-lg text-sm sm:w-auto px-4 py-[7px] text-center mt-2`}>{text}</button>
                :
                <button onClick={!disabled ? clickHandler : undefined} className={`${disabled ? 'bg-gray-400 cursor-not-allowed italic' : 'bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-100 text-gray-100'} font-medium rounded-lg text-sm sm:w-auto px-4 py-[7px] text-center mt-2`}>{text}</button>

            }
        </>
    )
}

