import { useAllBorrowsQuery } from "@/Redux/Api/baseApi";

export default function AllBorrows() {
  const { data, isLoading, error } = useAllBorrowsQuery(undefined);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-lg text-gray-500">
        Loading borrow summary...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load borrow data.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] w-full flex flex-col items-center justify-center">
      <h2 className="font-medium text-2xl my-4">
        Borrow <span className="text-blue-500">Summary</span>
      </h2>
      <div className="w-full max-w-2xl space-y-3 px-4">
        {data?.data?.length > 0 ? (
          data.data.map(
            (
              item: {
                book: { title: string; isbn: string };
                totalQuantity: number;
              },
              index: number
            ) => (
              <div
                key={index}
                className="border p-4 rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{item.book.title}</p>
                  <p className="text-sm text-gray-600">
                    ISBN: {item.book.isbn}
                  </p>
                </div>
                <p className="font-bold text-blue-600">
                  Borrowed: {item.totalQuantity}
                </p>
              </div>
            )
          )
        ) : (
          <p>No borrow data available.</p>
        )}
      </div>
    </div>
  );
}
