import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar_ul">
                <li><Link href="/"> Home </Link></li>
                <li><Link href="/books"> Books </Link></li>
                <li><Link href="/add-book"> Add Book </Link></li>
                <li><Link href="/add-book"> My Books </Link></li>
                <li><Link href="/add-book"> User </Link></li>
                <li><Link href="/add-book"> <ShoppingCartIcon/> </Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;