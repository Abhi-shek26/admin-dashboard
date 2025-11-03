import React, { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800">
              AariyaTech Admin Dashboard
            </h1>
            <div>
              {session?.user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, <strong>{session.user.name}</strong>
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="container p-4 mx-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
