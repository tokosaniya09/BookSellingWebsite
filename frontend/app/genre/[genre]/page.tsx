"use client"
import { useParams } from "next/navigation";

export default function GenrePage() {
    const params = useParams(); // Get the dynamic parameter from the URL
    const genre = params.genre as string;

    return (
        <main>
            <h1>Books in {genre} Genre</h1>
            <p>Explore books from the {genre} genre.</p>
        </main>
    );
}
