"use client";

import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const NavBar = () => {
    const [user, setUser] = useState<null | { id: string; name: string }>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");         
        if (token) {
            try {
                const decoded: { id: string; name: string } = jwtDecode(token);
                setUser({ id: decoded.id, name: decoded.name });
            } catch (error) {
                console.log("Invalid token", error);
                Cookies.remove("token");
                setUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("token");        
        setUser(null);
        router.push("/"); 
        setIsSidebarOpen(false); 
    };

    return (
        <>
            <nav className="navbar">
                <div className="menu-icon" onClick={() => setIsSidebarOpen(true)}>
                    <MenuIcon />
                </div>
                <ul className="navbar_ul">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/books">Books</Link></li>
                    <li><Link href="/add-book">Add Book</Link></li>
                    {user ? (
                        <>
                            <li><Link href="/my-books">My Books</Link></li>
                            <li>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout ({user.name})
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link href="/signup">Sign-Up</Link></li>
                    )}
                    <li>
                        <Link href="/cart">
                            <ShoppingCartIcon />
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="close-icon" onClick={() => setIsSidebarOpen(false)}>
                    <CloseIcon />
                </div>
                <ul className="sidebar_ul">
                    <li><Link href="/" onClick={() => setIsSidebarOpen(false)}>Home</Link></li>
                    <li><Link href="/books" onClick={() => setIsSidebarOpen(false)}>Books</Link></li>
                    <li><Link href="/add-book" onClick={() => setIsSidebarOpen(false)}>Add Book</Link></li>
                    {user ? (
                        <>
                            <li><Link href="/my-books" onClick={() => setIsSidebarOpen(false)}>My Books</Link></li>
                            <li>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout ({user.name})
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link href="/signup" onClick={() => setIsSidebarOpen(false)}>Sign-Up</Link></li>
                    )}
                    <li>
                        <Link href="/cart" onClick={() => setIsSidebarOpen(false)}>
                            <ShoppingCartIcon />
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Overlay when sidebar is open */}
            {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
        </>
    );
};

export default NavBar;
