import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/common/Button';

export default function Reports() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Reports
          </h1>
          <Button>Generate Report</Button>
        </div>

        <div className={`rounded-lg p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No reports generated yet.
          </p>
        </div>
      </div>
    </div>
  );
}