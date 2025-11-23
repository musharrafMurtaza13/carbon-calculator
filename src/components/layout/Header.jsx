// src/components/layout/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <header className={`shadow-sm border-b ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-700 text-white px-3 py-2 font-bold text-lg">
              Carbon<br />Emissions
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>SHIPPING</span>
          </Link>

          {/* <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>{t.solutions}</a>
            <a href="#" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>{t.contact}</a>
            <a href="#" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>{t.about}</a>
            <a href="#" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>{t.news}</a>
          </nav> */}

          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Globe size={18} />
                <span className="text-sm font-medium">{currentLanguage.flag} {currentLanguage.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showLanguageMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center space-x-3 transition ${language === lang.code
                        ? darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-700'
                        : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                        } ${lang === languages[0] ? 'rounded-t-lg' : ''} ${lang === languages[languages.length - 1] ? 'rounded-b-lg' : ''}`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              to="/calculator"
              className="bg-blue-700 text-white px-6 py-2 text-sm font-semibold hover:bg-blue-800 transition rounded-lg"
            >
              {t.bookTransport}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex space-x-4 text-sm">
          <Link to="/" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>Home</Link>
          <Link to="/calculator" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>Calculator</Link>
          <Link to="/dashboard" className={darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-700'}>Dashboard</Link>
        </div>
      </div>
    </header>
  );
}