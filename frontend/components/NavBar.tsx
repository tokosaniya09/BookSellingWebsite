import Link from "next/link"

const NavBar = () => {
    return (
        <nav className="bg-blue-5000 text-white p-4">
            <ul className="flex space-x-4">
                <li><Link href="/"> Home </Link></li>
                <li><Link href="/books"> Books </Link></li>
                <li><Link href="/add-books"> Add Book </Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;