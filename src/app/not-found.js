"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Go back to Home
      </Link>
    </div>
  );
}
