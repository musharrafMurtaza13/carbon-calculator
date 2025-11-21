import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Moon, Sun, Globe } from 'lucide-react';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>

        <div className={`rounded-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon size={24} /> : <Sun size={24} />}
              <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Dark Mode
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center space-x-3 mb-4">
            <Globe size={24} />
            <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Language
            </span>
          </div>

          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  language === lang.code
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-900'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-3 text-xl">{lang.flag}</span>
                {lang.name}
                {language === lang.code && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}