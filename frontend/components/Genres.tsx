import Link from "next/link";

const genres = [
    "Fiction", "Mystery", "Thriller", "Fantasy", "Romance", "Sci-Fi", 
    "Horror", "Biography", "Self-Help", "History", "Adventure", "Drama",
    "Poetry", "Young Adult", "Comics", "Philosophy"
];

const Genres = () => {
    return (
        <div className="genres-container">
            {genres.map((genre, index) => (
                <Link key={index} href={`/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`} className="genre-item">
                    {genre}
                </Link>
            ))}
        </div>
    );
};

export default Genres;
