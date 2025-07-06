import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/Redux/Api/baseApi";

interface BookDeleteProps {
  bookId: string;
  setConfirmDeleteId: (id: string | null) => void;
}

function BookDelete({ bookId, setConfirmDeleteId }: BookDeleteProps) {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
      setConfirmDeleteId(null);
    } catch {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-xl w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="text-sm mb-6">
          Are you sure you want to delete this book?
        </p>
        <div className="flex justify-between gap-3">
          <Button variant="destructive" onClick={() => handleDelete(bookId)}>
            Yes, Delete
          </Button>
          <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookDelete;
