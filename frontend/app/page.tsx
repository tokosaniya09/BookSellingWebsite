export default function Home() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the Book Selling Platform
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Buy, sell, and explore a wide variety of books.
        </p>
        <div className="flex space-x-4">
          <a
            href="/books"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
          >
            View Books
          </a>
          <a
            href="/add-book"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600"
          >
            Add a New Book
          </a>
        </div>
      </main>
    );
  }
  