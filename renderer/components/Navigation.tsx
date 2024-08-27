import Link from "next/link";

const Navigation = () => {
    return (
        <nav className="bg-gray-100 absolute w-full z-20 top-0 start-0 border-b border-gray-200 print:hidden">
            <div className="w-full flex flex-wrap items-right justify-between items-center px-2">
                <a href='/home' className="rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">VCA Reports 🐧</span>
                </a>
                <ul className="flex p-3 font-medium rtl:space-x-reverse">
                    <li>
                        <Link
                            href='/home'
                            title='login'
                            className='text-gray-900'
                        >
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

    )
}


export default Navigation;