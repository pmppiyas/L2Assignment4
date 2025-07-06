import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 px-6">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white leading-snug">
            Effortless Library Management
            <br />
            <span className="text-[#3B82F6]">Made Smarter</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Organize books, track borrowings, and manage users in one elegant
            dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Explore Features</Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="https://i.ibb.co/sJKc0GSw/library-books-background-book-closet-filled-41199253.webp"
            alt="Library Illustration"
            className="w-full rounded-lg shadow-md h-[300px] md:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
}
