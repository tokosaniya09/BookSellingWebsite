import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie"; 

const MyBooks = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login-signup"); 
        }
    }, []);

    return (
        <div>
            <h1>My Books</h1>
        </div>
    );
};

export default MyBooks;
