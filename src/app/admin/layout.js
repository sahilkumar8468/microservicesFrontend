import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Admin Control Panel | UniversalInterior&Microservices',
  description: 'Authorized personnel only — UniversalInterior&Microservices Admin Dashboard',
};

// This layout intentionally omits the Navbar and Footer
// Only the AuthProvider is kept for context access.
export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <div className={`${inter.variable} min-h-screen bg-surface-50 antialiased`}>
        {children}
      </div>
    </AuthProvider>
  );
}
