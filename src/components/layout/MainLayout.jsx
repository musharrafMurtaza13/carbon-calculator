// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}