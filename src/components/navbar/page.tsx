import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-2xl font-bold">
              SkyTrade
            </Link>
          </div>
          <div>
            <a
              href="/sign-doc"
              target="_blank"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Doc
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
