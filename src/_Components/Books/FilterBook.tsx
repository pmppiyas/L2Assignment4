import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterBookProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOption: string;
  setSortOption?: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: "asc" | "desc") => void;
  genreFilter: string;
  setGenreFilter: (value: string) => void;
  handleReset: () => void;
};

function FilterBook({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  sortOrder,
  setSortOrder,
  genreFilter,
  setGenreFilter,
  handleReset,
}: FilterBookProps) {
  const GENRES = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  return (
    <div>
      <div className=" max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  gap-4 my-4 ">
        <Input
          placeholder="Search by title, author, or ISBN"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <Select value={genreFilter} onValueChange={(v) => setGenreFilter(v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            {GENRES.map((g) => (
              <SelectItem key={g} value={g}>
                {g.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="copies">Copies</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(v: string) => {
            if (v === "asc" || v === "desc") {
              setSortOrder(v);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterBook;
