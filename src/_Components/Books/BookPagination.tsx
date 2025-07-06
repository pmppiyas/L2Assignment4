import { Button } from "@/components/ui/button";

type PaginationProps = {
  pagination: {
    hasPrev: boolean;
    hasNext: boolean;
    currentPage: number;
    totalPages: number;
  };
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function BookPagination({ pagination, setPage }: PaginationProps) {
  return (
    <div>
      <div className="flex justify-center items-center gap-4 my-6">
        <Button
          variant="outline"
          disabled={!pagination?.hasPrev}
          onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>
        <Button
          variant="outline"
          disabled={!pagination?.hasNext}
          onClick={() => setPage((p: number) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default BookPagination;
