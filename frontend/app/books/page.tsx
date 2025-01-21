"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/books");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books: ", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Books List</h1>
            <ul className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book: any) => (
                    <li
                        key={book._id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
                        <p className="text-gray-600">By: {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
