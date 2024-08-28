import Link from "next/link"

interface Props {
    text: string;
    href: string;
}

export default function MainLink({ text, href }: Props) {
    return (
        <Link
            href={href}
            title='Create New Reports'
            className='bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-100 text-gray-100 font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center mt-2'
        >
            {text}
        </Link>
    )
}
