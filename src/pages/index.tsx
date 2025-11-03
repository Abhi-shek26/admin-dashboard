import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to the AariyaTech Analytics Platform
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The central hub for platform-wide statistics.
        </p>
        <div className="mt-8">
          <Link
            href="/admin/login"
            className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
          >
            Go to Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
