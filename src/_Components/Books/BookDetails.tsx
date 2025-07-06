import { useBookByIdQuery } from "@/Redux/Api/baseApi";
import { useParams, useNavigate } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useBookByIdQuery(id);
  const book = data?.data;

  return (
    <div className="min-h-[calc(100vh-68px)] w-full px-4 py-6 flex flex-col items-center bg-gray-50">
      <button
        onClick={() => navigate("/books")}
        className="self-start mb-4 text-blue-600 hover:underline transition"
      >
        ← Back to All Books
      </button>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        📘 Book <span className="text-blue-500">Details</span>
      </h2>

      {isLoading && <p className="text-gray-600">Loading book details...</p>}
      {error && (
        <p className="text-red-600">
          Something went wrong. Please try again later.
        </p>
      )}

      {book && (
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-bold text-blue-700 mb-2">
            {book.title}
          </h3>
          <p className="text-gray-700 mb-1">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Copies:</strong> {book.copies}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Available:</strong> {book.available ? "✅ Yes" : "❌ No"}
          </p>
          <p className="text-gray-700 mt-4 whitespace-pre-line">
            <strong>Description:</strong>
            <br />
            {book.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
