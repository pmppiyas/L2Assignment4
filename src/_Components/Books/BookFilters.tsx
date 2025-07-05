import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface FilterState {
  // Text search
  searchTerm: string;

  // Basic filters
  genre: string;
  author: string;
  availability: string;

  // Advanced filters
  minCopies: string;
  maxCopies: string;
  yearRange: {
    from: string;
    to: string;
  };

  // Sorting
  sortBy: string;
  sort: string;

  // Pagination
  page: number;
  limit: number;
}

interface BookSearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  isLoading?: boolean;
  totalResults?: number;
}

export function BookSearchFilters({
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters,
  isLoading = false,
  totalResults = 0,
}: BookSearchFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const genres = [
    { value: "", label: "All Genres" },
    { value: "FICTION", label: "Fiction" },
    { value: "NON_FICTION", label: "Non Fiction" },
    { value: "SCIENCE", label: "Science" },
    { value: "HISTORY", label: "History" },
    { value: "BIOGRAPHY", label: "Biography" },
    { value: "FANTASY", label: "Fantasy" },
    { value: "MYSTERY", label: "Mystery" },
    { value: "ROMANCE", label: "Romance" },
    { value: "THRILLER", label: "Thriller" },
    { value: "EDUCATION", label: "Education" },
  ];

  const sortFields = [
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "genre", label: "Genre" },
    { value: "copies", label: "Copies" },
    { value: "isbn", label: "ISBN" },
    { value: "createdAt", label: "Date Added" },
    { value: "updatedAt", label: "Last Updated" },
  ];

  const sortDirections = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const availabilityOptions = [
    { value: "", label: "All Books" },
    { value: "available", label: "Available Only" },
    { value: "unavailable", label: "Unavailable Only" },
  ];

  const limitOptions = [
    { value: 10, label: "10 per page" },
    { value: 20, label: "20 per page" },
    { value: 50, label: "50 per page" },
    { value: 100, label: "100 per page" },
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1, // Reset to first page when filters change
    });
  };

  const updateNestedFilter = (
    parentKey: string,
    childKey: string,
    value: any
  ) => {
    onFiltersChange({
      ...filters,
      [parentKey]: {
        ...filters[parentKey as keyof FilterState],
        [childKey]: value,
      },
      page: 1,
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.genre) count++;
    if (filters.author) count++;
    if (filters.availability) count++;
    if (filters.minCopies) count++;
    if (filters.maxCopies) count++;
    if (filters.yearRange.from) count++;
    if (filters.yearRange.to) count++;
    return count;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onApplyFilters();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-6">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search books by title, author, description..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter("searchTerm", e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={onApplyFilters} disabled={isLoading}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="space-y-1">
          <Label>Genre</Label>
          <Select
            value={filters.genre}
            onValueChange={(value) => updateFilter("genre", value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Author</Label>
          <Input
            type="text"
            placeholder="Filter by author"
            value={filters.author}
            onChange={(e) => updateFilter("author", e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-9"
          />
        </div>

        <div className="space-y-1">
          <Label>Availability</Label>
          <Select
            value={filters.availability}
            onValueChange={(value) => updateFilter("availability", value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All Books" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Items per page</Label>
          <Select
            value={filters.limit.toString()}
            onValueChange={(value) => updateFilter("limit", parseInt(value))}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between mb-4">
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </span>
            {isAdvancedOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            {/* Copies Range */}
            <div className="space-y-2">
              <Label>Copies Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minCopies}
                  onChange={(e) => updateFilter("minCopies", e.target.value)}
                  className="h-8"
                />
                <span className="flex items-center text-sm text-gray-500">
                  to
                </span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxCopies}
                  onChange={(e) => updateFilter("maxCopies", e.target.value)}
                  className="h-8"
                />
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-2">
              <Label>Publication Year</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="From"
                  value={filters.yearRange.from}
                  onChange={(e) =>
                    updateNestedFilter("yearRange", "from", e.target.value)
                  }
                  className="h-8"
                />
                <span className="flex items-center text-sm text-gray-500">
                  to
                </span>
                <Input
                  type="number"
                  placeholder="To"
                  value={filters.yearRange.to}
                  onChange={(e) =>
                    updateNestedFilter("yearRange", "to", e.target.value)
                  }
                  className="h-8"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <Label>Sort Options</Label>
              <div className="flex gap-2">
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => updateFilter("sortBy", value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortFields.map((field) => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={filters.sort}
                  onValueChange={(value) => updateFilter("sort", value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortDirections.map((direction) => (
                      <SelectItem key={direction.value} value={direction.value}>
                        {direction.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Active filters:
          </span>
          {filters.searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.searchTerm}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("searchTerm", "")}
              />
            </Badge>
          )}
          {filters.genre && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Genre: {genres.find((g) => g.value === filters.genre)?.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("genre", "")}
              />
            </Badge>
          )}
          {filters.author && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Author: {filters.author}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("author", "")}
              />
            </Badge>
          )}
          {filters.availability && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {
                availabilityOptions.find(
                  (a) => a.value === filters.availability
                )?.label
              }
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("availability", "")}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={onApplyFilters} disabled={isLoading}>
            {isLoading ? "Searching..." : "Apply Filters"}
          </Button>
          <Button
            variant="outline"
            onClick={onResetFilters}
            disabled={isLoading}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        {totalResults > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {totalResults} books found
          </div>
        )}
      </div>
    </div>
  );
}
