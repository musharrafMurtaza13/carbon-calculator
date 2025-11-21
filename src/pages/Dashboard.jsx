import { useTheme } from '@/contexts/ThemeContext';

export default function Dashboard() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Total Calculations
            </h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>0</p>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Total CO₂ Saved
            </h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>0 kg</p>
          </div>

          <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Favorite Route
            </h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>N/A</p>
          </div>
        </div>

        <div className={`mt-8 rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Calculations
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            No calculations yet.
          </p>
        </div>
      </div>
    </div>
  );
}