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
            className='text-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 text-center'
        >
            {text}
        </Link>
    )
}
