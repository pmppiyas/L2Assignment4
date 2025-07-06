# 📚 Minimal Library Management System

This is a **fully client-side application** built with **React**, **Redux Toolkit Query**, and **TypeScript**, designed to manage books and borrowing records simply and efficiently. The goal was to practice frontend architecture, state management, and seamless API integration using a clean UI—**without authentication, payments, or filters**.

🛠️ I built both the frontend and backend from scratch, connecting a modular Express.js API with a MongoDB database. It’s fully responsive, shows real-time updates, and includes validation and success notifications for smoother UX.

---

## 🌐 Live Links

- 🔗 Frontend: [https://l2-assignment4-lac.vercel.app]
- 🔗 Backend: [https://lv2-assignment03.vercel.app]
- 💻 GitHub Repo (Frontend): [https://github.com/pmppiyas/L2Assignment4]
- 💻 GitHub Repo (Backend): [https://github.com/pmppiyas/Lv2Assignment03]

---

## 🔧 Technologies Used

**Frontend**

- React + TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS
- React Router DOM
- Toast Notification (sonner)

**Backend**

- Node.js + Express.js
- MongoDB + Mongoose
- Zod for validation
- MVC pattern

---

## ✨ Features Overview

### 📖 Book Management
- View all books in table format (Title, Author, Genre, ISBN, Copies, Availability)
- Add new book with form validation
- Edit existing book (modal or route-based)
- Delete book with confirmation
- Business logic:
  - Quantity can’t go above total copies
  - If copies hit 0, book becomes unavailable

### 📦 Borrowing
- Borrow form with quantity & due date
- Quantity limited by availability
- Borrow summary page shows all borrowed books
- Aggregated data via API: book title, ISBN, total quantity

---


## 📲 UI & UX

- Minimal and clean with Tailwind CSS
- Fully responsive (mobile, tab, desktop)
- Easy navigation, modals, and toasts
- Instant UI update after any action (add/edit/delete/borrow)



---

## ⚙️ Backend Highlights

- Modular MVC structure with clean separation
- Validation via Zod
- Book & Borrow CRUD with business rules
- Aggregation for borrow summary
- Pagination-ready endpoints
- Optional auth middleware added for future extension

---

## 📈 Possible Improvements (Future Plan)

- Add category filters or search
- Return tracking and overdue logic
- Auth system with user roles
- Export data as CSV or PDF

---

## 🧑‍💻 Developer

**👋 Hi, I'm Prince**  
Junior Full Stack Web Developer  
🚀 I specialize in clean backend logic, responsive UI, and thoughtful API architecture.  
🧠 MongoDB and RTK Query are my zones.

📫 Connect with me:  
[LinkedIn](#) • [GitHub](#) • [https://pmppiyas.vercel.com](#)

---

## 🪪 License

This project is licensed under [MIT License](LICENSE).