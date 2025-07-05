import { Button } from "@/components/ui/button";
import React from "react";

function BookPagination({ pagination, setPage }) {
  return (
    <div>
      <div className="flex justify-center items-center gap-4 my-6">
        <Button
          variant="outline"
          disabled={!pagination?.hasPrev}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>
        <Button
          variant="outline"
          disabled={!pagination?.hasNext}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default BookPagination;
