import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';

export default function Home() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className={`text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.carbonCalculator}
          </h1>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.calculatorDescription}
          </p>
          <Button
            onClick={() => navigate('/calculator')}
            className="bg-blue-700 px-8 py-4 rounded-full text-lg text-white"
          >
            {t.calculate}
          </Button>
        </div>
      </div>
    </div>
  );
}