import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 dark:text-white">
          📚 LibManage
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300 font-medium *:text-lg *:font-medium">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/books")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
          >
            All Books
          </Link>
          <Link
            to="/add-book"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/add-book")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/borrow-summary")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
          >
            Borrow Summary
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex gap-4">
          <ModeToggle />
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden mt-2 space-y-3 px-4 text-gray-700 dark:text-gray-200 flex flex-col items-end *:text-lg *:font-medium">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/books")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setIsOpen(false)}
          >
            All Books
          </Link>
          <Link
            to="/add-book"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/add-book")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive("/borrow-summary")
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Borrow Summary
          </Link>
        </nav>
      )}
    </header>
  );
}
