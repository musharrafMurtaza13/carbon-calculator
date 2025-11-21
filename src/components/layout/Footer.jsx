// src/components/layout/Footer.jsx
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <footer className={darkMode ? 'bg-gray-900 text-white mt-auto border-t border-gray-800' : 'bg-gray-800 text-white mt-auto'}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{t.copyright}</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className={`text-sm transition ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}`}>{t.privacy}</a>
            <a href="#" className={`text-sm transition ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}`}>{t.terms}</a>
            <a href="#" className={`text-sm transition ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-white'}`}>{t.support}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
