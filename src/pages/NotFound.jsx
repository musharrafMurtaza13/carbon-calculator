import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';

export default function NotFound() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="text-center">
        <h1 className={`text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          404
        </h1>
        <p className={`text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Page not found
        </p>
        <Button onClick={() => navigate('/')}>
          Go Home
        </Button>
      </div>
    </div>
  );
}