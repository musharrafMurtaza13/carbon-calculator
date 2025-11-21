// src/components/layout/Sidebar.jsx
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Sidebar({ isOpen }) {
  const { darkMode } = useTheme();

  return (
    <aside className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} w-64 ${isOpen ? 'block' : 'hidden'} md:block`}>
      <nav className="space-y-2 p-4">
        <Link to="/" className={`block px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          Home
        </Link>
        <Link to="/calculator" className={`block px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          Calculator
        </Link>
        <Link to="/dashboard" className={`block px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          Dashboard
        </Link>
        <Link to="/reports" className={`block px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          Reports
        </Link>
        <Link to="/settings" className={`block px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}