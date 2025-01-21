"use client";
import axios from "axios";
import { useState } from "react";

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        price: "",
        pageCount: "",
        description: "",
        image: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/books", {
                ...formData,
                price: parseFloat(formData.price), 
                pageCount: parseInt(formData.pageCount, 10),  
            });
            console.log("Book added: ", response.data);
        } catch (error) {
            console.error("Error adding book: ", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8"
            >
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add a New Book
                </h1>
                <div className="space-y-4">
                    <input
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        name="author"
                        placeholder="Author"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        name="genre"
                        placeholder="Genre"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        name="pageCount"
                        type="number"
                        placeholder="Page Count"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        rows={4}
                    />
                    <input
                        name="image"
                        placeholder="Image URL"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
