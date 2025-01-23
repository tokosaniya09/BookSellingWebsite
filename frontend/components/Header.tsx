import Book_logo from "../public/images/book_logo.png";
import NavBar from "./NavBar";



const Header = () => {
    return (
        <header className="header">
            <div className="logo_name">
                <img src={Book_logo.src} alt="logo"/>
                <h1>BookVerse</h1>
            </div>
            <NavBar/>            
        </header>
    )
}

export default Header;