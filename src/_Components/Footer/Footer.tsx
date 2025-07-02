import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & Description */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold text-white">📚 LibManage</h2>
          <p className="text-slate-400 text-sm">
            A smarter way to manage your library. Borrow books, track returns,
            and streamline your entire collection.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-blue-400">
                All Books
              </Link>
            </li>
            <li>
              <Link to="/add-book" className="hover:text-blue-400">
                Add Book
              </Link>
            </li>
            <li>
              <Link to="/borrow-summary" className="hover:text-blue-400">
                Borrow Summary
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact or Socials (Placeholder) */}
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-slate-400">Email: support@libmanage.com</p>
          <p className="text-sm text-slate-400">Phone: +880-1234-567890</p>
          <div className="flex gap-3 mt-2">
            <span className="text-white hover:text-blue-400 cursor-pointer">
              🌐
            </span>
            <span className="text-white hover:text-blue-400 cursor-pointer">
              📘
            </span>
            <span className="text-white hover:text-blue-400 cursor-pointer">
              📸
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} LibManage. All rights reserved.
      </div>
    </footer>
  );
}
