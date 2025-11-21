import { useTheme } from '@/contexts/ThemeContext';

export default function ResultsDisplay({ data }) {
  const { darkMode } = useTheme();

  if (!data) return null;

  return (
    <div className={`rounded-lg p-8 mt-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Calculation Results
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total CO₂ Emissions</p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {data.totalEmissions || '0'} kg CO₂
          </p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mode of Transport</p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            {data.transportMode || 'N/A'}
          </p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Distance</p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {data.distance || '0'} km
          </p>
        </div>
      </div>
    </div>
  );
}